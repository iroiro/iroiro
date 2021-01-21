import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
} from "aws-lambda";
import { S3 } from "aws-sdk";
import axios, { AxiosRequestConfig } from "axios";
import * as FormData from "form-data";
import * as stream from "stream";

const s3 = new S3();

export interface PinFileResult {
  readonly IpfsHash: string;
}

exports.lambdaHandler = async (event: APIGatewayProxyEvent) => {
  // @ts-ignore
  const key = event["key"];
  console.debug("key", key);

  const merkleTreeBucket = process.env.MERKLE_TREE_BUCKET;
  const params: S3.Types.GetObjectRequest = {
    Bucket: merkleTreeBucket,
    Key: key,
  };

  // TODO check is present
  const s3Stream = s3.getObject(params).createReadStream();

  const result = await uploadFile(s3Stream, key);
  if (result === undefined) {
    // TODO error
  }

  return {
    cid: result.IpfsHash,
    key,
  };
};

export const uploadFile = async (
  file: stream.Readable | string,
  filename: string
): Promise<PinFileResult | undefined> => {
  const form = new FormData();
  form.append("file", file, {
    filename,
  });

  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  const config: AxiosRequestConfig = {
    method: "post",
    url: url,
    maxBodyLength: Infinity,
    headers: {
      pinata_api_key: process.env.PINATA_API_KEY,
      pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
      ...form.getHeaders(),
    },
    data: form,
  };

  return await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
};
