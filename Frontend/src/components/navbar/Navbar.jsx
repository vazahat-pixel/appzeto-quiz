import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 w-full glass-nav px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-white text-xl shadow-lg">
                        A
                    </div>
                    <span className="text-xl font-black tracking-tighter">APPZETO</span>
                </Link>

                <div className="hidden md:flex items-center space-x-1">
                    <Link
                        to="/"
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${isActive('/') ? 'bg-indigo-600/10 text-indigo-500' : 'opacity-60 hover:opacity-100'
                            }`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/categories"
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${isActive('/categories') ? 'bg-indigo-600/10 text-indigo-500' : 'opacity-60 hover:opacity-100'
                            }`}
                    >
                        Arenas
                    </Link>
                    {user && (
                        <Link
                            to="/profile"
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${isActive('/profile') ? 'bg-indigo-600/10 text-indigo-500' : 'opacity-60 hover:opacity-100'
                                }`}
                        >
                            Profile
                        </Link>
                    )}
                </div>

                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5"
                    >
                        {theme === 'dark' ? '🔆' : '🌙'}
                    </button>

                    {user ? (
                        <Button
                            variant="secondary"
                            onClick={handleLogout}
                            className="hidden md:block py-2 px-5 text-xs font-bold border-white/10"
                        >
                            Logout
                        </Button>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <Link to="/login" className="text-sm font-bold opacity-70 hover:opacity-100 px-2 transition-opacity">Login</Link>
                            <Button
                                variant="primary"
                                onClick={() => navigate('/signup')}
                                className="py-2 px-6 text-sm rounded-xl"
                            >
                                Sign Up
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
