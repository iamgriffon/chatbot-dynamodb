import { CreateTableCommand, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { client } from "@/db/client";

export const SeedQuestionsTable = async () => {
  const command = new CreateTableCommand({
    TableName: "Questions",
    KeySchema: [
      { AttributeName: "id", KeyType: "HASH" },
      { AttributeName: "email", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "id", AttributeType: "S" },
      { AttributeName: "email", AttributeType: "S" }
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
