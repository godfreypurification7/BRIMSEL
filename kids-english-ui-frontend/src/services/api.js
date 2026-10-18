import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const sendMessage = async (childId, message) => {
  try {
    const response = await apiClient.post('/chat', { childId, message });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error. Please try again.' };
  }
};

export const getProgress = async (childId) => {
  try {
    const response = await apiClient.get(`/progress/${childId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Could not fetch progress.' };
  }
};

export const resetProgress = async (childId) => {
  try {
    const response = await apiClient.post(`/progress/${childId}/reset`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Could not reset progress.' };
  }
};