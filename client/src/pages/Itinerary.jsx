import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ItineraryCard from '../components/ItineraryCard';
import AnimatedButton from '../components/AnimatedButton';

const Itinerary = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { itinerary } = location.state || {}; // Protect against direct access

    useEffect(() => {
        if (!itinerary) {
            navigate('/');
        }
    }, [itinerary, navigate]);

    if (!itinerary) return null;

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8 relative">
            {/* Ambient Background */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
            >
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <motion.h2
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="text-gray-400 text-sm uppercase tracking-widest font-bold mb-1"
                        >
                            Your Trip To
                        </motion.h2>
                        <motion.h1
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-5xl md:text-7xl font-extrabold gradient-text"
                        >
                            {itinerary.destination}
                        </motion.h1>
                    </div>
                    <AnimatedButton onClick={() => navigate('/')}>
                        Plan Another Trip ✈️
                    </AnimatedButton>
                </div>

                {/* Timeline Stats */}
                <motion.div
                    className="flex gap-4 mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="glass-card px-6 py-2">
                        <span className="text-gray-400 text-xs uppercase">From</span>
                        <p className="font-bold text-white">{new Date(itinerary.startDate).toLocaleDateString()}</p>
                    </div>
                    <div className="glass-card px-6 py-2">
                        <span className="text-gray-400 text-xs uppercase">To</span>
                        <p className="font-bold text-white">{new Date(itinerary.endDate).toLocaleDateString()}</p>
                    </div>
                </motion.div>

                {/* Daily Cards */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-4"
                >
                    {itinerary.dailyPlan?.map((day, index) => (
                        <ItineraryCard key={index} dayData={day} index={index} />
                    ))}
                </motion.div>

                <div className="h-20"></div> {/* Spacer for bottom scroll */}
            </motion.div>
        </div>
    );
};

export default Itinerary;
