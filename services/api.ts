import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:8080/api'; // Android Emulator

const getAuthHeader = async () => {
    const token = await AsyncStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
};

export const loginUser = async (username: string, password: string) => {
    try {
        const res = await axios.post(`${API_URL}/auth/login`, { username, password });
        return res.data;
    } catch (err) {
        console.error(err);
    }
};

export const registerUser = async (username: string, password: string) => {
    return axios.post(`${API_URL}/auth/register`, { username, password });
};

export const fetchBooks = async () => {
    const headers = await getAuthHeader();
    const res = await axios.get(`${API_URL}/livres`, { headers });
    return res.data;
};

export const borrowBook = async (bookId: number) => {
    const headers = await getAuthHeader();
    return axios.post(`${API_URL}/livres/emprunt/${bookId}`, {}, { headers });
};

export const returnBook = async (bookId: number) => {
    const headers = await getAuthHeader();
    return axios.post(`${API_URL}/livres/retour/${bookId}`, {}, { headers });
};
