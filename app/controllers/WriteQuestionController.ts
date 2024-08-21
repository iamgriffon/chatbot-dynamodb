import type { SubmitQuestionBody } from "../../types";
import { AIPrompt } from "../ai";
import { Answer, Chat, Question } from "../model";
import { QueryChatById } from "../services/read-data-chat-table";
import { WriteDataOnAnswersTable } from "../services/write-data-answer-table";
import { WriteDataOnChatTable } from "../services/write-data-chat-table";
import { WriteDataOnQuestionsTable } from "../services/write-data-question-table";

export const WriteQuestionResponse = async ({
  question,
  email,
}: SubmitQuestionBody) => {
  const AIResponse = await AIPrompt(question);
  const QuestionModel = new Question(email, question);

  const WriteQuestionResponse = await WriteDataOnQuestionsTable(QuestionModel);

  if (WriteQuestionResponse.$metadata.httpStatusCode === 200) {
    const AnswerModel = new Answer(AIResponse);
    const WriteAnswerResponse = await WriteDataOnAnswersTable(AnswerModel);

    if (WriteAnswerResponse.$metadata.httpStatusCode === 200) {
      const ChatModel = new Chat(QuestionModel.id, AnswerModel.id);
      const log = await WriteDataOnChatTable(
        ChatModel.chatId,
        QuestionModel.id,
        AnswerModel.id
      )
        .then(async () => (await QueryChatById(ChatModel.chatId))?.Items)
      return {
        question: question,
        response: AIResponse,
        updatedAt: AnswerModel.createdAt.S,
        log: log,
      };
    }
  }
};
