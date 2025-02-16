import { create } from 'zustand';
import axios from 'axios';

const useProjectsStore = create((set, get) => ({
  projects: [],

  // Filter by due data
  dueDateFilter: '',
  setDueDateFilter: (value) => {
    set({ dueDateFilter: value });
  },

  // Fetch projects
  getProjects: async () => {
    try {
      const dueDateFilterValue =  get().dueDateFilter;
      const apiUrl = dueDateFilterValue ?  `projects/filter?due_date=${dueDateFilterValue}` : 'projects'

      const response = await axios.get(`http://127.0.0.1:8000/api/${apiUrl}`);
      set({ projects: response.data });
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }
}));

export default useProjectsStore;
