const {accounts, contract} = require("@openzeppelin/test-environment")
const {constants} = require("@openzeppelin/test-helpers")
const {assert, expect} = require("chai")

const Campaign = contract.fromArtifact("AudiusFollowersCampaign")
const FanToken = contract.fromArtifact("FanToken")

xdescribe("AudiusFollowersCampaign", () => {
    describe("generateClaimKey", () => {
        it("returns claim key", async () => {

        })
    })
    describe("isClaimable", () => {
        it("returns false if user is is not registered", async () => {

        })
        it("returns false if user already claimed", async () => {

        })
        it("returns false if claim hash is not matched", async () => {

        })
        it("returns true if claim hash is matched", async () => {

        })
    })
    describe("claim", () => {
        it("throws an error if user is not claimable", async () => {

        })
        it("throws an error if user already claimed", async () => {

        })
        it("transfer token to user with specific amount", async () => {

        })
        it("emits event", async () => {

        })
    })
    describe("fulfill", () => {
        it("set key hash list", async () => {

        })
    })
    describe("requestCheckingIsClaimable", async () => {
        it("set new user id if its not registered yet", async () => {

        })
        it("does not set new user id if its already registered", async () => {

        })
        it("returns request id", async () => {

        })
    })
})
