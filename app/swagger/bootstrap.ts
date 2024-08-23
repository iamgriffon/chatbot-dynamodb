import swaggerJSDoc from "swagger-jsdoc";

export const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "DynamoDB Chatbot",
      version: "1.0.0",
      description: "API de chatbot",
    },
  },
  apis: ["../routes/questions.ts", "../routes/answers.ts", "../server.ts"],
};
