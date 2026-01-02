import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, User, Compass, Heart } from 'lucide-react';
import AnimatedInput from '../components/AnimatedInput';
import AnimatedButton from '../components/AnimatedButton';
import Loading from '../components/Loading';
import { generateItinerary } from '../services/itineraryService';
import logo from '../assets/logo.png';

const Home = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        userId: '659000000000000000000001',
        destination: '',
        startDate: '',
        endDate: '',
        preferences: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const preferencesArray = formData.preferences.split(',').map(p => p.trim()).filter(p => p);

            const payload = {
                ...formData,
                preferences: preferencesArray
            };

            const data = await generateItinerary(payload);
            navigate('/itinerary', { state: { itinerary: data } });

        } catch (err) {
            console.warn("Generation failed:", err);
            const msg = err.response?.data?.message || 'The AI service is currently busy or unavailable. Please try again in a few moments.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-center">

            <motion.div
                className="card animate-fade-in"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-8 text-center flex flex-col items-center">
                    <img src={logo} alt="TravelPlanner Logo" style={{ width: '80px', height: '80px', marginBottom: '1.5rem', borderRadius: '16px', boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)' }} />
                    <h1 className="heading-primary">Generate your perfect trip in seconds</h1>
                    <p className="text-muted text-sm">Enter your details below to get started</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && (
                        <div className="error-box">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="loading-container">
                            <Loading text="AI is creating your itinerary..." />
                        </div>
                    ) : (
                        <>
                            <div style={{ marginBottom: '1rem' }}>
                                <AnimatedInput
                                    label="User ID"
                                    name="userId"
                                    value={formData.userId}
                                    onChange={handleChange}
                                    placeholder="e.g. user-123"
                                    required
                                    icon={<User size={18} />}
                                />
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <AnimatedInput
                                    label="Where are you going?"
                                    name="destination"
                                    value={formData.destination}
                                    onChange={handleChange}
                                    placeholder="e.g. Kyoto, Japan"
                                    required
                                    icon={<MapPin size={18} />}
                                />
                            </div>

                            <div className="form-row">
                                <AnimatedInput
                                    label="Start Date"
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                    icon={<Calendar size={18} />}
                                />
                                <AnimatedInput
                                    label="End Date"
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    required
                                    icon={<Calendar size={18} />}
                                />
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <AnimatedInput
                                    label="Preferences (Optional)"
                                    name="preferences"
                                    value={formData.preferences}
                                    onChange={handleChange}
                                    placeholder="Nature, Food, History..."
                                    icon={<Heart size={18} />}
                                />
                            </div>

                            <div style={{ marginTop: '2rem' }}>
                                <AnimatedButton type="submit" disabled={loading}>
                                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                        <Compass size={20} />
                                        Generate Itinerary
                                    </span>
                                </AnimatedButton>
                            </div>
                        </>
                    )}
                </form>
            </motion.div>
        </div>
    );
};

export default Home;
