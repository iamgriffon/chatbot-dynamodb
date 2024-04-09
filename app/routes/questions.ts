import express from 'express';
import { QueryQuestionsById } from '../services/read-data-question-table';
import { DeleteQuestionItem } from '../services/delete-data-question-table';

// Create a router object
const questionRoutes = express.Router();

questionRoutes.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return;
  try {
    const ChatInfo = await QueryQuestionsById(id).then(data => data?.Items);
    res.status(200).send({ data: ChatInfo });
  } catch {
    res.status(404).send({ error: 'Not found', status: 404 })
  }
});

questionRoutes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await DeleteQuestionItem(id).then(data => res.status(data.$metadata.httpStatusCode!).send({ message: "deleted successfully" }))
  } catch {
    res.status(500).send({ error: "Internal server error" });
  }
})

export default questionRoutes
