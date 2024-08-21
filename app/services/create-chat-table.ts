import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { client } from "@/db/client";

export const SeedChatTable = async () => {
  const command = new CreateTableCommand({
    TableName: "Chats",
    KeySchema: [{ AttributeName: "chatId", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "chatId", AttributeType: "S" }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  });

  try {
    const response = await client.send(command);
    return response;
  } catch (error) {
    console.error("Error creating table:", error);
    throw error;
  }
};
