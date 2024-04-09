import { randomUUID } from "crypto";

export class Question {
  id: string;
  email: string;
  question: { "S": string };
  createdAt: { "S": string };

  constructor(email: string, question: string) {
    this.id = randomUUID();
    this.email = email;
    this.question = { "S": question };
    this.createdAt = { "S": new Date().toString() };
  }
}