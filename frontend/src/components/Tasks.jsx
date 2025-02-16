import { useState, useEffect } from 'react';
import axios from 'axios';
import useProjectsStore from '../store/projectStore';
import useCategoriesStore from '../store/categoryStore';

function Tasks() {
  const { projects } = useProjectsStore();
  const { categories } = useCategoriesStore();
  
  const [tasks, setTasks] = useState([]);

  // Form state for creating a new task
  const [newTask, setNewTask] = useState({
    project_id: '',
    title: '',
    description: '',
    status: 'in_progress',
    due_date: '',
  });

  // Fetch tasks
  const getTasks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/tasks');
      setTasks(response.data);
    } catch (err) {
      console.error('Error in GET request:', err);
    }
  };

  // Create a new task
  const createTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/tasks', {
        project_id: newTask.project_id,
        category_id: newTask.category_id,
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
        due_date: newTask.due_date,
      });

      // Clear the form fields
      setNewTask({
        project_id: '',
        title: '',
        description: '',
        status: 'in_progress',
        due_date: '',
      });

      // Refetch tasks after successful creation
      getTasks();
    } catch (err) {
      console.error('Error in POST request:', err);
    }
  };

  // Mark task as completed
  const markTaskAsCompleted = async (taskId) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/tasks/${taskId}/complete`);
      getTasks();
    } catch (err) {
      console.error('Error in PATCH request:', err);
    }
  };

  // on component mounted get categories
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <h2>------------ Tasks List ------------</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Title</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Project Id</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Category Id</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Description</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Status</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Due Date</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Created at</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Updated at</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{task.id}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{task.title}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{task.project_id}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{task.category_id}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{task.description}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{task.status}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{task.due_date}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                {task.created_at ? task.created_at.substring(0, 10) : 'N/A'}
              </td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                {task.updated_at ? task.updated_at.substring(0, 10) : 'N/A'}
              </td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                <button onClick={() => markTaskAsCompleted(task.id)}>
                  Mark as completed
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Create Task</h3>
      <form onSubmit={createTask} style={{ marginTop: '20px' }}>
        {/* Project Select Dropdown */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="project">Project: </label>
          <select
            id="project"
            value={newTask.project_id}
            onChange={(e) =>
              setNewTask({ ...newTask, project_id: e.target.value })
            }
            required
            style={{ padding: '5px', marginLeft: '10px' }}
          >
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>


        {/* Category Select Dropdown */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="project">Category: </label>
          <select
            id="category"
            value={newTask.category_id}
            onChange={(e) =>
              setNewTask({ ...newTask, category_id: e.target.value })
            }
            required
            style={{ padding: '5px', marginLeft: '10px' }}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Title Input */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            value={newTask.title}
            onChange={(e) =>
              setNewTask({ ...newTask, title: e.target.value })
            }
            required
            style={{ padding: '5px', marginLeft: '10px' }}
          />
        </div>

        {/* Description Input */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            id="description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            required
            style={{ padding: '5px', marginLeft: '10px' }}
          />
        </div>

        {/* Status Select */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="status">Status: </label>
          <select
            id="status"
            value={newTask.status}
            onChange={(e) =>
              setNewTask({ ...newTask, status: e.target.value })
            }
            required
            style={{ padding: '5px', marginLeft: '10px' }}
          >
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Due Date Input */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="due_date">Due Date: </label>
          <input
            type="date"
            id="due_date"
            value={newTask.due_date}
            onChange={(e) =>
              setNewTask({ ...newTask, due_date: e.target.value })
            }
            required
            style={{ padding: '5px', marginLeft: '10px' }}
          />
        </div>

        <button type="submit" style={{ padding: '8px 12px' }}>
          Create Task
        </button>
      </form>
    </>
  );
}

export default Tasks;
