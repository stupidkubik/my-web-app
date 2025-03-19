import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

export async function runGeminiApi(prompt: string): Promise<string> {
    const apiKey: string | undefined = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
        const errorMsg = "Missing GOOGLE_API_KEY environment variable.";
        console.error(errorMsg);
        throw new Error(errorMsg);
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Error running Gemini API:", error);
        throw error instanceof Error ? error : new Error(String(error));
    }
}