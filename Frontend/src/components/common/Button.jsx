import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }) => {
    const baseStyles = 'px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30',
        secondary: 'bg-white/10 hover:bg-white/20 glass-morphism border-white/20',
        danger: 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/30',
        outline: 'border-2 border-indigo-600 hover:bg-indigo-600 hover:text-white'
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
