import { useState, useEffect } from 'react';
import axios from 'axios';
import useProjectsStore from '../store/projectStore';

function Projects() {
  const { getProjects, projects, dueDateFilter, setDueDateFilter } = useProjectsStore();

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const createProject = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/projects', {
        name,
        description,
        due_date: dueDate,
      });

      // Clear the form fields
      setName('');
      setDescription('');
      setDueDate('');

      // Refetch the project list after successful creation
      getProjects();
    } catch (err) {
      console.error('Error in POST request:', err);
    }
  };

  // on component mounted get categories
  useEffect(() => {
    getProjects();
  }, []);

  // on value change of dueDateFilter - refetch projects with dueDateFilter value
  useEffect(
    () => {
      getProjects()
    },
    [dueDateFilter],
  );

  return (
    <>
      <h2>------------ Projects List ------------</h2>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="dueDate">Filter table by Due Date: </label>
        <input
          type="date"
          id="dueDateFilter"
          value={dueDateFilter}
          onChange={(e) => setDueDateFilter(e.target.value)}
          required
          style={{ padding: '5px', marginLeft: '10px' }}
        />
      </div>

      <button onClick={() => setDueDateFilter('')} type='text'>Clear Filter</button>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Description</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Due Date</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Created At</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{project.id}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{project.name}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{project.description}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{project.due_date}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                {project.created_at ? project.created_at.substring(0, 10) : 'N/A'}
              </td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                {project.updated_at ? project.updated_at.substring(0, 10) : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Create Project</h3>
      <form onSubmit={createProject} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ padding: '5px', marginLeft: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ padding: '5px', marginLeft: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="dueDate">Due Date: </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            style={{ padding: '5px', marginLeft: '10px' }}
          />
        </div>
        <button type="submit" style={{ padding: '8px 12px' }}>
          Create Project
        </button>
      </form>
    </>
  );
}

export default Projects;
