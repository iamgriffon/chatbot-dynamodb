import { DeleteAnswersTable } from "../services/delete-answer-table";
import { DeleteChatTable } from "../services/delete-chat-table";
import { DeleteQuestionsTable } from "../services/delete-question-table";

async function Purge() {
  try {
    await DeleteQuestionsTable();
    await DeleteAnswersTable();
    await DeleteChatTable();
  } catch {
    console.log('Error deleting tables')
  }
}

await Purge();