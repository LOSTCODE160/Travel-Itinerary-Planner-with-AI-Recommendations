import mongoose from 'mongoose';

const itinerarySchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        destination: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        dailyPlan: {
            type: [Object],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

export default Itinerary;
