import { DynamoDBClient, PutItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Answer } from "@/model/answer";

export const client = new DynamoDBClient({
  endpoint: "http://localhost:4566",
  credentials: {
    accessKeyId: 'test',
    secretAccessKey: 'test'
  },
  maxAttempts: 10,
});

const docClient = DynamoDBDocumentClient.from(client);

export const WriteDataOnChatTable = async (chatId: string, questionId: string, answerId: string) => {
  try {
    const chatItem = {
      chatId: chatId,
      createdAt: new Date().toISOString(),
      chat: [
        {
          questionId: questionId,
          answerId: answerId
        }
      ]
    };

    const write = new PutCommand({
      TableName: "Chats",
      Item: chatItem
    })

    const writeResponse = await docClient.send(write);
    return writeResponse;
  } catch (error) {
    throw error
  }
};