import { DeleteItemCommand, DeleteTableCommand } from "@aws-sdk/client-dynamodb";
import { client } from "@/db/client";

export const DeleteQuestionItem = async (deletedId: string) => {
  const command = new DeleteItemCommand({ TableName: "Questions", Key: {
    id: {
      S: deletedId
    },
  } });

  try {
    const response = await client.send(command);
    return response;
  } catch (error) {
    console.error("Error deleting table:", error);
    throw error;
  }
}
