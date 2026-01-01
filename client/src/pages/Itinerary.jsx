import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Clock } from 'lucide-react';
import ItineraryCard from '../components/ItineraryCard';
import AnimatedButton from '../components/AnimatedButton';
import heroImage from '../assets/hero.png';

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
        <div>
            {/* Hero Section */}
            <div style={{
                position: 'relative',
                height: '40vh',
                overflow: 'hidden',
                borderBottom: '1px solid var(--border-color)'
            }}>
                <img
                    src={heroImage}
                    alt="Destination Hero"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.6
                    }}
                />
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    background: 'linear-gradient(to top, var(--bg-main), transparent)',
                    height: '100%'
                }} />

                <div className="container-page" style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    paddingBottom: '2rem',
                    minHeight: 'auto' // override container-page min-height
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-sm font-semibold uppercase text-muted" style={{ marginBottom: '0.5rem', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <MapPin size={16} /> Trip Plan
                        </h2>
                        <h1 className="heading-primary" style={{ fontSize: '3.5rem', marginBottom: '0.5rem', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                            {itinerary.destination}
                        </h1>
                        <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Calendar size={18} />
                                {new Date(itinerary.startDate).toLocaleDateString()} — {new Date(itinerary.endDate).toLocaleDateString()}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Clock size={18} />
                                {itinerary.dailyPlan?.length} Days
                            </span>
                        </div>
                    </motion.div>
                </div>

                <div style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 10 }}>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            background: 'rgba(0,0,0,0.5)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            backdropFilter: 'blur(10px)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem'
                        }}
                    >
                        <ArrowLeft size={16} /> New Trip
                    </button>
                </div>
            </div>

            <div className="container-page" style={{ paddingTop: '3rem' }}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="itinerary-grid">
                        {itinerary.dailyPlan?.map((day, index) => (
                            <ItineraryCard key={index} dayData={day} index={index} />
                        ))}
                    </div>

                    <div style={{ height: '80px' }}></div>
                </motion.div>
            </div>
        </div>
    );
};

export default Itinerary;
