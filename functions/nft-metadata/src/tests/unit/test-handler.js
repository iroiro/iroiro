"use strict";

const app = require("../../app.js");
const chai = require("chai");
const expect = chai.expect;
describe("Tests index", function () {
  it("WalletNFTDistributor: verifies successful response", async () => {
    const event = {
      pathParameters: {
        tokenId: "1",
        network: "kovan",
        distributor: "wallet",
      },
    };
    const result = await app.handler(event);

    console.debug(result);

    expect(result).to.be.an("object");
    expect(result.statusCode).to.equal(200);
    expect(result.body).to.be.an("string");

    const body = JSON.parse(result.body);
    expect(body.name).to.be.equal("nft wallet campaign 03221756");
    expect(body.external_url).to.be.equal(
      "https://kovan.iroiro.social/#/explore/nft/distributors/0x931155Dd49192CdA6cA6Fcc72E44b470a02b81CB/campaigns/1"
    );
  });

  it("UUIDNFTDistributor: verifies successful response", async () => {
    const event = {
      pathParameters: {
        tokenId: "1",
        network: "kovan",
        distributor: "uuid",
      },
    };
    const result = await app.handler(event);

    console.debug(result);

    expect(result).to.be.an("object");
    expect(result.statusCode).to.equal(200);
    expect(result.body).to.be.an("string");

    const body = JSON.parse(result.body);
    expect(body.name).to.be.equal("nft url campaign 03221800");
    expect(body.external_url).to.be.equal(
      "https://kovan.iroiro.social/#/explore/nft/distributors/0x9BaeDB90b0B938731b74B8ba9efFA9C8142B1d80/campaigns/1'"
    );
  });

  it("Returns 401 on invalid network", async () => {
    const event = {
      pathParameters: {
        tokenId: "1",
        network: "invalid",
        distributor: "uuid",
      },
    };
    const result = await app.handler(event);

    console.debug(result);

    expect(result).to.be.an("object");
    expect(result.statusCode).to.equal(401);
    expect(result.body).to.be.an("string");

    const body = JSON.parse(result.body);
    expect(body.error).to.be.equal("Invalid network");
  });
});
