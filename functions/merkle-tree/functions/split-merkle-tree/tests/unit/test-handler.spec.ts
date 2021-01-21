"use strict";

import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
} from "aws-lambda";

const app = require("../../src/app");
const chai = require("chai");
const expect = chai.expect;
let event: any, context: APIGatewayEventRequestContext;

describe("Tests Stock Checker", function () {
  it("Verifies response", async () => {
    event = {
      key:
        "0x6ff9dfec88bddca62d41745d6afedab6889fcebec5e3de5624e5bbbdb096150e.json",
      cid: "QmR6oHSLTeTMVdyYWmNZyYLUEYMe6HHQxhBLZajWdSK2MJ",
    };
    const result = await app.lambdaHandler(event, context);
    console.debug("result", result);

    expect(result).to.be.an("object");
    expect(result.merkleRoot).to.be.an("string");
    expect(result.merkleRoot).to.equal(
      "0x6ff9dfec88bddca62d41745d6afedab6889fcebec5e3de5624e5bbbdb096150e"
    );
    expect(result.cid).to.be.an("string");
    expect(result.cid).to.equal(
      "QmR6oHSLTeTMVdyYWmNZyYLUEYMe6HHQxhBLZajWdSK2MJ"
    );
  });
});
