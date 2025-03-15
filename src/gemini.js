let apiKey = "AIzaSyAhfJ0N8IJZ0jTg7YJr-2wWEjTgjDhGsTA";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
}from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 20,
  maxOutputTokens: 20,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  // console.log(result.response.text())
  return result.response.text();
}

export default run;