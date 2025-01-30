"use server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { nanoid } from "nanoid"
import type { MessageType, PartnerInfo } from "@/types/message"

export async function generateValentineMessage(type: MessageType, partnerInfo: PartnerInfo) {
  try {
    const prompt = `Generate a ${type} Valentine's Day message for ${
      partnerInfo.name
    }. Consider the following about them:
- Nicknames you use for them: ${partnerInfo.nicknames.join(", ")}
- They like: ${partnerInfo.likes.join(", ")}
- Best moments together: ${partnerInfo.bestMoments.join(", ")}
- Challenges we've overcome: ${partnerInfo.challenges.join(", ")}
- Their personality traits: ${partnerInfo.personality.join(", ")}

Create a personalized message that references these specific details in a ${type} tone.
If it's romantic, make it heartfelt and use one of the nicknames.
If it's funny, use their likes and personality for humor, and maybe playfully use a nickname.
If it's poetic, create metaphors from their interests and incorporate a nickname poetically.
If it's sarcastic, playfully tease about the challenges we've overcome, using a nickname ironically.
If it's nostalgic, focus on the best moments we've shared and how you've always loved calling them by their nickname.
Keep it under 150 words and make it personal.`

    // Initialize the Google Generative AI client
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error("Missing API key")
    }
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    // Generate content using the Gemini model
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = await response.text()

    if (!text) {
      throw new Error("No text generated")
    }

    const messageId = nanoid()

    return {
      id: messageId,
      message: text,
      type,
      partnerInfo,
      createdAt: new Date(),
    }
  } catch (error) {
    console.error("Error generating message:", error)
    throw new Error(`Failed to generate message: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

