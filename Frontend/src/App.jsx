import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/navbar/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Categories from './pages/Categories';
import Difficulty from './pages/Difficulty';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Profile from './pages/Profile';

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <QuizProvider>
                    <Router>
                        <div className="min-h-screen">
                            <Navbar />
                            <main>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/signup" element={<Signup />} />

                                    {/* Protected Routes */}
                                    <Route path="/categories" element={
                                        <ProtectedRoute>
                                            <Categories />
                                        </ProtectedRoute>
                                    } />
                                    <Route path="/difficulty/:categoryId" element={
                                        <ProtectedRoute>
                                            <Difficulty />
                                        </ProtectedRoute>
                                    } />
                                    <Route path="/quiz" element={
                                        <ProtectedRoute>
                                            <Quiz />
                                        </ProtectedRoute>
                                    } />
                                    <Route path="/result" element={
                                        <ProtectedRoute>
                                            <Result />
                                        </ProtectedRoute>
                                    } />
                                    <Route path="/profile" element={
                                        <ProtectedRoute>
                                            <Profile />
                                        </ProtectedRoute>
                                    } />
                                </Routes>
                            </main>
                        </div>
                    </Router>
                </QuizProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
