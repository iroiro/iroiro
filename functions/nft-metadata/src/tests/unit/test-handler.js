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
    expect(body.name).to.be.a("string");
    expect(body.image.startsWith("https://cloudflare-ipfs.com/ipfs/")).to.be;
    expect(body.image.length).to.be.equal(79);
    expect(body.external_url).to.be.equal(
      "https://kovan.iroiro.social/#/explore/nft/distributors/0xF455C338cecBC0fEe3E131B2Cfb04A76DBB79D88/campaigns/1"
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
    expect(body.name).to.be.an("string");
    expect(body.image.startsWith("https://cloudflare-ipfs.com/ipfs/")).to.be
      .true;
    expect(body.image.length).to.be.equal(79);
    expect(body.external_url).to.be.equal(
      "https://kovan.iroiro.social/#/explore/nft/distributors/0x49f5C75184948dADa55e3Dc4cb354ea0775e0dbF/campaigns/1"
    );
  });

  it("WalletNFTDistributor: works for different network", async () => {
    const event = {
      pathParameters: {
        tokenId: "1",
        network: "rinkeby",
        distributor: "wallet",
      },
    };
    const result = await app.handler(event);

    console.debug(result);

    expect(result).to.be.an("object");
    expect(result.statusCode).to.equal(200);
    expect(result.body).to.be.an("string");

    const body = JSON.parse(result.body);
    expect(body.name).to.be.a("string");
    expect(body.image.startsWith("https://cloudflare-ipfs.com/ipfs/")).to.be
      .true;
    expect(body.image.length).to.be.equal(79);
    expect(body.external_url).to.be.equal(
      "https://rinkeby.iroiro.social/#/explore/nft/distributors/0xfb879fB06D3ebFA497c2897Dfd17a2078b50E442/campaigns/1"
    );
  });

  it("UUIDNFTDistributor: works for different network", async () => {
    const event = {
      pathParameters: {
        tokenId: "1",
        network: "rinkeby",
        distributor: "uuid",
      },
    };
    const result = await app.handler(event);

    console.debug(result);

    expect(result).to.be.an("object");
    expect(result.statusCode).to.equal(200);
    expect(result.body).to.be.an("string");

    const body = JSON.parse(result.body);
    expect(body.name).to.be.a("string");
    expect(body.image.startsWith("https://cloudflare-ipfs.com/ipfs/")).to.be
      .true;
    expect(body.image.length).to.be.equal(79);
    expect(body.external_url).to.be.equal(
      "https://rinkeby.iroiro.social/#/explore/nft/distributors/0x907B024D3E2493c224d4dCe7a3Bb578A46c5af7C/campaigns/1"
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
