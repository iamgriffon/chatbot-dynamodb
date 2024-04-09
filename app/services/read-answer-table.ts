import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { client } from "@/db/client";

export const ScanAnswersTable = async () => {
  const command = new ScanCommand({ TableName: "Answers" });

  try {
    const response = await client.send(command);
    return response;
 } catch (error) {
    console.error("Error reading table:", error);
    throw error;
 }
}
