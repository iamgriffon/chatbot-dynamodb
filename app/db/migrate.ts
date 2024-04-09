import { SeedAnswersTable } from "../services/create-answer-table";
import { SeedChatTable } from "../services/create-chat-table";
import { SeedQuestionsTable } from "../services/create-question-table";
import { DeleteAnswersTable } from "../services/delete-answer-table";
import { DeleteChatTable } from "../services/delete-chat-table";
import { DeleteQuestionsTable } from "../services/delete-question-table";

export async function Migrate() {
  // try {
  //   await Promise.all([
  //     DeleteQuestionsTable(),
  //     DeleteAnswersTable(),
  //     DeleteChatTable()])
  // } catch {
  //   console.log('Error deleting tables')
  // }

  try {
    await Promise.all([
      SeedQuestionsTable(),
      SeedAnswersTable(),
      SeedChatTable(),
    ])
  } catch {
    console.log('Error seeding tables')
  }
}

await Migrate();