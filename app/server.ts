import express, { type Request, type Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ScanChatsTable } from "./services/read-chat-table";
import { DeleteChatItem } from "./services/delete-data-chat-table";
import questionRoutes from "./routes/questions";
import { ScanQuestionsTable } from "./services/read-question-table";
import answerRoutes from "./routes/answers";
import { WriteQuestionResponse } from "./controllers/WriteQuestionController.ts";
import swaggerUi from "swagger-ui-express"
import { FetchQuestionByIdController } from "./controllers/FetchQuestionById.ts";

export interface Body {
  id?: string;
  question: string;
  email: string;
}

export const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(require("./swagger.json")));

app.post("/", async (req: Request, res: Response) => {
  if (!req.body) return res.send({ error: "Invalid request body" }).status(400);

  const { question, email } = req.body;
  if (!question || !email)
    return res.send({ error: "Invalid request body" }).status(400);
  const AIResponse = await WriteQuestionResponse({ question, email });
  return res.send(AIResponse);
});

app.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const response = FetchQuestionByIdController(id);
    return res.send(response);
  } catch {
    return res.status(404).send({ error: "Not found", status: 404 });
  }
});

app.get("/", async (_, res) => {
  try {
    await ScanChatsTable().then((data) => res.send({ data: data.Items }));
  } catch {
    return res.status(404).send({ error: "Data not found", status: 404 });
  }
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.send({ error: "param is requred" }).status(400);
  try {
    await DeleteChatItem(id as string).then((data) => {
      return res.send({
        message: "Deleted Successfully!",
        status: data.$metadata.httpStatusCode,
      });
    });
  } catch {
    return res.status(404).send({ error: "Not found", status: 404 });
  }
});

app.get("/questions", async (_, res) => {
  try {
    await ScanQuestionsTable().then((data) =>
      res
        .status(data.$metadata.httpStatusCode!)
        .send({ data: data.Items, status: 200 })
    );
  } catch (error) {
    return res.status(500).send({ error: "Internal server error" });
  }
  return;
});

app.get("/answers", async (_, res) => {
  try {
    await ScanQuestionsTable().then((data) =>
      res
        .status(data.$metadata.httpStatusCode!)
        .send({ data: data.Items, status: 200 })
    );
  } catch (error) {
    return res.status(500).send({ error: "Internal server error" });
  }
  return;
});

app.use("/question", questionRoutes);
app.use("/answer", answerRoutes);

app
  .listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  })
  .setTimeout(10000);
