import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const categories = [
    { id: 'general', name: 'General Knowledge', icon: '🌍', color: 'bg-indigo-500' },
    { id: 'science', name: 'Science & Nature', icon: '🧬', color: 'bg-blue-500' },
    { id: 'tech', name: 'Technology', icon: '💻', color: 'bg-emerald-500' },
    { id: 'history', name: 'History & Culture', icon: '📜', color: 'bg-amber-500' },
    { id: 'art', name: 'Art & Design', icon: '🎨', color: 'bg-purple-500' },
    { id: 'sports', name: 'Sports Arena', icon: '⚽', color: 'bg-rose-500' },
];

const Categories = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.cat-card', {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="page-container">
            <div className="text-center mb-12 space-y-3">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight">QUIZ ARENAS</h2>
                <p className="text-text-muted text-lg max-w-xl mx-auto">Select a category to start your journey to the top.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        onClick={() => navigate(`/difficulty/${cat.id}`)}
                        className="cat-card glass-card group relative p-8 rounded-3xl cursor-pointer hover:scale-[1.03] transition-all duration-300"
                    >
                        {/* Status Light */}
                        <div className={`absolute top-6 right-6 w-2 h-2 rounded-full ${cat.color} animate-pulse`}></div>

                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className={`w-16 h-16 ${cat.color} bg-opacity-10 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform`}>
                                {cat.icon}
                            </div>
                            <h3 className="text-xl font-bold tracking-tight">{cat.name}</h3>
                            <p className="text-xs text-text-muted font-medium uppercase tracking-widest">50+ Questions</p>
                        </div>

                        <div className="mt-6 w-full py-2 rounded-xl bg-white/5 group-hover:bg-indigo-600 transition-colors text-center text-xs font-bold uppercase tracking-widest">
                            Choose Sector
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
