import React from 'react';
import { motion } from 'framer-motion';

const AnimatedInput = ({ label, type = "text", value, onChange, placeholder, required = false, icon, ...props }) => {
    return (
        <div className="input-group">
            <label className="label">
                {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                {icon && (
                    <div style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)', pointerEvents: 'none', display: 'flex' }}>
                        {icon}
                    </div>
                )}
                <motion.input
                    initial={false}
                    type={type}
                    name={props.name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className="input-field"
                    style={{ paddingLeft: icon ? '2.5rem' : '1rem' }}
                    {...props}
                />
            </div>
        </div>
    );
};

export default AnimatedInput;
