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
  it("Verifies response for address", async () => {
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

  it("Verifies response for keccak256", async () => {
    event = {
      key:
        "0xd37bdc738b33d45e4106dcc00167b4a3c4390ee39741d0bc46ac4e1f5602523d.json",
    };
    const result = await app.lambdaHandler(event, context);
    console.debug("result", result);

    expect(result).to.be.an("object");
    expect(result.cid).to.be.an("string");
    expect(result.cid).to.equal(
      "QmU15EnmuNaz3389PAm8j1P9fVQkg1wW57jjkckncCtRLq"
    );
    expect(result.key).to.be.an("string");
    expect(result.key).to.equal(
      "0xd37bdc738b33d45e4106dcc00167b4a3c4390ee39741d0bc46ac4e1f5602523d.json"
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
