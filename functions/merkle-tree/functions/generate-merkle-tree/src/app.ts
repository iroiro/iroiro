import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
} from "aws-lambda";
// import {
//   parseBalanceMap,
//   MerkleDistributorInfo,
// } from "@iroiro/merkle-distributor/src/parse-balance-map";
import { S3 } from "aws-sdk";
import { getFile } from "../../generate-merkle-tree-input/src/app";
const s3 = new S3();

exports.lambdaHandler = async (
  event: APIGatewayProxyEvent,
  context: APIGatewayEventRequestContext
) => {
  // @ts-ignore
  const cid = event["cid"];

  // error handling
  const input = await getFile(cid);

  // TODO enable
  // const merkleTree: MerkleDistributorInfo = parseBalanceMap(input);
  // console.debug(merkleTree);

  // TODO remove
  const merkleTree = {
    merkleRoot:
      "0x6ff9dfec88bddca62d41745d6afedab6889fcebec5e3de5624e5bbbdb096150e",
    tokenTotal: "0x012c",
    claims: {
      "0x4B8619890fa9C3cF11C497961eB4b970D440127F": {
        index: 0,
        amount: "0x64",
        proof: [
          "0x7311552d5f9556294eef04cdff6a9cc8e52a4495f176f4afd05703eee0965701",
          "0xc97b2929d684f9ccf38caadfa13e3661db2f2f54dbbaec067ea5cddffc5119bc",
        ],
      },
      "0x84d800DaE0Bdb31A4DE9918782bffCc8D041c1b8": {
        index: 1,
        amount: "0x64",
        proof: [
          "0xc660c61a0f96370be603ef502b3bfd03e978e38d028d75c8ab1034bcbb0f5e63",
          "0xc97b2929d684f9ccf38caadfa13e3661db2f2f54dbbaec067ea5cddffc5119bc",
        ],
      },
      "0x9668a1605Be15b66181d6C4cAD20D4c3Ee0DBDb1": {
        index: 2,
        amount: "0x64",
        proof: [
          "0x4fa9525c09dc3b89a9c4141b8e29d339ee6745d7476e9606cb6531bbe132e6f7",
        ],
      },
    },
  };

  const merkleTreeBucket = process.env.MERKLE_TREE_BUCKET;
  // TODO Get merkle tree cid
  const cid = "testcid";
  const merkleTreeKey = cid + ".json";
  // Upload merkle tree to S3
  const putObjectParams = {
    Bucket: merkleTreeBucket,
    Key: merkleTreeKey,
    Body: JSON.stringify(merkleTree),
  };
  await s3
    .putObject(putObjectParams)
    .promise()
    .then((result) => {
      console.info(result);
    })
    .catch((err) => {
      console.error(err);
    });

  // unpin used input cid

  return {
    bucket: merkleTreeBucket,
    key: merkleTreeKey,
  };
};
