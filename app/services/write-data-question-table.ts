import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Question } from "@/model/question";
import { client } from "./client";

const docClient = DynamoDBDocumentClient.from(client);

export const WriteDataOnQuestionsTable = async (Data: Question) => {
  try {
    const command = new PutCommand({
      TableName: "Questions",
      Item: Data,
    });

    const response = await docClient.send(command);
    return response;
  } catch (error) {
    throw error;
  }
};
