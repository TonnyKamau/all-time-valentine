"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateInvitationStages(
  partnerName: string
): Promise<string[]> {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Missing API key");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate 10 unique and creative stages for a Valentine's Day invitation for ${partnerName}. 
    Each stage should be a question or statement that makes it increasingly hard for ${partnerName} to say no to being your Valentine. 
    The stages should progress from a simple invitation to more persuasive and playful requests. 
    Make them romantic, funny, or clever, and make sure there necessary emojis but keep each stage short (no more than 10 words).
    Format the output as a JSON array of strings.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    const cleanedText = text.trim().replace(/^```json\s*|\s*```$/g, "");

    console.log("Cleaned Generated text:", cleanedText); // Log cleaned text

    let stages: string[];
    try {
      stages = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      throw new Error("Invalid response format");
    }

    if (!Array.isArray(stages) || stages.length !== 10) {
      console.error("Invalid stages array:", stages);
      throw new Error("Invalid stages generated");
    }

    return stages;
  } catch (error) {
    console.error("Error generating invitation stages:", error);
    return [
      "Will you be my Valentine?",
      "Are you sure you don't want to be my Valentine?",
      "Think again! It'll be fun!",
      "I promise a magical evening!",
      "Last chance! Say yes?",
    ];
  }
}
