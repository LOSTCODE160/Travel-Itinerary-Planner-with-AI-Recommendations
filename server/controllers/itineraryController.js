import Itinerary from '../models/Itinerary.js';
import { generateItineraryPlan } from '../services/geminiService.js';

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

        // Call Gemini Service
        // The service returns the JSON array of daily objects
        const dailyPlan = await generateItineraryPlan(destination, startDate, endDate, preferences || []);

        const itinerary = await Itinerary.create({
            userId,
            destination,
            startDate,
            endDate,
            dailyPlan: dailyPlan, // generated array
        });

        res.status(201).json(itinerary);
    } catch (error) {
        console.error("Generate Itinerary Error:", error);
        res.status(500).json({ message: error.message || 'Failed to generate itinerary' });
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
