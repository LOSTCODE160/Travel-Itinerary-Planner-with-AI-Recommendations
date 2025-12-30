import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateItinerary = async (destination, startDate, endDate, preferences) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const start = new Date(startDate);
        const end = new Date(endDate);
        const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

        const prompt = `
            Create a day-wise travel itinerary for a trip to ${destination} for ${totalDays} days.
            Preferences: ${preferences || 'None'}.
            
            Strictly return the output in valid JSON format with the following structure:
            {
              "destination": "${destination}",
              "totalDays": ${totalDays},
              "dailyPlan": [
                {
                  "day": 1,
                  "title": "Day Title",
                  "activities": [
                    {
                      "name": "Activity Name",
                      "description": "Short description"
                    }
                  ]
                }
              ]
            }

            Do NOT include any markdown formatting (like \`\`\`json). Return ONLY the raw JSON string.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Cleanup if Gemini wraps in markdown despite instructions
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const itinerary = JSON.parse(text);
        return itinerary;

    } catch (error) {
        console.error('Gemini API Error:', error);
        throw new Error('Failed to generate itinerary. Please try again.');
    }
};
