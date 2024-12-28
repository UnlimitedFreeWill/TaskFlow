import { Task } from '../types/task';

const BASE_URL = 'http://localhost:8080/tasks';

export const fetchTasks = async (): Promise<Task[]> => {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }
    return response.json();
};

export const addTask = async (task: Partial<Task>): Promise<Task> => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        throw new Error('Failed to add task');
    }
    return response.json();
};

export const deleteTask = async (id: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) {
        throw new Error('Failed to delete task');
    }
};

export const toggleTaskCompletion = async (id: string, completed: boolean): Promise<Task> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
    });
    if (!response.ok) {
        throw new Error('Failed to toggle task completion');
    }
    return response.json();
};