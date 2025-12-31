import { GoogleGenerativeAI } from "@google/generative-ai";

const generateItineraryPlan = async (destination, startDate, endDate, preferences) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : "";

    // Validation log as requested
    console.log("Gemini Key Loaded:", !!apiKey && apiKey !== "YOUR_API_KEY_HERE");

    if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
      throw new Error("Invalid GEMINI_API_KEY. Please check your .env file.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

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
    if (error.message.includes("400")) {
      console.error("Gemini API Key Error: The provided API key is invalid or expired.");
    } else {
      console.error("Gemini Generation Error:", error);
    }
    throw new Error("Failed to generate itinerary with AI");
  }
};

export { generateItineraryPlan };
