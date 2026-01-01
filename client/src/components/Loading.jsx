import React from 'react';
import { motion } from 'framer-motion';

const Loading = ({ text = "AI is thinking..." }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '2rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            backgroundColor: '#00d4ff'
                        }}
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
                    />
                ))}
            </div>
            <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-muted"
                style={{ fontSize: '1.125rem', fontWeight: 600 }}
            >
                {text}
            </motion.p>
        </div>
    );
};

export default Loading;
