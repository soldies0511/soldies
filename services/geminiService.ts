import { GoogleGenAI } from "@google/genai";
import { MENU_ITEMS } from "../constants";

// Initialize the Gemini API client
// We assume process.env.API_KEY is available as per instructions
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getGeminiRecommendation = async (userQuery: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "I'm sorry, but my brain (API Key) seems to be missing. Please check the configuration.";
  }

  const menuContext = MENU_ITEMS.map(item => 
    `${item.name} (${item.category}): $${item.price}. Description: ${item.description}. Keywords: ${item.flavorProfile?.map(f => f.attribute).join(', ')}`
  ).join('\n');

  const systemInstruction = `
    You are "SipBot", a friendly and knowledgeable barista assistant for a trendy cafe called "Sip & Savor".
    
    Here is our menu:
    ${menuContext}
    
    Your Goal:
    1. Answer questions about the menu.
    2. Recommend items based on the user's taste (e.g., "something refreshing", "not too sweet", "caffeine kick").
    3. Keep responses concise (under 60 words) and enthusiastic.
    4. If asked about allergens, recommend checking with staff, but provide ingredient info from descriptions.
    5. Use emojis appropriately 🍵🧋🍰.
    
    Do not invent menu items that are not on the list.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userQuery,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I'm not sure what to recommend right now, but the Signature Milk Tea is always a hit!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a little trouble connecting to the spirit world of tea. Please try again in a moment!";
  }
};
