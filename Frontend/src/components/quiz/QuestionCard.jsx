import React from 'react';

const QuestionCard = ({ question }) => {
    return (
        <div className="w-full text-center">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
                {question}
            </h2>
        </div>
    );
};

export default QuestionCard;
