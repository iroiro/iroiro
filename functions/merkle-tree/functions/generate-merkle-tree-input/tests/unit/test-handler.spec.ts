"use strict";

import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
} from "aws-lambda";

const app = require("../../src/app");
const chai = require("chai");
const expect = chai.expect;
let event, context: APIGatewayEventRequestContext;

describe("Tests Stock Checker", function () {
  it("Verifies response", async () => {
    event = {
      cid: "QmNvbpz6i5FymwMpoTi2e5HJGmFP6WarKTrpzNzY26BTd5",
    };
    const result = await app.lambdaHandler(event, context);

    expect(result).to.be.an("object");
    expect(result.stock_price).to.be.an("number");
    expect(result.stock_price).to.be.at.least(0);
    expect(result.stock_price).to.be.at.most(100);
  });
});
