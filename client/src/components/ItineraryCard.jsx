import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sun, CloudSun, Moon, Star } from 'lucide-react';

const ItineraryCard = ({ dayData, index }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const getTimeIcon = (timeString) => {
        const t = timeString.toLowerCase();
        if (t.includes('morning')) return <Sun size={18} className="text-amber-400" color="#fbbf24" />;
        if (t.includes('afternoon')) return <CloudSun size={18} className="text-orange-400" color="#fb923c" />;
        if (t.includes('evening') || t.includes('night')) return <Moon size={18} className="text-indigo-400" color="#818cf8" />;
        return <Star size={18} className="text-gray-400" color="#9ca3af" />;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="day-card"
        >
            <div
                className="day-header"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.1)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: 'var(--text-muted)'
                    }}>
                        DAY {dayData.day}
                    </div>
                    <span className="text-muted text-sm font-medium">{dayData.date}</span>
                </div>
                <div
                    className="text-muted"
                    style={{
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s'
                    }}
                >
                    <ChevronDown size={20} />
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div className="day-content">
                            {dayData.activities.map((activity, actIndex) => (
                                <div key={actIndex} className="activity-item">
                                    <div className="activity-time" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                        {getTimeIcon(activity.time || '')}
                                        <span>{activity.time}</span>
                                    </div>
                                    <div className="activity-desc">
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
