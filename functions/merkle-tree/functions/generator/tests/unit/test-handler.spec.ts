"use strict";

import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
} from "aws-lambda";

const app = require("../../src/app");
const chai = require("chai");
const expect = chai.expect;
let event: any, context: APIGatewayEventRequestContext;

describe("Tests Generator", function () {
  it("Verifies response", async () => {
    event = {
      cid: "QmV9ZNxdwamcxx9CuhBpwZCTSLXgwFths5GRRdBDubi3gB",
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
});
