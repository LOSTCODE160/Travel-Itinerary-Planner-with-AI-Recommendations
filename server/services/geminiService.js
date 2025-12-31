import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : "";

// Initialize Gemini SDK once (Global scope)
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const generateItineraryPlan = async (destination, startDate, endDate, preferences) => {
  try {
    if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
      throw new Error("Invalid or missing GEMINI_API_KEY in .env");
    }

    const prompt = `
      Create a detailed daily travel itinerary for a trip to ${destination}.
      Dates: ${startDate} to ${endDate}.
      Preferences: ${preferences.join(", ")}.

      OUTPUT FORMAT:
      Provide the response ONLY as a valid JSON array of objects. 
      Do NOT wrap in markdown code blocks like \`\`\`json. 
      Do NOT include any text before or after the JSON.
      
      Schema for each day object:
      {
        "day": 1,
        "date": "YYYY-MM-DD",
        "activities": [
          {
            "time": "morning/afternoon/evening",
            "description": "Activity description"
          }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Cleanup potential markdown formatting
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw new Error("Failed to generate itinerary with AI");
  }
};

export { generateItineraryPlan };
