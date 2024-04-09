import { randomUUID } from "crypto";

type ChatArray = {
  questionId: { "S": string };
  answerId: { "S": string };
};

export class Chat {
  chatId: string;
  createdAt: { "S": string };
  chat: ChatArray[];

  constructor(questionId: string, answerId: string) {
    this.chatId = randomUUID();
    this.createdAt = { "S": new Date().toISOString() };
    this.chat = [
      {
        questionId: { "S": questionId },
        answerId: { "S": answerId }
      }
    ];
  }
}
