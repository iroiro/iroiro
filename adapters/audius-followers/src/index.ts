import * as express from "express"
import * as ipfsClient from "ipfs-http-client"
import {AbiItem, soliditySha3} from "web3-utils"
import * as BN from "bn.js"
import * as dotenv from "dotenv"
dotenv.config()

const Web3 = require("web3");

// TODO: Update getting ABI logic
const {abi} = require('../build/contracts/AudiusFollowersCampaign.json');
const contractInterface: AbiItem[] = abi;
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.HTTP_PROVIDER));
const proxyAddress: string = process.env.AUDIUS_CONTRACT_ADDRESS
const Campaign = new web3.eth.Contract(contractInterface, proxyAddress);

const ipfs = ipfsClient("https://ipfs.infura.io:5001")
const app = express();

app.use(express.json());

app.post('/api', async (req, res) => {
    console.debug("request body: ", req.body)
    const cid = req.body.data.cid
    const userAddress = req.body.data.userAddress
    let rawUserId;
    try {
        rawUserId = await Campaign.methods.userIdList(userAddress).call()
    } catch(error) {
        console.error("Failed to get user id from user address.")
        return res.status(500).send({
            jobRunID: req.body.id,
            data: {},
            status: "errored",
            error: "Failed to get user id from user address."
        })
    }
    const userId = new BN(rawUserId).mul(new BN(10))

    let content
    try {
        content = await getFile(cid)
    } catch(error) {
        console.error("Failed to get user addresses file. ", error)
        return res.status(500).send({
            jobRunID: req.body.id,
            data: {},
            status: "errored",
            error: "Failed to get user addresses file."
        })
    }

    const isClaimable = content.addresses.includes(userAddress) // Assume json like { "addresses": ["address1", "address2", ...] }
    const claimKeyHash = getClaimKeyHash(userId, isClaimable)
    console.debug("Claim key hash: ", claimKeyHash)

    return res.send({
        jobRunID: req.body.id,
        data: claimKeyHash
    })
})

const getClaimKeyHash = (userId, isClimable) => {
    const truthyValue = isClimable ? 1 : 0;
    const truthyBN = new BN(truthyValue)
    const claimKey = userId.add(truthyBN)
    console.debug("Claim key: ", claimKey.toString())

    return soliditySha3(claimKey)
}

const getFile = async (cid) => {
    for await (const file of ipfs.get(cid)) {
        if (!file.content) {
            continue;
        }
        const content = []
        for await (const chunk of file.content) {
            content.push(chunk)
        }
        return JSON.parse(content.toString())
    }
}

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})
