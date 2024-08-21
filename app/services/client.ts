import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const client = new DynamoDBClient({
  endpoint: "http://localhost:4566",
  credentials: {
    accessKeyId: 'test',
    secretAccessKey: 'test'
  },
  maxAttempts: 10,
});
