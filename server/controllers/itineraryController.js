import Itinerary from '../models/Itinerary.js';
import { generateItinerary as generateItineraryService } from '../services/geminiService.js';

// @desc    Create a new itinerary
// @route   POST /api/itineraries
// @access  Public
const createItinerary = async (req, res) => {
    try {
        const { userId, destination, startDate, endDate, dailyPlan } = req.body;

        if (!userId || !destination) {
            return res.status(400).json({ message: 'User ID and destination are required' });
        }

        const itinerary = await Itinerary.create({
            userId,
            destination,
            startDate,
            endDate,
            dailyPlan,
        });

        res.status(201).json(itinerary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Generate AI itinerary
// @route   POST /api/itineraries/generate
// @access  Public
const generateItinerary = async (req, res) => {
    try {
        const { userId, destination, startDate, endDate, preferences } = req.body;

        if (!userId || !destination || !startDate || !endDate) {
            return res.status(400).json({ message: 'User ID, destination, startDate, and endDate are required' });
        }

        const aiData = await generateItineraryService(destination, startDate, endDate, preferences);

        if (!aiData || !aiData.dailyPlan) {
            return res.status(500).json({ message: 'Failed to generate valid itinerary structure from AI' });
        }

        const itinerary = await Itinerary.create({
            userId,
            destination: aiData.destination || destination,
            startDate,
            endDate,
            dailyPlan: aiData.dailyPlan,
        });

        res.status(201).json(itinerary);
    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Get itineraries by user ID
// @route   GET /api/itineraries/:userId
// @access  Public
const getItinerariesByUser = async (req, res) => {
    try {
        const itineraries = await Itinerary.find({ userId: req.params.userId });
        res.json(itineraries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createItinerary, getItinerariesByUser, generateItinerary };
