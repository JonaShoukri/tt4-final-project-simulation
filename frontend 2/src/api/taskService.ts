export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5225/api/tasks";

export const getTasks = async (): Promise<Task[]> => {
    const res = await fetch(API_URL);
    return res.json();
};

export const createTask = async (task: Omit<Task, 'id'>) => {
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
};

export const updateTask = async (task: Task) => {
    await fetch(`${API_URL}/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
};

export const deleteTask = async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
};
