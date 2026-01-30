import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { fetchQuizByCategory } from '../services/quizService';
import QuizHeader from '../components/quiz/QuizHeader';
import QuestionCard from '../components/quiz/QuestionCard';
import Options from '../components/quiz/Options';
import Timer from '../components/common/Timer';
import Loader from '../components/common/Loader';
import MusicPlayer from '../components/quiz/MusicPlayer';
import gsap from 'gsap';

const Quiz = () => {
    const navigate = useNavigate();
    const { currentQuiz, setScore } = useQuiz();
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [localScore, setLocalScore] = useState(0);
    const cardRef = useRef(null);

    useEffect(() => {
        if (!currentQuiz) {
            navigate('/categories');
            return;
        }

        const loadQuestions = async () => {
            try {
                const data = await fetchQuizByCategory(currentQuiz.categoryId, currentQuiz.difficulty);
                setQuestions(data);
                setLoading(false);
                // Correctly update the context state with total questions
                setCurrentQuiz(prev => ({ ...prev, totalQuestions: data.length }));
                console.log("Questions loaded:", data.length);
            } catch (err) {
                console.error("Failed to load questions:", err);
            }
        };

        loadQuestions();
    }, [currentQuiz, navigate]);

    useEffect(() => {
        if (!loading && cardRef.current) {
            gsap.fromTo(cardRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
            );
        }
    }, [currentIndex, loading]);

    const handleSelect = (option) => {
        if (showFeedback) return;
        setSelectedOption(option);
        setShowFeedback(true);

        if (option === questions[currentIndex].correct) {
            setLocalScore(prev => prev + 100);
        }

        setTimeout(() => handleNext(), 1500);
    };

    const handleNext = () => {
        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
            setShowFeedback(false);
        } else {
            console.log("Quiz complete. Score:", localScore);
            setScore(localScore);
            navigate('/result');
        }
    };

    if (loading) return (
        <div className="h-screen flex flex-col items-center justify-center space-y-4">
            <Loader />
            <p className="text-sm font-bold tracking-widest uppercase animate-pulse">Loading Arena...</p>
        </div>
    );

    return (
        <div className="page-container flex flex-col items-center py-10">
            <div className="w-full max-w-4xl space-y-10">
                <QuizHeader
                    progress={((currentIndex + 1) / questions.length) * 100}
                    current={currentIndex + 1}
                    total={questions.length}
                    score={localScore}
                />

                <div ref={cardRef} className="glass-card p-8 md:p-12 rounded-[2.5rem] flex flex-col items-center space-y-8">
                    <div className="bg-indigo-600/10 p-4 rounded-2xl border border-indigo-500/20">
                        <Timer
                            duration={currentQuiz?.difficulty === 'Easy' ? 15 : currentQuiz?.difficulty === 'Medium' ? 12 : 10}
                            onTimeUp={() => !showFeedback && handleSelect(null)}
                            isActive={!showFeedback}
                        />
                    </div>

                    <QuestionCard question={questions[currentIndex].question} />

                    <div className="w-full pt-4">
                        <Options
                            options={questions[currentIndex].options}
                            onSelect={handleSelect}
                            selectedOption={selectedOption}
                            correctAnswer={questions[currentIndex].correct}
                            showFeedback={showFeedback}
                        />
                    </div>
                </div>
            </div>
            <MusicPlayer />
        </div>
    );
};

export default Quiz;
