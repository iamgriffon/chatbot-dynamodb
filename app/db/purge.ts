import { DeleteAnswersTable } from "../services/delete-answer-table";
import { DeleteChatTable } from "../services/delete-chat-table";
import { DeleteQuestionsTable } from "../services/delete-question-table";

export async function Purge() {
  try {
    await Promise.all([await DeleteQuestionsTable(),
    await DeleteAnswersTable(),
    await DeleteChatTable(),])
  } catch {
    console.log('Error deleting tables')
  }
}

await Purge();