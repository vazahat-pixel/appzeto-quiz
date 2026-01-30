import React, { useState, useEffect } from 'react';

const Timer = ({ duration, onTimeUp, isActive }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        setTimeLeft(duration);
    }, [duration, isActive]);

    useEffect(() => {
        if (!isActive) return;

        if (timeLeft === 0) {
            onTimeUp();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isActive, onTimeUp]);

    const getColor = () => {
        if (timeLeft > 10) return 'text-green-400';
        if (timeLeft > 5) return 'text-yellow-400';
        return 'text-red-500';
    };

    return (
        <div className={`text-4xl font-bold ${getColor()} transition-colors duration-300`}>
            {timeLeft}
        </div>
    );
};

export default Timer;
