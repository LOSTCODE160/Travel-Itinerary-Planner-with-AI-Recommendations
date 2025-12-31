import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ItineraryCard = ({ dayData, index }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:shadow-lg transition-shadow duration-300"
            style={{ maxWidth: '100%', marginBottom: '1rem', padding: '1.5rem' }}
        >
            <div
                className="flex justify-between items-center cursor-pointer select-none"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-baseline gap-3">
                    <h3 className="text-lg font-semibold text-white">Day {dayData.day}</h3>
                    <span className="text-muted text-sm font-medium">{dayData.date}</span>
                </div>
                <div className={`text-muted transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                    ▼
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-6 space-y-4">
                            {dayData.activities.map((activity, actIndex) => (
                                <div key={actIndex} className="flex gap-4 items-start group">
                                    <div className="w-24 flex-shrink-0 text-xs font-semibold text-muted uppercase mt-1 tracking-wide">
                                        {activity.time}
                                    </div>
                                    <div className="text-gray-300 text-sm leading-relaxed border-l border-border-color pl-4 group-hover:border-white transition-colors">
                                        {activity.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ItineraryCard;
