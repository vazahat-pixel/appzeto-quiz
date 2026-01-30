import React from 'react';

const QuizHeader = ({ progress, current, total, score }) => {
    return (
        <div className="w-full max-w-5xl mx-auto space-y-6 animate-fade-in">
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <p className="text-white/60 font-bold uppercase tracking-widest text-sm">Question</p>
                    <h2 className="text-3xl font-black">{current} <span className="text-white/30 truncate">/ {total}</span></h2>
                </div>
                <div className="text-right space-y-1">
                    <p className="text-white/60 font-bold uppercase tracking-widest text-sm">Score</p>
                    <div className="bg-indigo-600 px-6 py-1 rounded-full text-2xl font-black italic">
                        {score.toLocaleString()}
                    </div>
                </div>
            </div>

            <div className="h-4 bg-white/10 rounded-full overflow-hidden border border-white/5">
                <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

export default QuizHeader;
