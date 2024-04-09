import { randomUUID } from "crypto";

export class Answer {
  id: string;
  answer: { "S": string };
  createdAt: { "S": string };

  constructor(answer: string ) {
    this.id = randomUUID();
    this.answer = { "S": answer };
    this.createdAt = { "S": new Date().toString() };
  }
}