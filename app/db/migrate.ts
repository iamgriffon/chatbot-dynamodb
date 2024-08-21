import { SeedAnswersTable } from "../services/create-answer-table";
import { SeedChatTable } from "../services/create-chat-table";
import { SeedQuestionsTable } from "../services/create-question-table";

export async function Migrate() {
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