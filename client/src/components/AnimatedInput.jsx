import React from 'react';
import { motion } from 'framer-motion';

const AnimatedInput = ({ label, type = "text", value, onChange, placeholder, required = false, ...props }) => {
    return (
        <div className="input-group">
            <label className="label">
                {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
            </label>
            <motion.input
                initial={false}
                type={type}
                name={props.name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="input-field"
                {...props}
            />
        </div>
    );
};

export default AnimatedInput;
