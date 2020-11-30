import express from "express"
import ipfsClient from "ipfs-http-client"
import {AbiItem, soliditySha3} from "web3-utils"
import BN from "bn.js"
import dotenv from "dotenv"
import {AudiusFollowersCampaign} from "../../../types/AudiusFollowersCampaign";
dotenv.config()

interface UserAddresses {
    readonly addresses: string[]
}

const Web3 = require("web3");

// TODO: Update getting ABI logic
const {abi} = require('../build/contracts/AudiusFollowersCampaign.json');
const contractInterface: AbiItem[] = abi;
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.HTTP_PROVIDER));
const proxyAddress: string = process.env.AUDIUS_CONTRACT_ADDRESS
const Campaign: AudiusFollowersCampaign = new web3.eth.Contract(contractInterface, proxyAddress);

const ipfs = ipfsClient("https://gateway.pinata.cloud/")
const app = express();

app.use(express.json());

app.post('/api', async (req, res) => {
    console.debug("request body: ", req.body)
    const cid: string = req.body.data.cid
    const userAddress: string = req.body.data.userAddress
    let rawUserId: string
    try {
        rawUserId = await Campaign.methods.userIdList(userAddress).call()
    } catch(error) {
        console.error("Failed to get user id from user address.", error)
        return res.status(500).send({
            jobRunID: req.body.id,
            data: {},
            status: "errored",
            error: "Failed to get user id from user address."
        })
    }
    const userId: BN = new BN(rawUserId).mul(new BN(10))

    let content: UserAddresses
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

    const isClaimable: boolean = content.addresses.includes(userAddress) // Assume json like { "addresses": ["address1", "address2", ...] }
    const claimKeyHash: string = getClaimKeyHash(userId, isClaimable)
    console.debug("Claim key hash: ", claimKeyHash)

    return res.send({
        jobRunID: req.body.id,
        data: claimKeyHash
    })
})

const getClaimKeyHash = (userId: BN, isClimable: boolean): string => {
    const truthyValue: number = isClimable ? 1 : 0;
    const truthyBN: BN = new BN(truthyValue)
    const claimKey: BN = userId.add(truthyBN)
    console.debug("Claim key: ", claimKey.toString())

    return soliditySha3(claimKey)
}

const getFile = async (cid: string): Promise<UserAddresses> => {
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
