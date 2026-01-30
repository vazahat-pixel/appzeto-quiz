import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login({ email: formData.email, password: formData.password });
            navigate('/categories');
        } catch (err) {
            setError(err.message || 'Failed to login');
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
            <div className="glass-morphism p-8 rounded-2xl w-full max-w-md space-y-6 shadow-2xl">
                <h2 className="text-3xl font-bold text-center">Login</h2>
                {error && <p className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded-lg">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-white/10 border border-white/20 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="you@example.com"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-white/10 border border-white/20 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="••••••••"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <Button type="submit" className="w-full py-3" variant="primary">Login</Button>
                </form>
                <p className="text-center text-white/50">
                    Don't have an account? <Link to="/signup" className="text-indigo-400 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
