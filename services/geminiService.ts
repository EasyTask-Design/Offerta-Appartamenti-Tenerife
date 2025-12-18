
import { GoogleGenAI, Type } from "@google/genai";

export async function generateNamingIdeas(location: string, style: string) {
  // Use the process.env.API_KEY directly for initialization as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Genera 5 nomi creativi e moderni per due appartamenti turistici situati a ${location}. Lo stile deve essere ${style}. Fornisci una breve spiegazione del significato per ognuno in italiano.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            meaning: { type: Type.STRING }
          },
          required: ["name", "meaning"]
        }
      }
    }
  });

  try {
    // Access text property directly; check for existence before parsing
    const text = response.text;
    if (!text) {
      return [];
    }
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return [];
  }
}
