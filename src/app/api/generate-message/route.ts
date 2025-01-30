import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const genkey = process.env.GEMINI_API_KEY;
    if (!genkey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }
    // Access your API key by creating an instance of GoogleGenerativeAI
    const genAI = new GoogleGenerativeAI(genkey);

    // Initialize a generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Retrieve the data from the request body
    const { partnerName, messageType } = await req.json();

    // Validate required fields
    if (!partnerName || !messageType) {
      return NextResponse.json(
        { error: "Partner name and message type are required" },
        { status: 400 }
      );
    }

    // Define the prompt
    const prompt = `Generate a ${messageType} Valentine's Day message or date invitation for ${partnerName}. 
    If it's romantic, make it sweet and heartfelt but not overly dramatic. 
    If it's funny, make it clever and light-hearted but still affectionate. 
    Keep it under 100 words and make it personal.`;

    // Pass the prompt to the model and retrieve the output
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = await response.text();

    // Return the generated message as a JSON response
    return NextResponse.json({ message: output });
  } catch (error) {
    console.error("Error generating message:", error);
    return NextResponse.json(
      { error: "Failed to generate message" },
      { status: 500 }
    );
  }
}

