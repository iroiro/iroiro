"use strict";

import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
} from "aws-lambda";

const app = require("../../src/app");
const chai = require("chai");
const expect = chai.expect;
let event: APIGatewayProxyEvent, context: APIGatewayEventRequestContext;

describe("Tests Stock Checker", function () {
  it("Verifies response", async () => {
    event = {
      bucket: process.env.MERKLE_TREE_BUCKET,
      // TODO update key
      key: "testcid.json",
    };
    const result = await app.lambdaHandler(event, context);
    console.debug("result", result);

    expect(result).to.be.an("object");
    expect(result.cid).to.be.an("string");
    expect(result.cid).to.equal(
      "QmR6oHSLTeTMVdyYWmNZyYLUEYMe6HHQxhBLZajWdSK2MJ"
    );
  });
});
