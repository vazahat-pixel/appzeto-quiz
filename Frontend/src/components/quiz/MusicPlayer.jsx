import React, { useState, useEffect, useRef } from 'react';

const MusicPlayer = () => {
    const [isMuted, setIsMuted] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const audioRef = useRef(null);

    // Using a sample external URL because the local file is 0 bytes
    const AUDIO_SRC = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

    // Initialize audio only once
    useEffect(() => {
        const audio = new Audio(AUDIO_SRC);
        audio.loop = true;
        audio.volume = 0.3;
        audioRef.current = audio;

        // Auto-play attempt on mount (only works if user already interacted with the app before)
        const tryPlay = () => {
            if (!isMuted) {
                audio.play()
                    .then(() => setHasInteracted(true))
                    .catch(() => console.log("Waiting for user interaction..."));
            }
        };

        tryPlay();

        const handleInteraction = () => {
            setHasInteracted(true);
            if (!isMuted && audio.paused) {
                audio.play().catch(e => console.log("Playback failed:", e));
            }
        };

        window.addEventListener('click', handleInteraction);
        window.addEventListener('touchstart', handleInteraction);

        return () => {
            audio.pause();
            audioRef.current = null;
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
        };
    }, []);

    // Handle Mute/Unmute toggle
    useEffect(() => {
        if (audioRef.current) {
            if (isMuted) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(() => { });
            }
        }
    }, [isMuted]);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
            {!hasInteracted && !isMuted && (
                <div className="mb-2 bg-indigo-600 text-white text-[10px] px-2 py-1 rounded-md animate-bounce shadow-lg">
                    Click anywhere to start Music 🎵
                </div>
            )}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                }}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all border shadow-2xl group ${isMuted ? 'bg-white/5 border-white/10' : 'bg-indigo-600/20 border-indigo-500/50 backdrop-blur-md'
                    }`}
            >
                <span className="group-hover:scale-110 transition-transform">
                    {isMuted ? '🔇' : '🔊'}
                </span>
            </button>
        </div>
    );
};

export default MusicPlayer;
