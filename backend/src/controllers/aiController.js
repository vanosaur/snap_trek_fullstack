import Groq from "groq-sdk";
import prisma from "../lib/prisma.js";
import { fixBigInt } from "../utils/serialization.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Generate a travel itinerary based on a location and optional theme.
 */
export const generateItinerary = async (req, res) => {
  const { location, theme } = req.body;

  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }

  try {
    const prompt = `
      You are a professional travel planner for SnapTrek. 
      Generate a detailed 5-day travel itinerary for the following location: ${location}.
      Theme: ${theme || "General Exploration"}.

      Return ONLY a JSON object with the following structure:
      {
        "title": "Catchy title for the trip",
        "price": Estimated total price in INR (integer),
        "duration": "5 Days",
        "highlights": ["highlight 1", "highlight 2", "highlight 3"],
        "itinerary_days": [
          {
            "day": 1,
            "title": "Title for day 1",
            "activities": ["activity 1", "activity 2", "activity 3"]
          },
          ... (for all 5 days)
        ],
        "stay": {
          "type": "Hotel/Hostel/Resort",
          "description": "Short description of the type of accommodation recommended"
        }
      }

      Important: 
      - Do not include any text before or after the JSON.
      - Ensure the price is a realistic estimate for 5 days in INR.
      - Make the activities specific and engaging.
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a travel expert that only outputs JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const responseContent = chatCompletion.choices[0]?.message?.content;
    const itinerary = JSON.parse(responseContent);

    res.json(itinerary);
  } catch (err) {
    console.error("AI Generation Error:", err);
    res.status(500).json({ error: "Failed to generate itinerary with AI", details: err.message });
  }
};

/**
 * AI Magic Search: Translates natural language into database filters
 */
export const aiSearch = async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    // 1. Ask AI to extract filters from the query
    const extractionPrompt = `
      You are a search assistant for SnapTrek. 
      Analyze this user query: "${query}"
      
      Extract the following filters in JSON format:
      {
        "place": "A string representing the destination or atmosphere (e.g., 'beach', 'mountains', 'Bali')",
        "maxPrice": An integer representing the maximum price mentioned (null if not mentioned),
        "reasoning": "A short explanation of why you chose these filters"
      }
      
      Rules:
      - If they mention "budget", "under", "less than", extract the number into maxPrice.
      - Return ONLY the JSON object.
    `;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: extractionPrompt }],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    let filters;
    try {
      const content = completion.choices[0].message.content;
      if (!content) throw new Error("AI returned empty response");
      filters = JSON.parse(content);
    } catch (parseErr) {
      console.error("❌ AI Response Parsing Failed:", parseErr);
      // Fallback to basic search if AI fails
      filters = { place: query, maxPrice: null, reasoning: "Falling back to basic search due to AI parsing error." };
    }
    console.log("AI Extracted Filters:", filters);

    // 2. Query Database with extracted filters
    const whereClause = {};
    if (filters.place) {
      whereClause.OR = [
        { place: { contains: filters.place, mode: 'insensitive' } },
        { title: { contains: filters.place, mode: 'insensitive' } }
      ];
    }
    if (filters.maxPrice) {
      whereClause.price = { lte: filters.maxPrice };
    }

    const reels = await prisma.reel.findMany({
      where: whereClause,
      take: 10,
      include: {
        author: {
          select: { id: true, name: true, avatar: true, username: true }
        },
        _count: { select: { likes: true } }
      }
    });

    res.json({
      reels: fixBigInt(reels),
      filters, 
    });
  } catch (err) {
    console.error("❌ AI Search Error Detailed:", err);
    res.status(500).json({ 
      error: "AI search failed", 
      details: err.message 
    });
  }
};
