import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AnimatedInput from '../components/AnimatedInput';
import AnimatedButton from '../components/AnimatedButton';
import Loading from '../components/Loading';

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

            const res = await axios.post('/api/itineraries/generate', payload);
            navigate('/itinerary', { state: { itinerary: res.data } });

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to generate itinerary. Please try again.');
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
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-2">Travel Planner AI</h1>
                    <p className="text-muted text-sm">Generate your perfect trip in seconds</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-md text-sm mb-6">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="py-12 flex flex-col items-center justify-center text-center">
                            <Loading text="Designing your trip..." />
                        </div>
                    ) : (
                        <>
                            <AnimatedInput
                                label="Where are you going?"
                                name="destination"
                                value={formData.destination}
                                onChange={handleChange}
                                placeholder="e.g. Kyoto, Japan"
                                required
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <AnimatedInput
                                    label="Start Date"
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                />
                                <AnimatedInput
                                    label="End Date"
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <AnimatedInput
                                label="Preferences (Optional)"
                                name="preferences"
                                value={formData.preferences}
                                onChange={handleChange}
                                placeholder="Nature, Food, History..."
                            />

                            <div className="mt-6">
                                <AnimatedButton type="submit">
                                    Generate Itinerary
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
