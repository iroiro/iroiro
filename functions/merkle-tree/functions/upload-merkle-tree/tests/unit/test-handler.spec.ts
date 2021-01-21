"use strict";

import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
} from "aws-lambda";
import { uploadFile } from "../../src/app";

const app = require("../../src/app");
const chai = require("chai");
const expect = chai.expect;
let event: any, context: APIGatewayEventRequestContext;

describe("Tests Stock Checker", function () {
  it("Verifies response", async () => {
    event = {
      key:
        "0x6ff9dfec88bddca62d41745d6afedab6889fcebec5e3de5624e5bbbdb096150e.json",
    };
    const result = await app.lambdaHandler(event, context);
    console.debug("result", result);

    expect(result).to.be.an("object");
    expect(result.cid).to.be.an("string");
    expect(result.cid).to.equal(
      "QmR6oHSLTeTMVdyYWmNZyYLUEYMe6HHQxhBLZajWdSK2MJ"
    );
    expect(result.key).to.be.an("string");
    expect(result.key).to.equal(
      "0x6ff9dfec88bddca62d41745d6afedab6889fcebec5e3de5624e5bbbdb096150e.json"
    );
  });
});

describe("uploadFile", () => {
  it("success", async () => {
    const testObject = {
      test: "value",
    };
    const result = await uploadFile(JSON.stringify(testObject), "test.json");
    console.debug(result);
    expect(result).to.not.be.undefined;
    expect(result.IpfsHash).to.be.an("string");
    expect(result.IpfsHash).to.equal(
      "QmTDdDS952gV3XjMVUYmtMBa2q2HJn342exBUtUb67pV6t"
    );
  });
});
