import { create } from 'zustand';
import axios from 'axios';

const useCategoriesStore = create((set) => ({
  categories: [],

  // Fetch categories
  getCategories: async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/categories');
      set({ categories: response.data });
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }
}));

export default useCategoriesStore;
