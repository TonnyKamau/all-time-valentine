"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateAcceptanceMessage(
  partnerName: string
): Promise<string> {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Missing API key");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate a sweet and romantic acceptance message for ${partnerName} 
    after they've agreed to be my Valentine. The message should express excitement 
    and anticipation for spending Valentine's Day together. Keep it personal, 
    heartfelt, and no longer than 20 words. Format as a simple string without quotes.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    
    return text.trim();
  } catch (error) {
    console.error("Error generating acceptance message:", error);
    return `I can't wait to spend Valentine's Day with you, ${partnerName}!`;
  }
}