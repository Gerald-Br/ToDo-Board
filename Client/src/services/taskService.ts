import axios from 'axios';
import type { Task } from '@/store/taskStore';

const API_URL = 'http://localhost:3000/api';

export const getTasks = async (): Promise<Task[]> => {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
};

export const createTask = async (task: Partial<Task>): Promise<Task> => {
    console.log("sending task: ", task)
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
};

export const updateTask = async (id: string, task: Partial<Task>): Promise<Task> => {
    const response = await axios.put(`${API_URL}/tasks/${id}`, task);
    return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/tasks/${id}`);
};