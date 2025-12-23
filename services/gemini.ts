
import { GoogleGenAI, Type } from "@google/genai";
import { CEFRLevel, QuizQuestion } from "../types";

// Fix: Correct initialization using named parameter for apiKey as required
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateQuizQuestions(level: CEFRLevel, count: number = 5): Promise<QuizQuestion[]> {
  const prompt = `Generate ${count} high-quality ESL quiz questions about English prefixes, roots, and suffixes for learners at CEFR level ${level}. 
  Include various formats: 'meaning-match', 'word-building', 'definition-deduction', and 'fill-blank'.
  
  CRITICAL RULE: Each of the ${count} questions MUST focus on a UNIQUE word part. Do not repeat the same prefix, root, or suffix across multiple questions in this specific set.
  
  Ensure the difficulty strictly matches ${level}.
  For 'word-building', the correctAnswer should be a single word formed from parts.
  For 'fill-blank', provide a sentence with a missing word that tests affix knowledge.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              type: { type: Type.STRING, description: "One of: meaning-match, word-building, definition-deduction, fill-blank" },
              prompt: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswer: { type: Type.STRING },
              explanation: { type: Type.STRING }
            },
            required: ['id', 'type', 'prompt', 'options', 'correctAnswer', 'explanation']
          }
        }
      }
    });

    // Fix: Access response.text property directly
    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as QuizQuestion[];
  } catch (error) {
    console.error("Error generating quiz questions:", error);
    return [];
  }
}

export async function generateWordTrivia(wordPart: string): Promise<{ origin: string; trivia: string }> {
  const prompt = `Provide historical origin notes and one interesting trivia fact for the English word part: "${wordPart}". Keep it concise for a tooltip.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            origin: { type: Type.STRING },
            trivia: { type: Type.STRING }
          },
          required: ['origin', 'trivia']
        }
      }
    });
    // Fix: Access response.text property directly
    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text);
  } catch (error) {
    return { origin: "Information unavailable.", trivia: "Check back later!" };
  }
}
