import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { client } from "@/db/client";

export const ScanQuestionsTable = async () => {
   try {
      const command = new ScanCommand({ TableName: "Questions" });
      const response = await client.send(command);
      return response;
   } catch (error) {
      console.error("Error reading table:", error);
      throw error;
   }
}
