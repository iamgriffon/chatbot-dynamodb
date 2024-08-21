export type SubmitQuestionBody = {
  id?: string;
  question: string;
  email: string;
}

export type QueryResponse = [
  {
    chatId: string;
    chat: [
      {
        answerId: string;
        questionId: string;
      }
    ];
  }
];
