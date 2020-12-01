import express from "express"
import ipfsClient from "ipfs-http-client"
import {AbiItem, soliditySha3} from "web3-utils"
import BN from "bn.js"
import dotenv from "dotenv"
import {AudiusFollowersCampaign} from "../../../types/AudiusFollowersCampaign";
import {AudiusFollowersDistributer} from "../../../types/AudiusFollowersDistributer";
dotenv.config()

interface Recipients {
    readonly type: string
    readonly targets: string[]
}

const Web3 = require("web3");

// TODO: Update getting ABI logic
const DistributorContract = require('../build/contracts/AudiusFollowersDistributor.json');
const distributorInterface: AbiItem[] = DistributorContract.abi;
const distributorAddress: string = process.env.DISTRIBUTOR_ADDRESS;
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.HTTP_PROVIDER));
const Distributor: AudiusFollowersDistributer = new web3.eth.Contract(distributorInterface, distributorAddress);
const CampaignContract = require('../build/contracts/AudiusFollowersCampaign.json');
const campaignInterface: AbiItem[] = CampaignContract.abi;

const ipfs = ipfsClient("https://gateway.pinata.cloud/")
const app = express();

app.use(express.json());

app.post('/api', async (req, res) => {
    console.debug("request body: ", req.body)
    const cid: string = req.body.data.cid
    const userAddress: string = req.body.data.userAddress
    const campaignId: BN = new BN(req.body.data.campaignId.toString())

    let campaignAddress: string
    try {
        campaignAddress = await Distributor.methods.campaignList(campaignId.toString()).call()
        if (campaignAddress === "0x0000000000000000000000000000000000000000") {
            throw new Error("Campaign is not exists.")
        }
    } catch(error) {
        console.error("Failed to get campaign address from campaign id.", error)
        return res.status(500).send({
            jobRunID: req.body.id,
            data: {},
            status: "errored",
            error: "Failed to get campaign from campaign id."
        })
    }

    const Campaign: AudiusFollowersCampaign = new web3.eth.Contract(campaignInterface, campaignAddress);
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

    let content: Recipients
    try {
        content = await getFile(cid)
        if (!Array.isArray(content.targets)) {
            throw new Error("File does not contains target field.")
        }
    } catch(error) {
        console.error("Failed to get user addresses file. ", error)
        return res.status(500).send({
            jobRunID: req.body.id,
            data: {},
            status: "errored",
            error: "Failed to get user addresses file."
        })
    }

    const isClaimable: boolean = content.targets.includes(userAddress)
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

const getFile = async (cid: string): Promise<Recipients> => {
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
