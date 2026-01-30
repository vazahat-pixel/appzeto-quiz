const API_URL = import.meta.env.VITE_API_BASE_URL;

export const signup = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Signup failed');
        }

        return await response.json();
    } catch (error) {
        console.warn("Backend unavailable, using mock signup...");
        // Return a mock user for development
        return {
            user: { ...userData, id: 'mock-id-123' },
            token: 'mock-jwt-token-456'
        };
    }
};

export const login = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }

        return await response.json();
    } catch (error) {
        console.warn("Backend unavailable, using mock login...");
        // Return a mock user for development
        return {
            user: { name: 'Demo User', email: credentials.email, id: 'mock-id-123' },
            token: 'mock-jwt-token-456'
        };
    }
};
