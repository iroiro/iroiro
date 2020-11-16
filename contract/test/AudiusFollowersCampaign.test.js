const {accounts, contract} = require("@openzeppelin/test-environment")
const {constants} = require("@openzeppelin/test-helpers")
const {assert, expect} = require("chai")

const Distributers = contract.fromArtifact("AudiusFollowersDistributer")
const FanToken = contract.fromArtifact("FanToken")

xdescribe("AudiusFollowersDistributer", () => {
    describe("createCampaign", () => {
        it("throws an error if msg.sender is not matched to token sender", async () => {

        })
        it("throws an error if there is no allowance", async () => {

        })
        it("throws an error if allowance is not enough to recipients", async () => {

        })
        it("create new campaign", async() => {

        })
        it("transfers token of approved amount", async () => {

        })
        it("emits event", async() => {

        })
    })
})
