import { type Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "DynamoDB Chatbot",
      version: "1.0.0",
      description: "API de chatbot",
    },
  },
  apis: ["./routes/questions.ts", "./routes/answers.ts", "./server.ts"],
};


export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));
}
