import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Question } from "@/model/question";

export const client = new DynamoDBClient({
  endpoint: "http://localhost:4566",
  credentials: {
    accessKeyId: 'test',
    secretAccessKey: 'test'
  },
  maxAttempts: 10,
});

const docClient = DynamoDBDocumentClient.from(client);

export const WriteDataOnQuestionsTable = async (Data: Question) => {
  try {
    const command = new PutCommand({
      TableName: "Questions",
      Item: Data
    });

    const response = await docClient.send(command);
    return response;
  } catch (error) {
    throw error;
  }
};