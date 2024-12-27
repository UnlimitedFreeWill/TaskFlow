import React, { useState } from 'react';

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, title: 'Sarcina 1', completed: false },
        { id: 2, title: 'Sarcina 2', completed: true },
    ]);

    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }]);
            setNewTask('');
        }
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleTask = (id: number) => {
        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
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
                <button className="btn btn-success" onClick={addTask}>Adaugă</button>
            </div>
            <div className="mb-3">
                <label className="form-label me-2">Filtrează:</label>
                <select
                    className="form-select w-auto d-inline"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as any)}
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
                                onChange={() => toggleTask(task.id)}
                            />
                            {task.title}
                        </div>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task.id)}>Șterge</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;