/*
 *     Copyright (C) 2021 TART K.K.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see https://www.gnu.org/licenses/.
 */

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
const thousandKeccak256TargetsCid =
  "QmTvMZwdnxZdrKWrpuRmVAvrqCiSbgWsf3xZCyZv9RcfUx";
const twoThousandsOneKeccak256TargetsCid =
  "QmWMU3ZVpcEPyohFmtZHmhzD5keoFnKi6qKYCTVxBLDqqZ";
const invalidKeccakTargetsCid =
  "QmTgnu6GSJUR3bSJjkibtDDbBZjRKxfSVxWj12MjEPSmrH";
const invalidFormatCid = "QmVLdXh64DftwGmj5AZLZJUVCzAz4TJRPEcgTD8urxGQMo";

describe("Tests Input Generator", function () {
  describe("address type", () => {
    it("Verifies response", async () => {
      event = {
        cid: addressTargetsCid,
        amount: "64",
      };
      const result = await app.lambdaHandler(event, context);
      console.debug("result: ", result);

      expect(result).to.be.an("object");
      expect(result.cid).to.be.an("string");
      expect(result.cid).to.equal(
        "QmZdgUT5UPRzhyguZkQjWpn6MHh1JkeCUk9cFprkp5vCZD"
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
            'invalid BigNumber string (argument="value", value="", code=INVALID_ARGUMENT, version=bignumber/5.0.13)'
          );
        }

        event = {
          cid: addressTargetsCid,
          amount: "0",
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
          amount: "64",
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
        amount: "64",
      };
      const result = await app.lambdaHandler(event, context);
      console.debug("result: ", result);

      expect(result).to.be.an("object");
      expect(result.cid).to.be.an("string");
      expect(result.cid).to.equal(
        "QmRpWx9MWpFgJugfZww1uWTaK6tJymmzeuWEcBsBkcijvV"
      );
      expect(result.type).to.be.an("string");
      expect(result.type).to.equal("keccak256");
    });

    it("1000 targets", async () => {
      event = {
        cid: thousandKeccak256TargetsCid,
        amount: "64",
      };
      const result = await app.lambdaHandler(event, context);
      console.debug("result: ", result);

      expect(result).to.be.an("object");
      expect(result.cid).to.be.an("string");
      expect(result.cid).to.equal(
        "QmWVa4BKdeLaSezTosWzRQJmuhy9Na18LiDxRVj2K1WTKQ"
      );
      expect(result.type).to.be.an("string");
      expect(result.type).to.equal("keccak256");
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
            'invalid BigNumber string (argument="value", value="", code=INVALID_ARGUMENT, version=bignumber/5.0.13)'
          );
        }

        event = {
          cid: keccak256TargetsCid,
          amount: "0",
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
          amount: "64",
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
      amount: "64",
    };
    try {
      await app.lambdaHandler(event, context);
      assert.fail();
    } catch (err) {
      expect(err.message).to.be.equals("given file is invalid.");
    }
  });

  it("throws error if target quantity exceeds 2001", async () => {
    event = {
      cid: twoThousandsOneKeccak256TargetsCid,
      amount: "2710",
    };
    try {
      await app.lambdaHandler(event, context);
      assert.fail();
    } catch (err) {
      expect(err.message).to.be.equals(
        "Targets quantity exceed upper limit. Limit: 2000, Actual: 2001"
      );
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
