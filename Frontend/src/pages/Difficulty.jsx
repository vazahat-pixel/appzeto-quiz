import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import Button from '../components/common/Button';
import gsap from 'gsap';

const difficulties = [
    { id: 'Easy', name: 'NOVICE', time: '15s', color: 'bg-emerald-500', desc: 'Relaxed pace for beginners.' },
    { id: 'Medium', name: 'EXPERT', time: '12s', color: 'bg-amber-500', desc: 'A balanced test of knowledge.' },
    { id: 'Hard', name: 'MASTER', time: '10s', color: 'bg-rose-500', desc: 'Fast-paced for true experts.' },
];

const Difficulty = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const { unlockedLevels, setCurrentQuiz } = useQuiz();
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.diff-card', {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: "power2.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleStart = (diff) => {
        if (!unlockedLevels[diff]) return;
        setCurrentQuiz({ categoryId, difficulty: diff });
        navigate('/quiz');
    };

    return (
        <div ref={containerRef} className="page-container">
            <div className="text-center mb-12 space-y-4">
                <span className="text-xs font-bold tracking-[0.4em] uppercase text-indigo-500">{categoryId}</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase">SELECT DIFFICULTY</h2>
                <div className="h-1.5 w-16 bg-indigo-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                {difficulties.map((diff) => (
                    <div
                        key={diff.id}
                        onClick={() => handleStart(diff.id)}
                        className={`diff-card glass-card relative group p-10 rounded-[2.5rem] transition-all duration-300 ${unlockedLevels[diff.id]
                                ? 'cursor-pointer hover:border-indigo-500/50 hover:scale-[1.02]'
                                : 'opacity-40 grayscale pointer-events-none'
                            }`}
                    >
                        {!unlockedLevels[diff.id] && (
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <span className="text-4xl text-white/20">🔒</span>
                            </div>
                        )}

                        <div className={`flex flex-col items-center text-center space-y-6 ${!unlockedLevels[diff.id] ? 'blur-[2px]' : ''}`}>
                            <div className={`w-3 h-3 rounded-full ${diff.color} animate-pulse`}></div>
                            <h3 className="text-2xl font-black tracking-tight">{diff.name}</h3>

                            <div className="space-y-1">
                                <p className="text-3xl font-bold tracking-tighter">{diff.time}</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Per Question</p>
                            </div>

                            <p className="text-sm text-text-muted leading-relaxed">{diff.desc}</p>

                            <div className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-widest group-hover:bg-indigo-700 transition-colors">
                                SELECT LEVEL
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12">
                <Button variant="secondary" onClick={() => navigate('/categories')} className="px-8 py-3 rounded-xl border-white/10 text-xs font-bold tracking-widest uppercase">
                    Back to Categories
                </Button>
            </div>
        </div>
    );
};

export default Difficulty;
