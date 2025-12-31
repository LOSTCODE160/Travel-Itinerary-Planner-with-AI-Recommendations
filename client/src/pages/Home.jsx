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
        userId: '659000000000000000000001', // Dummy ID for V1
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
            // Split preferences string into array
            const preferencesArray = formData.preferences.split(',').map(p => p.trim()).filter(p => p);

            const payload = {
                ...formData,
                preferences: preferencesArray
            };

            console.log("Sending payload:", payload);

            const res = await axios.post('/api/itineraries/generate', payload);

            // Navigate to result page with data
            navigate('/itinerary', { state: { itinerary: res.data } });

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Something went wrong! Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
        >
            {/* Background blobs for aesthetic */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>

            <div className="z-10 w-full max-w-md">
                <motion.div
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-5xl font-extrabold mb-2 gradient-text tracking-tighter">
                        Plan Smarter.
                        <br />
                        Travel Better.
                    </h1>
                    <p className="text-gray-300 text-lg">
                        AI-powered itineraries for your next adventure 🌍
                    </p>
                </motion.div>

                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="glass-card p-8 flex flex-col gap-2"
                >
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg text-sm mb-4"
                        >
                            🚨 {error}
                        </motion.div>
                    )}

                    {loading ? (
                        <div className="py-20 flex justify-center">
                            <Loading text="AI is crafting your perfect trip..." />
                        </div>
                    ) : (
                        <>
                            <AnimatedInput
                                label="Destination"
                                name="destination"
                                value={formData.destination}
                                onChange={handleChange}
                                placeholder="e.g., Tokyo, Paris, Bali"
                                required
                            />

                            <div className="flex gap-4">
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
                                label="Preferences (comma separated)"
                                name="preferences"
                                value={formData.preferences}
                                onChange={handleChange}
                                placeholder="e.g., Food, Museums, Hiking, Nightlife"
                            />

                            <div className="mt-4 flex justify-center">
                                <AnimatedButton type="submit">
                                    Generate Itinerary ✨
                                </AnimatedButton>
                            </div>
                        </>
                    )}
                </motion.form>
            </div>
        </motion.div>
    );
};

export default Home;
