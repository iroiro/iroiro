import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
} from "aws-lambda";
import { S3 } from "aws-sdk";
import axios, { AxiosRequestConfig } from "axios";
import * as FormData from "form-data";

const s3 = new S3();

exports.lambdaHandler = async (
  event: APIGatewayProxyEvent,
  context: APIGatewayEventRequestContext
) => {
  // TODO get bucket and key from input
  const bucket = process.env.MERKLE_TREE_BUCKET;
  const key = "testcid.json";

  const params: S3.Types.GetObjectRequest = {
    Bucket: bucket,
    Key: key,
  };

  // TODO check is present
  const s3Stream = s3.getObject(params).createReadStream();

  const form = new FormData();
  form.append("file", s3Stream, {
    // TOdO Get file name from key
    filename: key,
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

  const result = await axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
  if (result === undefined) {
    // TODO error
  }

  return {
    cid: result.IpfsHash,
  };
};
