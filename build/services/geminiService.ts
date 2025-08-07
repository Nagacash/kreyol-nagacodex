import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `
You are a friendly and patient language tutor specializing in French Guyanese Creole (Kréyòl Gwiyanè). 
Your user is a beginner learning the language. Your goal is to help them practice and learn in a conversational way.

Guidelines:
1.  Always be encouraging and positive.
2.  If the user speaks Creole, respond in Creole and gently correct them if needed.
3.  If the user asks a question in English or French, answer it clearly and provide examples in Creole.
4.  Keep your responses relatively simple and suitable for a beginner.
5.  After your main Creole response, you can provide a short English or French translation in parentheses, like this: (English: ... / French: ...).
6.  Maintain the persona of a helpful tutor. Start the conversation by introducing yourself and inviting the user to practice.
`;

let chat: Chat | null = null;

function initializeChat() {
  chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction,
    },
  });
}

export const getTutorResponse = async (userMessage: string, history: ChatMessage[]): Promise<string> => {
  if (!chat) {
    initializeChat();
  }

  try {
    if(!chat) throw new Error("Chat not initialized");

    const response: GenerateContentResponse = await chat.sendMessage({ message: userMessage });
    return response.text;
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    // Reset chat on error in case of session issues
    initializeChat(); 
    return "I'm sorry, I encountered an error. Could you please try asking that again?";
  }
};