import express from 'express';
import { createItinerary, getItinerariesByUser } from '../controllers/itineraryController.js';

const router = express.Router();

router.post('/', createItinerary);
router.get('/:userId', getItinerariesByUser);

export default router;
