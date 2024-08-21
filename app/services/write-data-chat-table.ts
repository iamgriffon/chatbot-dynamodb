import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { client } from "./client";

const docClient = DynamoDBDocumentClient.from(client);

export const WriteDataOnChatTable = async (
  chatId: string,
  questionId: string,
  answerId: string
) => {
  try {
    const chatItem = {
      chatId: chatId,
      createdAt: new Date().toISOString(),
      chat: [
        {
          questionId: questionId,
          answerId: answerId,
        },
      ],
    };

    const write = new PutCommand({
      TableName: "Chats",
      Item: chatItem,
    });

    const writeResponse = await docClient.send(write);
    return writeResponse;
  } catch (error) {
    throw error;
  }
};
