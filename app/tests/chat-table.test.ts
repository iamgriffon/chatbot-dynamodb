import { describe, expect, it, beforeAll, afterAll } from "bun:test";
import type { CreateTableCommandOutput } from "@aws-sdk/client-dynamodb";
import { Chat } from "../model/chat";
import { SeedChatTable } from "../services/create-chat-table";
import { WriteDataOnChatTable } from "../services/write-data-chat-table";
import { DeleteChatTable } from "../services/delete-chat-table";
import { ScanChatsTable } from "../services/read-chat-table";
import { QueryChatById } from "../services/read-data-chat-table";
import { DeleteChatItem } from "../services/delete-data-chat-table";

const tableName = "Chats";

describe("Chats Table", () => {
  let chat: Chat;

  beforeAll(async () => {
    await SeedChatTable();
    chat = new Chat('question.id', 'answer.id');
    await WriteDataOnChatTable(chat.chatId, 'question.id', 'answer.id');
  });

  afterAll(async () => {
    await DeleteChatTable();
  });

  describe("it should create a table", () => {
    let res: CreateTableCommandOutput;

    beforeAll(async () => {
      await DeleteChatTable()
      chat = new Chat('question.id', 'answer.id');
      res = await SeedChatTable();
    });

    it("response should have HTTP Status = 200", () => {
      expect(res.$metadata?.httpStatusCode).toBe(200);
    });

    it("response should have TableStatus = ACTIVE", () => {
      expect(res.TableDescription?.TableStatus).toBe("ACTIVE");
    });

    it("Table name should be 'Chats'", () => {
      expect(res.TableDescription?.TableName).toBe(tableName);
    });
  });

  describe("it should read a table", () => {
    let res: CreateTableCommandOutput;

    beforeAll(async () => {
      res = await ScanChatsTable();
    });

    it("response should have HTTP Status = 200", () => {
      expect(res.$metadata?.httpStatusCode).toBe(200);
    });
  });

  describe("it should write data into a table", () => {
    let res: CreateTableCommandOutput;

    beforeAll(async () => {
      res = await WriteDataOnChatTable(chat.chatId, 'question.id', 'answer.id');
    });

    it("response should have HTTP Status = 200", () => {
      expect(res.$metadata?.httpStatusCode).toBe(200);
    });

    it("response requestId must be a string", () => {
      expect(res.$metadata?.requestId).toBeString();
    });

    it("should have one element", async () => {
      const amount = (await ScanChatsTable()).Count;
      expect(amount).toBe(1);
    });
  });

  describe("it should read data from a table", async () => {
    let res: CreateTableCommandOutput;

    beforeAll(async () => {
      res = await QueryChatById(chat.chatId);
    });

    it("response should have HTTP Status = 200", () => {
      expect(res.$metadata.httpStatusCode).toBe(200);
    });

    it("response requestId must be a string", () => {
      expect(res.$metadata?.requestId).toBeString();
    });
  });

  describe("it should delete data from a table", () => {
    it("response should have HTTP Status = 200", async () => {
      const res = await DeleteChatItem(chat.chatId);
      expect(res.$metadata.httpStatusCode).toBe(200);
    });

    it("should not contain any elements", async () => {
      await WriteDataOnChatTable(chat.chatId, 'question.id', 'answer.id');
      await DeleteChatItem(chat.chatId);
      const amount = (await ScanChatsTable()).Count;
      expect(amount).toBe(0);
    })
  })
});
