import { useState, useEffect } from 'react';
import axios from 'axios';
import useCategoriesStore from '../store/categoryStore';

function Categories() {
  const { getCategories, categories } = useCategoriesStore();

  // Form state
  const [name, setName] = useState('');

  // Create new category
  const createCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/categories', {
        name,
      });

      // Clear the form fields
      setName('');

      // Refetch the category list after successful creation
      getCategories();
    } catch (err) {
      console.error('Error in POST request:', err);
    }
  };

  // on component mounted get categories
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <h2>------------ Categories List ------------</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Created At</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{category.id}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{category.name}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                {category.created_at ? category.created_at.substring(0, 10) : 'N/A'}
              </td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                {category.updated_at ? category.updated_at.substring(0, 10) : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Create Category</h3>
      <form onSubmit={createCategory} style={{ marginTop: '20px' }}>
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
        <button type="submit" style={{ padding: '8px 12px' }}>
          Create Category
        </button>
      </form>
    </>
  );
}

export default Categories;
