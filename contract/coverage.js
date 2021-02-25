#!/usr/bin/env node

const { runCoverage } = require("@openzeppelin/test-environment");

runCoverage(
  [],
  "yarn compile",
  "./node_modules/.bin/mocha --exit --timeout 10000 --recursive".split(" ")
);
