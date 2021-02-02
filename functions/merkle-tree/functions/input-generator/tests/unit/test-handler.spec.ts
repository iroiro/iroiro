"use strict";

import { APIGatewayEventRequestContext } from "aws-lambda";
import { assert } from "chai";

const app = require("../../src/app");
const chai = require("chai");
const expect = chai.expect;
let event, context: APIGatewayEventRequestContext;

const addressTargetsCid = "QmVrBcK6WZvcKvnJXLq1RM8fVkyAdiDXJFvfXxCtQF73MX";
const invalidAddressTargetsCid =
  "QmZWoyBX9Xe9osN9nj1nWYXdm2akLuTcbpWJ1AZaKPNWbT";
const keccak256TargetsCid = "QmVujr4pE8wfjjjHHFqmivg1otenc4AAgrLzsx4dkT5YvM";
const invalidKeccakTargetsCid =
  "QmTgnu6GSJUR3bSJjkibtDDbBZjRKxfSVxWj12MjEPSmrH";
const invalidFormatCid = "QmVLdXh64DftwGmj5AZLZJUVCzAz4TJRPEcgTD8urxGQMo";

describe("Tests Input Generator", function () {
  describe("address type", () => {
    it("Verifies response", async () => {
      event = {
        cid: addressTargetsCid,
        amount: 100,
      };
      const result = await app.lambdaHandler(event, context);
      console.debug("result: ", result);

      expect(result).to.be.an("object");
      expect(result.cid).to.be.an("string");
      expect(result.cid).to.equal(
        "QmV9ZNxdwamcxx9CuhBpwZCTSLXgwFths5GRRdBDubi3gB"
      );
      expect(result.type).to.be.an("string");
      expect(result.type).to.equal("address");
    });

    describe("failed cases", () => {
      it("throws error if amount is invalid", async () => {
        event = {
          cid: addressTargetsCid,
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
          cid: addressTargetsCid,
          amount: 0,
        };
        try {
          await app.lambdaHandler(event, context);
          assert.fail();
        } catch (err) {
          expect(err.message).to.be.equals("amount is invalid. passed: 0");
        }
      });

      it("throws error if targets contains non address value", async () => {
        event = {
          cid: invalidAddressTargetsCid,
          amount: 100,
        };
        try {
          await app.lambdaHandler(event, context);
          assert.fail();
        } catch (err) {
          expect(err.message).to.be.equals("given file is invalid.");
        }
      });
    });
  });

  describe("keccak256 type", () => {
    it("Verifies response", async () => {
      event = {
        cid: keccak256TargetsCid,
        amount: 100,
      };
      const result = await app.lambdaHandler(event, context);
      console.debug("result: ", result);

      expect(result).to.be.an("object");
      expect(result.cid).to.be.an("string");
      expect(result.cid).to.equal(
        "QmbE1NKLTsSvNAeECC5KnXxG8nFmaP5XAoY67GbDZHb56W"
      );
      expect(result.type).to.be.an("string");
      expect(result.type).to.equal("address");
    });

    describe("failed cases", () => {
      it("throws error if amount is invalid", async () => {
        event = {
          cid: keccak256TargetsCid,
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
          cid: keccak256TargetsCid,
          amount: 0,
        };
        try {
          await app.lambdaHandler(event, context);
          assert.fail();
        } catch (err) {
          expect(err.message).to.be.equals("amount is invalid. passed: 0");
        }
      });

      it("throws error if targets contains non hashed value", async () => {
        event = {
          cid: invalidKeccakTargetsCid,
          amount: 100,
        };
        try {
          await app.lambdaHandler(event, context);
          assert.fail();
        } catch (err) {
          expect(err.message).to.be.equals("given file is invalid.");
        }
      });
    });
  });

  it("throws error if type is not address or undefined", async () => {
    event = {
      cid: invalidFormatCid,
      amount: 100,
    };
    try {
      await app.lambdaHandler(event, context);
      assert.fail();
    } catch (err) {
      expect(err.message).to.be.equals("given file is invalid.");
    }
  });
});

describe("getFile", () => {
  it("success", async () => {
    const result = await app.getFile(addressTargetsCid);
    assert(result.hasOwnProperty("targets"));
    assert(result.hasOwnProperty("type"));
  });
});
