import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { client } from "@/db/client";
const docClient = DynamoDBDocumentClient.from(client);

export const QueryQuestionsById = async (id: string) => {
  const command = new QueryCommand({
    TableName: "Questions",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": id
    },
  })
 
  try {
     const response = await docClient.send(command);
     return response;
  } catch (error) {
     console.error("Error querying Questions table by email:", error);
     throw error;
  }
 };