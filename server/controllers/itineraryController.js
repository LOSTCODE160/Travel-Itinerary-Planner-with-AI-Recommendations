import Itinerary from '../models/Itinerary.js';

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

export { createItinerary, getItinerariesByUser };
