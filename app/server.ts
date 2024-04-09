import express, { type Request, type Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { AIPrompt } from '@/ai';

import { Question } from '@/model/question';
import { Answer } from './model/answer';
import { Chat } from '@/model/chat';
import { WriteDataOnAnswersTable } from '@/services/write-data-answer-table';
import { WriteDataOnQuestionsTable } from '@/services/write-data-question-table';
import { WriteDataOnChatTable } from '@/services/write-data-chat-table';
import { QueryChatById } from '@/services/read-data-chat-table';
import { QueryQuestionsById } from './services/read-data-question-table';
import { QueryAnswersById } from './services/read-data-answer-table';
import { ScanChatsTable } from './services/read-chat-table';
import { DeleteChatItem } from './services/delete-data-chat-table';
import { Migrate } from './db/migrate';
import { Purge } from './db/purge';
import questionRoutes from './routes/questions';
import { ScanQuestionsTable } from './services/read-question-table';
import answerRoutes from './routes/answers';

interface Body {
   id?: string;
   question: string;
   email: string;
}

export const app = express()
const port = 3000
app.use(cors())
app.use(bodyParser.json())


app.post('/', async (req: Request, res: Response) => {
   if (!req.body) return res.send({ error: 'Invalid request body' }).status(400);

   const { question, email } = req.body;
   if (!question || !email) return res.send({ error: 'Invalid request body' }).status(400);

   const AIResponse = await AIPrompt(question);
   const QuestionModel = new Question(email, question)

   const WriteQuestionResponse = await WriteDataOnQuestionsTable(QuestionModel);

   if (WriteQuestionResponse.$metadata.httpStatusCode === 200) {
      const AnswerModel = new Answer(AIResponse);
      const WriteAnswerResponse = await WriteDataOnAnswersTable(AnswerModel);

      if (WriteAnswerResponse.$metadata.httpStatusCode === 200) {
         const ChatModel = new Chat(QuestionModel.id, AnswerModel.id);
         const log = await WriteDataOnChatTable(
            ChatModel.chatId,
            QuestionModel.id,
            AnswerModel.id)
            .then(async () => (await QueryChatById(ChatModel.chatId))?.Items)
            .catch(() => res.send({ error: "Not found" }).status(404))
         return res.send(
            {
               "question": question,
               "response": AIResponse,
               "updatedAt": AnswerModel.createdAt.S,
               "log": log
            })
      }
   };

   return;
});

app.get('/:id', async (req: Request, res: Response) => {
   type QueryResponse = [
      {
         chatId: string,
         chat: [
            {
               answerId: string,
               questionId: string
            }
         ]
      }
   ]

   const { id } = req.params;
   if (id === 'questions') return;
   const ChatInfo = await QueryChatById(id).then(data => data?.Items) as QueryResponse;
   if (!ChatInfo) return res.send({ error: "Not found" }).status
   if (ChatInfo) {
      const answerId = ChatInfo[0]?.chat[0]?.answerId!;
      const questionId = ChatInfo[0]?.chat[0]?.questionId!;

      try {
         const question = (await QueryQuestionsById(questionId))?.Items! as Question[];
         const answer = (await QueryAnswersById(answerId))?.Items! as Answer[];
         const response = {
            chatId: id,
            question: question[0]?.question.S,
            email: question[0]?.email,
            answer: answer[0]?.answer.S,
            createdAt: answer[0]?.createdAt.S
         }
        return res.send(response)
      } catch {
         return res.status(404).send({ error: "Not found", status: 404 })
      }
   }
})

app.get('/', async (_, res) => {
   try {
      await ScanChatsTable().then(data => res.send({ data: data.Items }))
   } catch {
      return res.status(404).send({ error: 'Data not found', status: 404 })
   }
})

app.delete('/:id', async (req, res) => {
   const { id } = req.params;
   if (!id) return res.send({ error: 'param is requred' }).status(400);
   try {
      await DeleteChatItem(id as string).then(data => {
         return res.send({ message: 'Deleted Successfully!', status: data.$metadata.httpStatusCode })
      })
   } catch {
      return res.status(404).send({ error: "Not found", status: 404 });
   }
})

app.get('/questions', async (_, res) => {
   try {
      await ScanQuestionsTable().then(data => res.status(data.$metadata.httpStatusCode!).send({ data: data.Items, status: 200 }))
   } catch (error) {
     return res.status(500).send({ error: 'Internal server error' })
   }
   return;
})

app.get('/answers', async (_, res) => {
   try {
      await ScanQuestionsTable().then(data => res.status(data.$metadata.httpStatusCode!).send({ data: data.Items, status: 200 }))
   } catch (error) {
     return res.status(500).send({ error: 'Internal server error' })
   }
   return;
})

app.use('/question', questionRoutes);
app.use('/answer', answerRoutes);


app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})