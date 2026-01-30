import React from 'react';

const Options = ({ options, onSelect, selectedOption, correctAnswer, showFeedback }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {options.map((option, index) => {
                const isSelected = selectedOption === option;
                const isCorrect = option === correctAnswer;

                let feedbackClass = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-indigo-500/50";

                if (showFeedback) {
                    if (isCorrect) feedbackClass = "bg-emerald-500/20 border-emerald-500 text-emerald-500";
                    else if (isSelected) feedbackClass = "bg-rose-500/20 border-rose-500 text-rose-500";
                    else feedbackClass = "opacity-30 pointer-events-none";
                }

                return (
                    <button
                        key={index}
                        disabled={showFeedback}
                        onClick={() => onSelect(option)}
                        className={`group relative flex items-center p-6 rounded-2xl border transition-all duration-300 text-left font-bold ${feedbackClass}`}
                    >
                        <div className="w-10 h-10 shrink-0 bg-indigo-600/10 rounded-xl flex items-center justify-center mr-4 text-xs font-black">
                            {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-sm md:text-base flex-1">
                            {option}
                        </span>

                        {showFeedback && isCorrect && (
                            <span className="ml-2 text-emerald-500">✓</span>
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default Options;
