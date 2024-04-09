import { DeleteItemCommand, DeleteTableCommand } from "@aws-sdk/client-dynamodb";
import { client } from "@/db/client";

export const DeleteChatItem = async (deletedId: string) => {
  const command = new DeleteItemCommand({ TableName: "Chats", Key: {
    chatId: {
      S: deletedId
    }
  } });

  try {
    const response = await client.send(command);
    return response;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
}
