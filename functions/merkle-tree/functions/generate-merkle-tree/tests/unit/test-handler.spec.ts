"use strict";

import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
} from "aws-lambda";

const app = require("../../src/app");
const chai = require("chai");
const expect = chai.expect;
let event: APIGatewayProxyEvent, context: APIGatewayEventRequestContext;

describe("Tests Generator", function () {
  it("Verifies response", async () => {
    event = {
      object: process.env.INPUT_BUCKET,
      // TODO update key
      key: "input.json",
    };
    const result = await app.lambdaHandler(event, context);
    console.debug("result", result);

    expect(result).to.be.an("object");
    expect(result.bucket).to.be.an("string");
    expect(result.bucket).to.equal(process.env.MERKLE_TREE_BUCKET);
    expect(result.key).to.be.an("string");
    // TODO update
    expect(result.key).to.equal("testcid.json");
  });
});
