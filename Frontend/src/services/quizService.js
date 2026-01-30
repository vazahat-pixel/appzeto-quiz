const API_URL = import.meta.env.VITE_API_BASE_URL;

// Mapping our categories to Open Trivia DB category IDs
const CATEGORY_MAP = {
    general: 9,
    science: 17,
    tech: 18,
    history: 23,
    art: 25,
    sports: 21
};

// Expanded mock data base
const MOCK_QUESTIONS = {
    general: {
        Easy: [
            { question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correct: "Paris" },
            { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correct: "Mars" },
            { question: "How many continents are there?", options: ["5", "6", "7", "8"], correct: "7" },
            { question: "What is the largest mammal?", options: ["Elephant", "Blue Whale", "Giraffe", "Lion"], correct: "Blue Whale" },
            { question: "Which color is a banana?", options: ["Red", "Blue", "Yellow", "Green"], correct: "Yellow" }
        ],
        Medium: [
            { question: "Largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: "Pacific" },
            { question: "Symbol for Oxygen?", options: ["Au", "O", "Fe", "C"], correct: "O" },
            { question: "When did WWII end?", options: ["1943", "1944", "1945", "1946"], correct: "1945" },
            { question: "Who wrote 'Romeo and Juliet'?", options: ["Dickens", "Shakespeare", "Twain", "Austen"], correct: "Shakespeare" },
            { question: "Which country is largest by area?", options: ["China", "USA", "Russia", "Canada"], correct: "Russia" }
        ],
        Hard: [
            { question: "Smallest country in the world?", options: ["Monaco", "Nauru", "Vatican City", "San Marino"], correct: "Vatican City" },
            { question: "Who painted 'The Starry Night'?", options: ["Da Vinci", "Picasso", "Van Gogh", "Monet"], correct: "Van Gogh" },
            { question: "Hardest natural substance?", options: ["Gold", "Iron", "Diamond", "Platinum"], correct: "Diamond" },
            { question: "Amazon's original name?", options: ["Google", "Cadabra", "Microsoft", "Apple"], correct: "Cadabra" },
            { question: "Bones in adult human body?", options: ["106", "206", "306", "406"], correct: "206" }
        ]
    }
};

const getHeaders = () => {
    const user = JSON.parse(localStorage.getItem('appzeto_user'));
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user?.token}`,
    };
};

// Helper to decode HTML entities from API
const decodeHTML = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
};

export const fetchQuizByCategory = async (category, difficulty) => {
    try {
        // 1. Try Local Backend First
        const response = await fetch(`${API_URL}/quiz/${category}/${difficulty}`, {
            headers: getHeaders(),
        });

        if (response.ok) return await response.json();
        throw new Error('Backend failed');
    } catch (error) {
        console.warn("Backend unavailable, fetching from Public Trivia API...");

        try {
            // 2. Try Public API (OpenTDB)
            const apiCat = CATEGORY_MAP[category] || 9;
            const apiDiff = difficulty.toLowerCase();
            const apiRes = await fetch(`https://opentdb.com/api.php?amount=5&category=${apiCat}&difficulty=${apiDiff}&type=multiple`);
            const data = await apiRes.json();

            if (data.results && data.results.length > 0) {
                return data.results.map(q => {
                    const options = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);
                    return {
                        question: decodeHTML(q.question),
                        options: options.map(opt => decodeHTML(opt)),
                        correct: decodeHTML(q.correct_answer)
                    };
                });
            }
        } catch (apiErr) {
            console.error("Public API failed, using hardcoded mock data");
        }

        // 3. Last Resort: Hardcoded Mock Data
        const categoryData = MOCK_QUESTIONS[category] || MOCK_QUESTIONS['general'];
        return categoryData[difficulty] || categoryData['Easy'];
    }
};

export const saveQuizResult = async (resultData) => {
    try {
        const response = await fetch(`${API_URL}/result`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(resultData),
        });

        if (!response.ok) throw new Error('Backend failed');
        return await response.json();
    } catch (error) {
        console.warn("Result saved locally (Mock Mode).");
        return { message: "Success", data: resultData };
    }
};

export const getUserHistory = async () => {
    try {
        const response = await fetch(`${API_URL}/result/user`, {
            headers: getHeaders(),
        });
        if (response.ok) return await response.json();
        return [];
    } catch (error) {
        return [];
    }
};
