import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = ({ children, onClick, disabled, className = "" }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(255, 0, 204)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            disabled={disabled}
            className={`relative overflow-hidden px-8 py-3 rounded-full font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            style={{
                background: "linear-gradient(45deg, #ff00cc, #333399)",
                boxShadow: "0 4px 15px rgba(255, 0, 204, 0.4)"
            }}
        >
            {children}
        </motion.button>
    );
};

export default AnimatedButton;
