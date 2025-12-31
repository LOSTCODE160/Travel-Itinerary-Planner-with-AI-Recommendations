import express from 'express';
import { createItinerary, getItinerariesByUser, generateItinerary } from '../controllers/itineraryController.js';

const router = express.Router();

router.post('/', createItinerary);
router.post('/generate', generateItinerary);
router.get('/:userId', getItinerariesByUser);

export default router;
