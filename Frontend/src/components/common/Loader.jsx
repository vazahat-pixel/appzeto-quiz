import React from 'react';

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-400 border-t-white rounded-full animate-spin"></div>
            <p className="text-white/70 font-medium animate-pulse">Loading Appzeto...</p>
        </div>
    );
};

export default Loader;
