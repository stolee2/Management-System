import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

function App() {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/projects`).then(response => setProjects(response.data));
        axios.get(`${API_BASE_URL}/tasks`).then(response => setTasks(response.data));
    }, []);

    const handleCreateTask = async () => {
        const newTask = { project_id: 1, title: "New Task", description: "Test task", status: "pending" };
        const response = await axios.post(`${API_BASE_URL}/tasks`, newTask);
        setTasks([...tasks, response.data]);
    };

    const handleCompleteTask = async (taskId) => {
        await axios.patch(`${API_BASE_URL}/tasks/${taskId}/complete`);
        setTasks(tasks.map(task => task.id === taskId ? { ...task, status: 'completed' } : task));
    };

    return (
        <div>
            <h1>Projects</h1>
            <ul>
                {projects.map(proj => <li key={proj.id}>{proj.name}</li>)}
            </ul>

            <h1>Tasks</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title} - {task.status}
                        {task.status !== 'completed' &&
                            <button onClick={() => handleCompleteTask(task.id)}>Complete</button>}
                    </li>
                ))}
            </ul>

            <button onClick={handleCreateTask}>Add Task</button>
        </div>
    );
}

export default App;
