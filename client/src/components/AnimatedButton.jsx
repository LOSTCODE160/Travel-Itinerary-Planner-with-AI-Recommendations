import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = ({ children, onClick, disabled, type = "button" }) => {
    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="btn-primary"
            whileTap={{ scale: 0.98 }}
        >
            {children}
        </motion.button>
    );
};

export default AnimatedButton;
