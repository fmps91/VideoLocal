import { create } from 'zustand';
import {post} from '../api/axios';

const videoStore = create((set) => ({
  videos: null,
  //token: null,
  loading: false,
  error: null,

  list: async (name) => {
    set({ loading: true, error: null });
    try {
      const response = await post('/api/video/filter', { name },
      {
        withCredentials: true,  // 🔥 Esto es clave para enviar/recibir cookies
      });

      console.log("response: ",response)
      // Asumiendo que el backend devuelve { user, token }
      set({ 
        videos: response.data.videos, 
        //token: response.data.token, 
        loading: false 
      });

    } catch (err) {
      set({ 
        error: err.response?.data?.message || 'Error al iniciar sesión',
        loading: false 
      });
    }
  },

  equal: () => {
    set({ videos: null });
  }
}));

export default videoStore;