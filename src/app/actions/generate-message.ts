"use server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { nanoid } from "nanoid"
import type { MessageType, PartnerInfo } from "@/types/message"

// Define emoji sets by message type
const EMOJI_SETS = {
  romantic: ["❤️", "💖", "💝", "💕", "💗", "💓", "💞", "💘", "💟", "💑", "💏", "💋", "🌹", "🥰", "😘"],
  funny: ["😂", "🤣", "😅", "😆", "😋", "🤪", "😜", "🤡", "🎭", "🎪", "🎈", "🎉", "🎊", "🎯", "🎪"],
  poetic: ["🌹", "🌸", "✨", "🌟", "💫", "🌙", "⭐", "🌺", "🎭", "📝", "🎨", "🎬", "🎼", "🎵", "🎶"],
  sarcastic: ["😏", "😌", "🙄", "😅", "😬", "🤔", "🤨", "😎", "🤓", "🧐", "💅", "🤷", "🙃", "😉", "😊"],
  nostalgic: ["🕰️", "📷", "💝", "💫", "🌟", "🎞️", "📸", "💌", "🎀", "🎭", "🎪", "🎡", "🎠", "🎬", "📽️"]
} as const;

// Function to get random emojis from a specific set
function getRandomEmojis(type: MessageType, count: number): string[] {
  const emojiSet = EMOJI_SETS[type] || EMOJI_SETS.romantic;
  const result: string[] = [];
  const emojis = [...emojiSet]; // Create a copy to avoid modifying original array
  
  for (let i = 0; i < count; i++) {
    if (emojis.length === 0) break;
    const randomIndex = Math.floor(Math.random() * emojis.length);
    result.push(emojis[randomIndex]);
    emojis.splice(randomIndex, 1); // Remove used emoji to avoid duplicates
  }
  
  return result;
}

// Function to insert emojis into text at reasonable positions
function insertEmojis(text: string, type: MessageType): string {
  // Get random emojis for different positions
  const [startEmoji1, startEmoji2] = getRandomEmojis(type, 2);
  const [endEmoji1, endEmoji2] = getRandomEmojis(type, 2);
  
  // Split text into sentences
  const sentences = text.split(/(?<=[.!?])\s+/);
  
  // Add emojis at start and end
  const enhancedText = `${startEmoji1} ${startEmoji2} ${sentences.join(" ")} ${endEmoji1} ${endEmoji2}`;
  
  return enhancedText.trim();
}

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
Keep it under 150 words and make it personal.
Do not include any emojis in your response as they will be added separately.`

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

    // Add emojis to the generated text
    const messageWithEmojis = insertEmojis(text, type);
    
    const messageId = nanoid()
    return {
      id: messageId,
      message: messageWithEmojis,
      type,
      partnerInfo,
      createdAt: new Date(),
    }
  } catch (error) {
    console.error("Error generating message:", error)
    throw new Error(`Failed to generate message: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}