import { useEffect, useState } from 'react';
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    Task
} from './api/taskService';

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });

    const fetchTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreate = async () => {
        if (!newTask.title || !newTask.description) return;
        await createTask({ ...newTask, completed: false });
        setNewTask({ title: '', description: '' });
        fetchTasks();
    };

    const handleToggleComplete = async (task: Task) => {
        await updateTask({ ...task, completed: !task.completed });
        fetchTasks();
    };

    const handleDelete = async (id: number) => {
        await deleteTask(id);
        fetchTasks();
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

            <div className="flex gap-2 mb-4">
                <input
                    className="border rounded p-2 flex-1"
                    placeholder="Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <input
                    className="border rounded p-2 flex-1"
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
                <button onClick={handleCreate} className="bg-blue-500 text-white px-4 rounded">Add</button>
            </div>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className="border p-2 rounded mb-2 flex justify-between items-center">
                        <div>
                            <h2 className={`font-semibold ${task.completed ? 'line-through' : ''}`}>{task.title}</h2>
                            <p className={task.completed ? 'line-through' : ''}>{task.description}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleToggleComplete(task)} className="text-green-500">✓</button>
                            <button onClick={() => handleDelete(task.id)} className="text-red-500">🗑</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
