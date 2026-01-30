import React, { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [score, setScore] = useState(0);
    const [unlockedLevels, setUnlockedLevels] = useState(() => {
        const saved = localStorage.getItem('appzeto_levels');
        return saved ? JSON.parse(saved) : { Easy: true, Medium: false, Hard: false };
    });

    const updateProgress = (level, percentage) => {
        console.log(`Updating progress for ${level}: ${percentage}%`);
        // Lowered threshold to 60% (3 out of 5 correct) for easier unlocking
        if (percentage >= 60) {
            let nextLevel = null;
            if (level === 'Easy') nextLevel = 'Medium';
            else if (level === 'Medium') nextLevel = 'Hard';

            if (nextLevel && !unlockedLevels[nextLevel]) {
                console.log(`Unlocking next level: ${nextLevel}`);
                const newLevels = { ...unlockedLevels, [nextLevel]: true };
                setUnlockedLevels(newLevels);
                localStorage.setItem('appzeto_levels', JSON.stringify(newLevels));
            }
        }
    };

    const resetQuiz = () => {
        setCurrentQuiz(null);
        setScore(0);
    };

    return (
        <QuizContext.Provider value={{
            currentQuiz,
            setCurrentQuiz,
            score,
            setScore,
            unlockedLevels,
            setUnlockedLevels,
            updateProgress,
            resetQuiz
        }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => useContext(QuizContext);
