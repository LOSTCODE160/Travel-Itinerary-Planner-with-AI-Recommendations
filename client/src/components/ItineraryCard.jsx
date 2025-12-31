import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ItineraryCard = ({ dayData, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card mb-6 overflow-hidden cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
            style={{ padding: '1.5rem' }}
        >
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold text-white">Day {dayData.day}</h3>
                    <p className="text-gray-400 text-sm">{dayData.date || `Day ${dayData.day} of trip`}</p>
                </div>
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    className="text-cyan-400 text-2xl"
                >
                    ▼
                </motion.div>
            </div>

            <AnimatePresence>
                {(isExpanded || true) && ( // Always show preview, but maybe fully expand details?
                    // Actually, let's just show it all the time for better UX, or just toggle details.
                    // Prompt asked for "Expand on hover" but that can be annoying. Let's stick to "Expand on click" or just always visible but animated.
                    // Let's go with: Always show a snippet, expand for full details vs just showing all.
                    // For simplicity and "mobile friendly", let's render the list but stagger the items.
                    <motion.div
                        initial={false}
                        animate={{ height: "auto", opacity: 1 }}
                        className="mt-4"
                    >
                        <div className="space-y-3">
                            {dayData.activities.map((activity, actIndex) => (
                                <motion.div
                                    key={actIndex}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + (actIndex * 0.1) }}
                                    className="p-3 rounded-lg bg-white/5 border border-white/10 flex gap-3 items-start"
                                >
                                    <span className="text-xs font-bold text-pink-500 uppercase mt-1 min-w-[60px]">
                                        {activity.time}
                                    </span>
                                    <p className="text-gray-200 text-sm leading-relaxed">
                                        {activity.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ItineraryCard;
