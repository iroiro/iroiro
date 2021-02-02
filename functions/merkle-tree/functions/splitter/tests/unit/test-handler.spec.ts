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
  it("Verifies response for address", async () => {
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

  it("Verifies response for keccak256", async () => {
    event = {
      key:
        "0xd37bdc738b33d45e4106dcc00167b4a3c4390ee39741d0bc46ac4e1f5602523d.json",
      cid: "QmU15EnmuNaz3389PAm8j1P9fVQkg1wW57jjkckncCtRLq",
    };
    const result = await app.lambdaHandler(event, context);
    console.debug("result", result);

    expect(result).to.be.an("object");
    expect(result.merkleRoot).to.be.an("string");
    expect(result.merkleRoot).to.equal(
      "0xd37bdc738b33d45e4106dcc00167b4a3c4390ee39741d0bc46ac4e1f5602523d"
    );
    expect(result.cid).to.be.an("string");
    expect(result.cid).to.equal(
      "QmU15EnmuNaz3389PAm8j1P9fVQkg1wW57jjkckncCtRLq"
    );
  });
});
