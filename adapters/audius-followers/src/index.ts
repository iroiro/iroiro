import * as express from "express"
import * as ipfsClient from "ipfs-http-client"
import {AbiItem, soliditySha3} from "web3-utils"
import * as BN from "bn.js"
import * as dotenv from "dotenv"
dotenv.config()

const Web3 = require("web3");

// TODO: Update getting ABI logic
const {abi} = require('../build/contracts/Audius.json');
const contractInterface: AbiItem[] = abi;
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.HTTP_PROVIDER));
const proxyAddress: string = process.env.AUDIUS_CONTRACT_ADDRESS
const Audius = new web3.eth.Contract(contractInterface, proxyAddress);

const ipfs = ipfsClient("https://ipfs.infura.io:5001")
const app = express();

app.use(express.json());

app.post('/api', async (req, res) => {
    console.debug("request body: ", req.body)
    const cid = req.body.data.cid
    const userAddress = req.body.data.userAddress
    const tokenAddress = req.body.data.tokenAddress
    const userId = new BN(await Audius.methods.userIdList(userAddress).call())
        .mul(new BN(10).pow(new BN(21)))
    const tokenId = new BN(await Audius.methods.tokenIdList(tokenAddress).call())
        .mul(new BN(10))

    // TODO Add error handling

    // TODO: Add handling error
    const content = await getFile(cid)

    const isClaimable = content.addresses.includes(userAddress) // Assume json like { "addresses": ["address1", "address2", ...] }
    const claimKeyHash = getClaimKeyHash(userId, tokenId, isClaimable)
    console.debug("Claim key hash: ", claimKeyHash)

    return res.send({
        id: req.body.id,
        data: claimKeyHash
    })
})

const getClaimKeyHash = (userId, tokenId, isClimable) => {
    const truthyValue = isClimable ? 1 : 0;
    const truthyBN = new BN(truthyValue)
    const claimKey = userId.add(tokenId).add(truthyBN)
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
