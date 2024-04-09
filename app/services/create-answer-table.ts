import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { client } from "@/db/client";

export const SeedAnswersTable = async () => {
  const command = new CreateTableCommand({
    TableName: "Answers",
    KeySchema: [
      { AttributeName: "id", KeyType: "HASH" },
    ],
    AttributeDefinitions: [
      { AttributeName: "id", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
  });

  try {
    const response = await client.send(command);
    return response;
  } catch (error) {
    console.error("Error creating table:", error);
    throw error;
  }
};
