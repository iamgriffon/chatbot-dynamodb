# chatbot-dynamo

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

Make sure you create a .env file with your [Gemini API Key](https://ai.google.dev/tutorials/setup):

```env
GEMINI_APIKEY=your-key-here
```

This project runs 
- Node.js
- Gemini AI API
- Express.js
- Localstack
- Docker
- Bun (for testing)

- UML Diagram:\
  ![image](https://github.com/iamgriffon/chatbot-dynamodb/assets/55361396/6ab627cf-09a5-4a87-96c6-deca9969168c)


This project is focused oriented on:
- Learning the basics of DynamoDB and AWS Cloud Stack (using locally via LocalStack)
- Mastering Docker & Dockerfile
- Unit testing for every single database CRUD Operation
- Basics of RESTAPI via Express
- Integrating generative AI to simulate a chatbot via Google Gemini
- It was done under 12 hours, so I focused more on AWS SDK rather than on the backend's MVC structure.
