import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { getUserHistory } from '../services/quizService';

const Profile = () => {
    const { user } = useAuth();
    const { unlockedLevels } = useQuiz();
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getUserHistory();
                setHistory(data);
            } catch (error) {
                console.error("Failed to fetch history:", error);
            } finally {
                setLoadingHistory(false);
            }
        };
        fetchHistory();
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="glass-morphism p-10 rounded-[2.5rem] space-y-10 shadow-2xl animate-fade-in">
                {/* User Info Header */}
                <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 pb-10 border-b border-white/10">
                    <div className="w-32 h-32 bg-indigo-600 rounded-full flex items-center justify-center text-5xl font-black shadow-lg shadow-indigo-500/30">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-black">{user?.name}</h1>
                        <p className="text-white/50">{user?.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Progress Section */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold uppercase tracking-widest text-indigo-400">Your Progress</h3>
                        <div className="space-y-4">
                            {['Easy', 'Medium', 'Hard'].map((lvl) => (
                                <div key={lvl} className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5">
                                    <span className="font-bold">{lvl} Level</span>
                                    <span className={unlockedLevels[lvl] ? "text-green-400 font-bold" : "text-white/20 font-medium"}>
                                        {unlockedLevels[lvl] ? "✅ UNLOCKED" : "🔒 LOCKED"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* History Section */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold uppercase tracking-widest text-indigo-400">Recent Activity</h3>
                        <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                            {loadingHistory ? (
                                <p className="text-white/30 italic">Loading activity...</p>
                            ) : history.length > 0 ? (
                                history.map((h, i) => (
                                    <div key={i} className="bg-white/5 p-3 rounded-lg border border-white/5 flex justify-between items-center text-sm">
                                        <div>
                                            <p className="font-bold">{h.category}</p>
                                            <p className="text-xs text-white/40">{h.difficulty}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-black text-indigo-400">{h.score}</p>
                                            <p className="text-[10px] text-white/30">{new Date(h.createdAt || Date.now()).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-white/30 italic">No quizzes played yet.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-6 flex justify-center">
                    <Button variant="primary" onClick={() => navigate('/categories')}>
                        Play New Quiz
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
