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

import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
} from "aws-lambda";
import { S3 } from "aws-sdk";

const s3 = new S3();

exports.lambdaHandler = async (event: APIGatewayProxyEvent) => {
  // @ts-ignore
  const cid = event["cid"];
  // @ts-ignore
  const key = event["key"];

  const merkleTreeBucket = process.env.MERKLE_TREE_BUCKET;
  const params: S3.Types.GetObjectRequest = {
    Bucket: merkleTreeBucket,
    Key: key,
  };
  console.debug("key", key);

  const merkleTree = await s3
    .getObject(params)
    .promise()
    .then((data) => {
      return JSON.parse(data.Body.toString());
    })
    .catch((err) => {
      console.error("Error calling S3 getObject:", err);
    });

  // TODO error handling
  const merkleProofBucket = process.env.MERKLE_PROOF_BUCKET;
  await Promise.all(
    Object.entries(merkleTree.claims).map(async ([address, proof]) => {
      const merkleTreeKey = `${cid}/${address.toLowerCase()}.json`;
      const putObjectParams: S3.Types.PutObjectRequest = {
        Bucket: merkleProofBucket,
        Key: merkleTreeKey,
        Body: JSON.stringify(proof),
        ContentType: "application/json",
      };
      return s3
        .putObject(putObjectParams)
        .promise()
        .then((result) => {
          console.info(result);
        })
        .catch((err) => {
          console.error(err);
        });
    })
  );

  // TODO error handling if upload failed

  return {
    cid,
    merkleRoot: merkleTree.merkleRoot,
  };
};
