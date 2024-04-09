import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { client } from "@/db/client";
const docClient = DynamoDBDocumentClient.from(client);

export const QueryAnswersById = async (id: string) => {
  const command = new QueryCommand({
    TableName: "Answers",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": id
    },
  })
 
  try {
     const response = await docClient.send(command);
     return response;
  } catch (error) {
     console.error("Error querying Answers table by email:", error);
     throw error;
  }
 };