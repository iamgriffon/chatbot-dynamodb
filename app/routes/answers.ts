import express from 'express';
import { QueryQuestionsById } from '../services/read-data-question-table';
import { DeleteQuestionItem } from '../services/delete-data-question-table';
import { ScanQuestionsTable } from '../services/read-question-table';
import { QueryAnswersById } from '../services/read-data-answer-table';
import { DeleteAnswerItem } from '../services/delete-data-answer-table';

// Create a router object
const answerRoutes = express.Router();

answerRoutes.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const ChatInfo = await QueryAnswersById(id).then(data => data?.Items);
    res.status(200).send({ data: ChatInfo });
  } catch {
    res.status(404).send({ error: 'Not found', status: 404 })
  }
});


answerRoutes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await DeleteAnswerItem(id).then(data => res.status(data.$metadata.httpStatusCode!).send({ message: "deleted successfully" }))
  } catch {
    res.status(500).send({ error: "Internal server error" });
  }
})

export default answerRoutes
