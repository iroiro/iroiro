"use strict";

import { APIGatewayEventRequestContext } from "aws-lambda";
import { assert } from "chai";

const app = require("../../src/app");
const chai = require("chai");
const expect = chai.expect;
let event: any, context: APIGatewayEventRequestContext;

describe("Tests Generator", function () {
  it("Verifies response for address", async () => {
    event = {
      cid: "QmV9ZNxdwamcxx9CuhBpwZCTSLXgwFths5GRRdBDubi3gB",
      type: "address",
    };
    const result = await app.lambdaHandler(event, context);
    console.debug("result", result);

    expect(result).to.be.an("object");
    expect(result.bucket).to.be.an("string");
    expect(result.bucket).to.equal(process.env.MERKLE_TREE_BUCKET);
    expect(result.key).to.be.an("string");
    expect(result.key).to.equal(
      "0x6ff9dfec88bddca62d41745d6afedab6889fcebec5e3de5624e5bbbdb096150e.json"
    );
  });

  it("Verifies response for keccak256", async () => {
    event = {
      cid: "QmbE1NKLTsSvNAeECC5KnXxG8nFmaP5XAoY67GbDZHb56W",
      type: "keccak256",
    };
    const result = await app.lambdaHandler(event, context);
    console.debug("result", result);

    expect(result).to.be.an("object");
    expect(result.bucket).to.be.an("string");
    expect(result.bucket).to.equal(process.env.MERKLE_TREE_BUCKET);
    expect(result.key).to.be.an("string");
    expect(result.key).to.equal(
      "0xd37bdc738b33d45e4106dcc00167b4a3c4390ee39741d0bc46ac4e1f5602523d.json"
    );
  });

  it("throws an error if input does not have field", async () => {
    event = {
      cid: "QmbE1NKLTsSvNAeECC5KnXxG8nFmaP5XAoY67GbDZHb56W",
    };
    try {
      await app.lambdaHandler(event, context);
      assert.fail();
    } catch (err) {
      expect(err.message).to.be.equals("Unexpected type.");
    }
  });
});
