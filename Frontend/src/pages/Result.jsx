import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import Button from '../components/common/Button';
import { saveQuizResult } from '../services/quizService';
import gsap from 'gsap';

const getRemarks = (percentage) => {
    if (percentage >= 100) return { text: "MASTERMIND", color: "text-emerald-500", sub: "Perfect score! You are a true genius." };
    if (percentage >= 60) return { text: "CHALLENGER", color: "text-indigo-500", sub: "Great performance! Next level unlocked." };
    if (percentage >= 40) return { text: "NOVICE", color: "text-amber-500", sub: "Good effort, but you can do better." };
    return { text: "TRY AGAIN", color: "text-rose-500", sub: "Keep practicing to improve your score." };
};

const Result = () => {
    const navigate = useNavigate();
    const { score, currentQuiz, updateProgress, resetQuiz } = useQuiz();
    const scoreRef = useRef(null);

    const totalQuestions = currentQuiz?.totalQuestions || 5;
    const totalPossible = totalQuestions * 100;
    const percentage = (score / totalPossible) * 100;
    const remarks = getRemarks(percentage);

    useEffect(() => {
        console.log("Result Page Mounted. Score:", score, "Quiz Info:", currentQuiz);

        if (currentQuiz) {
            saveQuizResult({
                category: currentQuiz.categoryId,
                difficulty: currentQuiz.difficulty,
                score: score,
                percentage: Math.round(percentage),
                remark: remarks.text
            });
            updateProgress(currentQuiz.difficulty, percentage);
        } else {
            console.warn("No current quiz found in result page. Redirecting...");
            // If no active quiz, wait a second then redirect
            const timer = setTimeout(() => navigate('/categories'), 3000);
            return () => clearTimeout(timer);
        }

        // Only animate if we have elements
        if (scoreRef.current) {
            gsap.from('.result-anim', {
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out"
            });

            gsap.from(scoreRef.current, {
                innerText: 0,
                duration: 1.5,
                snap: { innerText: 1 },
                ease: "power1.out"
            });
        }
    }, [currentQuiz, score, navigate]);

    if (!currentQuiz) {
        return (
            <div className="page-container text-center space-y-6">
                <h2 className="text-2xl font-bold italic">SESSION EXPIRED</h2>
                <p className="opacity-60 text-sm">We couldn't find your last quiz data. Redirecting to home...</p>
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="glass-card result-anim p-10 md:p-16 rounded-[3rem] w-full max-w-2xl text-center space-y-10">
                <div className="space-y-2">
                    <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-indigo-500">Summary Report</span>
                    <h1 className={`${remarks.color} text-5xl md:text-7xl font-black italic tracking-tighter uppercase`}>
                        {remarks.text}
                    </h1>
                    <p className="text-text-muted font-medium">{remarks.sub}</p>
                </div>

                <div className="py-8">
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full"></div>
                        <div className="relative space-y-1">
                            <h2 ref={scoreRef} className="text-8xl font-black tracking-tighter">
                                {score}
                            </h2>
                            <p className="text-xs font-bold tracking-[0.3em] uppercase opacity-40">Total Score</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5">
                    <div>
                        <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40 mb-1">Accuracy</p>
                        <p className="text-3xl font-black">{Math.round(percentage)}%</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40 mb-1">Tier</p>
                        <p className="text-3xl font-black uppercase">{currentQuiz?.difficulty}</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Button
                        variant="primary"
                        onClick={() => { resetQuiz(); navigate('/categories'); }}
                        className="w-full md:w-auto px-10 py-4 rounded-2xl"
                    >
                        Play Again
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => navigate('/profile')}
                        className="w-full md:w-auto px-10 py-4 rounded-2xl border-white/10"
                    >
                        View Profile
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Result;
