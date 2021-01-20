"use strict";

import { APIGatewayEventRequestContext } from "aws-lambda";
import { assert, expect } from "chai";

const app = require("../../src/app");
const chai = require("chai");
const expect = chai.expect;
let event, context: APIGatewayEventRequestContext;

describe("Tests Input Generator", function () {
  it("Verifies response", async () => {
    event = {
      cid: "QmNvbpz6i5FymwMpoTi2e5HJGmFP6WarKTrpzNzY26BTd5",
    };
    const result = await app.lambdaHandler(event, context);
    console.debug("result: ", result);

    expect(result).to.be.an("object");
    expect(result.bucket).to.be.an("string");
    expect(result.bucket).to.equal(process.env.INPUT_BUCKET);
    expect(result.key).to.be.an("string");
    // TODO update
    expect(result.key).to.equal("input.json");
  });
});

describe("getFile", () => {
  it("success", async () => {
    const result = await app.getFile(
      "QmVrBcK6WZvcKvnJXLq1RM8fVkyAdiDXJFvfXxCtQF73MX"
    );
    assert(result.hasOwnProperty("targets"));
    assert(result.hasOwnProperty("type"));
  });
});
