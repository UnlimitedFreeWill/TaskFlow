import React, {useState, useEffect} from 'react';
import {fetchTasks, addTask, deleteTask, toggleTaskCompletion} from '../config/api';
import { Task } from '../types/task';

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

    useEffect(() => {
        // Fetch tasks from backend
        fetchTasks()
            .then(setTasks)
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    const handleAddTask = () => {
        if (newTask.trim()) {
            const taskToAdd = {title: newTask, completed: false};
            addTask(taskToAdd)
                .then(newTask => setTasks([...tasks, newTask]))
                .catch(error => console.error('Error adding task:', error));
            setNewTask('');
        }
    };

    const handleDeleteTask = (id: string) => {
        deleteTask(id)
            .then(() => setTasks(tasks.filter(task => task.id !== id)))
            .catch(error => console.error('Error deleting task:', error));
    };

    const handleToggleTask = (id: string) => {
        const task = tasks.find(task => task.id === id);
        if (!task) return;
        toggleTaskCompletion(id, !task.completed)
            .then(updatedTask => {
                setTasks(tasks.map(t => (t.id === id ? updatedTask : t)));
            })
            .catch(error => console.error('Error updating task:', error));
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'incomplete') return !task.completed;
        return true;
    });

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-primary">Lista Sarcinilor</h2>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Adaugă o nouă sarcină..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button className="btn btn-success" onClick={handleAddTask}>
                    Adaugă
                </button>
            </div>
            <div className="mb-3">
                <label className="form-label me-2">Filtrează:</label>
                <select
                    className="form-select w-auto d-inline"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as 'all' | 'completed' | 'incomplete')}
                >
                    <option value="all">Toate</option>
                    <option value="completed">Finalizate</option>
                    <option value="incomplete">Ne-finalizate</option>
                </select>
            </div>
            <ul className="list-group">
                {filteredTasks.map((task) => (
                    <li
                        key={task.id}
                        className={`list-group-item d-flex justify-content-between align-items-center ${
                            task.completed ? 'list-group-item-success' : ''
                        }`}
                    >
                        <div>
                            <input
                                type="checkbox"
                                className="form-check-input me-2"
                                checked={task.completed}
                                onChange={() => handleToggleTask(task.id)}
                            />
                            {task.title}
                        </div>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteTask(task.id)}
                        >
                            Șterge
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;