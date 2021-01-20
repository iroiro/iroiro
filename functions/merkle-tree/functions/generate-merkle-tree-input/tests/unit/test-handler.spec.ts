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
    expect(result.cid).to.be.an("string");
    expect(result.cid).to.equal(
      "QmbJWAESqCsf4RFCqEY7jecCashj8usXiyDNfKtZCwwzGb"
    );
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
