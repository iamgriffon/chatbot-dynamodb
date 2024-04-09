import { DeleteTableCommand } from "@aws-sdk/client-dynamodb";
import { client } from "@/db/client";

export const DeleteAnswersTable = async () => {
  const command = new DeleteTableCommand({ TableName: "Answers" });

  try {
    const response = await client.send(command);
    return response;
  } catch (error) {
    console.error("Error deleting table:", error);
    throw error;
  }
}
