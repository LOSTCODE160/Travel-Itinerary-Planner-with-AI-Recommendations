import React from 'react';
import { motion } from 'framer-motion';

const AnimatedInput = ({ label, type = "text", value, onChange, placeholder, required = false }) => {
    return (
        <div className="flex flex-col gap-2 mb-4 w-full">
            <label className="text-sm font-semibold text-gray-300 ml-1">{label} {required && <span className="text-pink-500">*</span>}</label>
            <motion.input
                whileFocus={{ scale: 1.02, borderColor: "#00d4ff", backgroundColor: "rgba(255,255,255,0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="glass-card px-4 py-3 text-white placeholder-gray-500 focus:outline-none w-full"
                style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    color: "white"
                }}
            />
        </div>
    );
};

export default AnimatedInput;
