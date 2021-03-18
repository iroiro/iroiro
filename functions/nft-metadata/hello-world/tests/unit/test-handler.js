"use strict";

const app = require("../../app.js");
const chai = require("chai");
const expect = chai.expect;
describe("Tests index", function () {
  it("WalletNFTDistributor: verifies successful response", async () => {
    const event = {
      queryStringParameters: {
        treeId: "1",
        distributorAddress: "0x4346ef74D361b8C04cbB5116EE2b004A0b699994",
      },
    };
    const result = await app.handler(event);

    console.debug(result);

    expect(result).to.be.an("object");
    expect(result.statusCode).to.equal(200);
    expect(result.body).to.be.an("object");

    expect(result.body.description).to.be.equal(
      "Friendly OpenSea Creature that enjoys long swims in the ocean."
    );
    expect(result.body.external_url).to.be.equal(
      "https://openseacreatures.io/3"
    );
    expect(result.body.image).to.be.equal(
      "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png"
    );
    expect(result.body.name).to.be.equal("Dave Starbelly");
  });

  it("UUIDNFTDistributor: verifies successful response", async () => {
    const event = {
      queryStringParameters: {
        treeId: "1",
        distributorAddress: "0x4346ef74D361b8C04cbB5116EE2b004A0b699994",
      },
    };
    const result = await app.handler(event);

    console.debug(result);

    expect(result).to.be.an("object");
    expect(result.statusCode).to.equal(200);
    expect(result.body).to.be.an("object");

    expect(result.body.description).to.be.equal(
      "Friendly OpenSea Creature that enjoys long swims in the ocean."
    );
    expect(result.body.external_url).to.be.equal(
      "https://openseacreatures.io/3"
    );
    expect(result.body.image).to.be.equal(
      "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png"
    );
    expect(result.body.name).to.be.equal("Dave Starbelly");
  });
});
