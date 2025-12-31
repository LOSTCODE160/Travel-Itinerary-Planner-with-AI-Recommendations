import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ItineraryCard from '../components/ItineraryCard';
import AnimatedButton from '../components/AnimatedButton';

const Itinerary = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { itinerary } = location.state || {};

    useEffect(() => {
        if (!itinerary) {
            navigate('/');
        }
    }, [itinerary, navigate]);

    if (!itinerary) return null;

    return (
        <div className="min-h-screen p-6 md:p-12 max-w-4xl mx-auto">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h2 className="text-sm font-semibold uppercase text-muted tracking-wider mb-1">Trip Plan</h2>
                        <h1 className="text-4xl font-bold">{itinerary.destination}</h1>
                        <p className="text-muted mt-2">
                            {new Date(itinerary.startDate).toLocaleDateString()} — {new Date(itinerary.endDate).toLocaleDateString()}
                        </p>
                    </div>
                    <div>
                        <AnimatedButton onClick={() => navigate('/')}>
                            New Trip
                        </AnimatedButton>
                    </div>
                </div>

                <div className="space-y-6">
                    {itinerary.dailyPlan?.map((day, index) => (
                        <ItineraryCard key={index} dayData={day} index={index} />
                    ))}
                </div>

                <div className="h-20"></div>
            </motion.div>
        </div>
    );
};

export default Itinerary;
