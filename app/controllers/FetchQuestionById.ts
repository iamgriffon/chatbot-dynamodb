import type { QueryResponse } from "../../types";
import type { Answer, Question } from "../model";
import { QueryAnswersById } from "../services/read-data-answer-table";
import { QueryChatById } from "../services/read-data-chat-table";
import { QueryQuestionsById } from "../services/read-data-question-table";

export const FetchQuestionByIdController = async (
  id: string
) => {

  const ChatInfo = (await QueryChatById(id).then(
    (data) => data?.Items
  )) as QueryResponse;

  if (!ChatInfo) return { error: "Not found" };
  if (id === "questions") return;

  const answerId = ChatInfo[0]?.chat[0]?.answerId!;
  const questionId = ChatInfo[0]?.chat[0]?.questionId!;

  try {
    const question = (await QueryQuestionsById(questionId))
      ?.Items! as Question[];
    const answer = (await QueryAnswersById(answerId))?.Items! as Answer[];
    const response = {
      chatId: id,
      question: question[0]?.question.S,
      email: question[0]?.email,
      answer: answer[0]?.answer.S,
      createdAt: answer[0]?.createdAt.S,
    };
    return response;
  } catch {
    throw new Error();
  }
};
