import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Answer } from "@/model/answer";
import { client } from "./client";

const docClient = DynamoDBDocumentClient.from(client);

export const WriteDataOnAnswersTable = async (Data: Answer) => {
  try {
    const command = new PutCommand({
      TableName: "Answers",
      Item: Data,
    });

    const response = await docClient.send(command);
    return response;
  } catch (error) {
    throw error;
  }
};
