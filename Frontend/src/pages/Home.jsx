import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Button from '../components/common/Button';

const Home = () => {
    const navigate = useNavigate();
    const mainRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.stagger-item', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            });
        }, mainRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={mainRef} className="page-container relative overflow-hidden">
            {/* Background Orbs - Subtle & Balanced */}
            <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 text-center space-y-8 max-w-4xl">
                <div className="space-y-4">
                    <span className="stagger-item block text-indigo-500 font-bold tracking-[0.3em] uppercase text-sm">Welcome to the Ultimate Quiz</span>
                    <h1 className="stagger-item text-4xl md:text-7xl font-black tracking-tight leading-tight">
                        Test Your Knowledge <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                            Push Your Limits.
                        </span>
                    </h1>
                    <p className="stagger-item text-lg md:text-xl text-text-muted max-w-2xl mx-auto font-medium">
                        Challenge yourself with categories from science to pop culture.
                        Climb the leaderboard and become a Quiz Master.
                    </p>
                </div>

                <div className="stagger-item pt-6 flex flex-col md:flex-row items-center justify-center gap-4">
                    <Button
                        variant="primary"
                        onClick={() => navigate('/categories')}
                        className="w-full md:w-auto text-lg py-4 px-10 rounded-2xl shadow-xl shadow-indigo-500/20"
                    >
                        Start Playing
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => navigate('/signup')}
                        className="w-full md:w-auto text-lg py-4 px-10 rounded-2xl border-white/10"
                    >
                        Join Now
                    </Button>
                </div>

                {/* Stats / Badges */}
                <div className="stagger-item pt-12 grid grid-cols-2 md:grid-cols-3 gap-8 opacity-50">
                    <div className="text-center">
                        <p className="text-2xl font-bold">10k+</p>
                        <p className="text-xs uppercase tracking-widest font-bold">Active Players</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold">500+</p>
                        <p className="text-xs uppercase tracking-widest font-bold">Levels</p>
                    </div>
                    <div className="text-center hidden md:block">
                        <p className="text-2xl font-bold">24/7</p>
                        <p className="text-xs uppercase tracking-widest font-bold">Live Arena</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
