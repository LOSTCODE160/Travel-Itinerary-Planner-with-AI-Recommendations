import React from 'react';
import { motion } from 'framer-motion';

const Loading = ({ text = "AI is thinking..." }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <div className="flex gap-2 mb-4">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-4 h-4 rounded-full bg-cyan-400"
                        animate={{
                            y: ["0%", "-100%", "0%"],
                            backgroundColor: ["#00d4ff", "#ff00cc", "#00d4ff"]
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.2
                        }}
                        style={{ backgroundColor: '#00d4ff' }}
                    />
                ))}
            </div>
            <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-white font-semibold text-lg"
            >
                {text}
            </motion.p>
        </div>
    );
};

export default Loading;
