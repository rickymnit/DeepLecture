import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const addYoutube = async (url) => {
    const response = await api.post('/add_youtube', { url });
    return response.data;
};

export const chatWithLecture = async (question) => {
    const response = await api.post('/chat', { question });
    return response.data;
};

export default api;
