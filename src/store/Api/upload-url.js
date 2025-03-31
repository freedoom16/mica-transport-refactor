import AWS from "aws-sdk";

const spacesEndpoint = new AWS.Endpoint(
  process.env.NEXT_PUBLIC_DO_SPACES_ENDPOINT
);

export const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.NEXT_PUBLIC_DO_SPACES_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_DO_SPACES_SECRET,
  region: process.env.NEXT_PUBLIC_DO_SPACES_REGION,
  signatureVersion: "v4",
});
