
import { DynamoDBDocumentClient, GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { client } from "@/db/client";
import { response } from "express";
const docClient = DynamoDBDocumentClient.from(client);

export const QueryChatById = async (chatId: string) => {
  try {
    const query = new QueryCommand({
      TableName: "Chats",
      KeyConditionExpression: "chatId = :chatId",
      ExpressionAttributeValues: {
        ":chatId": chatId
      }
    })
    const queryResponse = await docClient.send(query);
    return queryResponse;
  } catch (error) {
    throw error;
  }
}