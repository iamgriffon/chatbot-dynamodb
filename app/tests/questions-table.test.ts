import { describe, it, expect } from "bun:test";
import { SeedQuestionsTable } from "@/services/create-question-table";
import { beforeEach } from "bun:test";
import { DeleteQuestionsTable } from "../services/delete-question-table";
import { type CreateTableCommandOutput } from "@aws-sdk/client-dynamodb";
import { Question } from "../model/question";
import { WriteDataOnQuestionsTable } from "../services/write-data-question-table";
import { QueryQuestionsById } from "../services/read-data-question-table";
import { DeleteQuestionItem } from "../services/delete-data-question-table";
import { ScanQuestionsTable } from "../services/read-question-table";

const tableName = 'Questions'

describe("Questions Table", async () => {
  beforeEach(async () => {
    try {
      await DeleteQuestionsTable();
    } catch {
      return
    }
  });


  describe("it should create a table", async () => {
    let res: CreateTableCommandOutput;
    beforeEach(async () => {
      return res = await SeedQuestionsTable();
    });

    it("response should have HTTP Status = 200", async () => {
      expect(res.$metadata?.httpStatusCode).toBe(200);
    })
    it("response should have TableStatus = ACTIVE", async () => {
      expect(res.TableDescription?.TableStatus).toBe("ACTIVE");
    })
    it("Table name should be 'Questions'", async () => {
      expect(res.TableDescription?.TableName).toBe(tableName)
    })
  });

  describe("it should read a table", async () => {
    let res: CreateTableCommandOutput;
    beforeEach(async () => {
      return res = await SeedQuestionsTable();
    });

    it("response should have HTTP Status = 200", async () => {
      expect(res.$metadata?.httpStatusCode).toBe(200);
    })
  })

  describe("it should write data into a table", async () => {
    beforeEach(async () => {
      await SeedQuestionsTable();
    });

    const data = new Question("test@test.com", "Quanto foi o jogo do Palmeiras?")
    const res = await WriteDataOnQuestionsTable(data);

    it("response should have HTTP Status = 200", async () => {
      expect(res.$metadata?.httpStatusCode).toBe(200);
    })
    it("response requestId must be a string", async () => {
      expect(res.$metadata?.requestId).toBeString();
    });

    it("should have one element", async () => {
      await WriteDataOnQuestionsTable(data);
      const amount = (await ScanQuestionsTable()).Count
      expect(amount).toBe(1)
    })
  })

  describe("it should read data from a table", async () => {
    const question = new Question("test@email.com", "Quanto é a raiz quadrada de 5721?")
    beforeEach(async () => {
      await SeedQuestionsTable();

    });
    await WriteDataOnQuestionsTable(question);

    it("response should have HTTP Status = 200", async () => {
      const res = await QueryQuestionsById(question.id);
      expect(res.$metadata.httpStatusCode).toBe(200);
    })

    it("response requestId must be a string", async () => {
      const res = await QueryQuestionsById(question.id);
      expect(res.$metadata?.requestId).toBeString();
    })
  });

  describe("It should delete data from a table", async () => {
    const question = new Question("test@email.com", "How much is the square root of 5721?")
    beforeEach(async () => {
      await SeedQuestionsTable();
    });

    await WriteDataOnQuestionsTable(question);
    const res = await DeleteQuestionItem(question.id);

    it("response should have HTTP Status = 200", async () => {
      expect(res.$metadata.httpStatusCode).toBe(200)
    })

    it("should not contain any elements", async () => {
      await WriteDataOnQuestionsTable(question);
      await DeleteQuestionItem(question.id);
      const amount = (await ScanQuestionsTable()).Count;
      expect(amount).toBe(0)
    })
  })
})