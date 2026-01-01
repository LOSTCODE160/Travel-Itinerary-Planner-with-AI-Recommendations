import axios from 'axios';

export const generateItinerary = async (payload) => {
    const response = await axios.post('/api/itineraries/generate', payload);
    return response.data;
};
