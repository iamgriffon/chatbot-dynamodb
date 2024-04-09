import { describe, expect, it, beforeEach, afterAll } from "bun:test";
import { DeleteAnswersTable } from "../services/delete-answer-table";
import type { CreateTableCommandOutput } from "@aws-sdk/client-dynamodb";
import { SeedAnswersTable } from "../services/create-answer-table";
import { Answer } from "../model/answer";
import { WriteDataOnAnswersTable } from "../services/write-data-answer-table";
import { QueryAnswersById } from "../services/read-data-answer-table";
import { DeleteAnswerItem } from "../services/delete-data-answer-table";
import { ScanAnswersTable } from "../services/read-answer-table";

const tableName = "Answers"

describe("Answers Table" , async () => {
  beforeEach(async () => {
    try {
     await DeleteAnswersTable();
    } catch {
      return
    }
  });
  
  describe("it should create a table", async () => {
    let res: CreateTableCommandOutput;
    beforeEach(async () => {
     return res = await SeedAnswersTable();
    });

    it("response should have HTTP Status = 200", async () => {
      expect(res.$metadata?.httpStatusCode).toBe(200);
    })
    it("response should have TableStatus = ACTIVE", async () => {
      expect(res.TableDescription?.TableStatus).toBe("ACTIVE");
    })
    it("Table name should be 'Answers'", async () => {
      expect(res.TableDescription?.TableName).toBe(tableName)
    })
  });

  describe("it should read a table", async () => {
    let res: CreateTableCommandOutput;
    beforeEach(async () => {
      await SeedAnswersTable();
    });

    res = await ScanAnswersTable();
    it("response should have HTTP Status = 200", async () => {
      expect(res.$metadata?.httpStatusCode).toBe(200);
    })
  });

  describe("it should write data into a table", async() => {
    let res: CreateTableCommandOutput;
    beforeEach(async () => {
     await SeedAnswersTable();
    });

    const data = new Answer('2');  
    res = await WriteDataOnAnswersTable(data);

    it("response should have HTTP Status = 200", async() => {
      expect(res.$metadata?.httpStatusCode).toBe(200);
    })
    it("response requestId must be a string", async() => {
      expect(res.$metadata?.requestId).toBeString();
    })

    it("response must be equal two", async() => {
      expect(data.answer.S).toBe('2')
    });

    it("should have one element", async() => {
      await WriteDataOnAnswersTable(data);;
      const amount = (await ScanAnswersTable()).Count
      expect(amount).toBe(1)
    })
  })

  describe("it should read data from a table", async () => {
    const answer = new Answer('2');
    const res = await QueryAnswersById(answer.id);
    beforeEach(async () => {
      await SeedAnswersTable();
     });
 
     it("response should have HTTP Status = 200", async () => {
      expect(res.$metadata.httpStatusCode).toBe(200);
     })

     it("response requestId must be a string", async() => {
      expect(res.$metadata?.requestId).toBeString();
    });
  });

  describe("it should delete data from a table", async () => {
    const answer = new Answer('2');
    beforeEach(async () => {
      await SeedAnswersTable();
      await WriteDataOnAnswersTable(answer);
     });
    const res = await DeleteAnswerItem(answer.id);

    it("response should have HTTP Status = 200", async () => {
     expect(res.$metadata.httpStatusCode).toBe(200)
    })

    it("should not contain any elements", async() => {
      await DeleteAnswerItem(answer.id);
      const amount = (await ScanAnswersTable()).Count
      expect(amount).toBe(0)
    })
  })
})