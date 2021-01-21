"use strict";

import { APIGatewayEventRequestContext } from "aws-lambda";
import { assert } from "chai";

const app = require("../../src/app");
const chai = require("chai");
const expect = chai.expect;
let event, context: APIGatewayEventRequestContext;

describe("Tests Input Generator", function () {
  it("Verifies response", async () => {
    event = {
      cid: "QmVrBcK6WZvcKvnJXLq1RM8fVkyAdiDXJFvfXxCtQF73MX",
      amount: 100,
    };
    const result = await app.lambdaHandler(event, context);
    console.debug("result: ", result);

    expect(result).to.be.an("object");
    expect(result.cid).to.be.an("string");
    expect(result.cid).to.equal(
      "QmV9ZNxdwamcxx9CuhBpwZCTSLXgwFths5GRRdBDubi3gB"
    );
  });

  describe("failed cases", () => {
    it("throws error if amount is invalid", async () => {
      event = {
        cid: "QmVrBcK6WZvcKvnJXLq1RM8fVkyAdiDXJFvfXxCtQF73MX",
      };
      try {
        await app.lambdaHandler(event, context);
        assert.fail();
      } catch (err) {
        expect(err.message).to.be.equals(
          "amount is invalid. passed: undefined"
        );
      }

      event = {
        cid: "QmVrBcK6WZvcKvnJXLq1RM8fVkyAdiDXJFvfXxCtQF73MX",
        amount: 0,
      };
      try {
        await app.lambdaHandler(event, context);
        assert.fail();
      } catch (err) {
        expect(err.message).to.be.equals("amount is invalid. passed: 0");
      }
    });

    it("throws error if type is not address or undefined", async () => {
      event = {
        cid: "QmVLdXh64DftwGmj5AZLZJUVCzAz4TJRPEcgTD8urxGQMo",
        amount: 100,
      };
      try {
        await app.lambdaHandler(event, context);
        assert.fail();
      } catch (err) {
        expect(err.message).to.be.equals("given file is invalid.");
      }
    });

    it("throws error if targets contains non address value", async () => {
      event = {
        cid: "QmZWoyBX9Xe9osN9nj1nWYXdm2akLuTcbpWJ1AZaKPNWbT",
        amount: 100,
      };
      try {
        await app.lambdaHandler(event, context);
        assert.fail();
      } catch (err) {
        expect(err.message).to.be.equals(
          "Non address value is contained in targets."
        );
      }
    });
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
