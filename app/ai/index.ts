import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_APIKEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

export async function AIPrompt(prompt: string){
  const result = await model.generateContent(prompt);
  const { response } = result;
  return response.text();
}