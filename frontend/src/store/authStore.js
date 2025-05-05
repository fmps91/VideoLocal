import { create } from 'zustand';
import {post} from '../api/axios';

const useAuthStore = create((set) => ({
  user: null,
  data: null,
  //token: null,
  loading: false,
  error: null,

  login: async (username, password) => {
    set({ loading: true, error: null });
    try {
      const response = await post('/api/auth/login', { username, password },
      {
        withCredentials: true,  // 🔥 Esto es clave para enviar/recibir cookies
      });

      console.log("response: ",response)
      // Asumiendo que el backend devuelve { user, token }
      set({ 
        user: response.data.user, 
        data: response.data,
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

  logout: () => {
    set({ user: null });
  }
})
,
  {
    name: 'auth-storage', // nombre en localStorage
    partialize: (state) => ({ user: state.user, data: state.data }), // qué guardar
  }
);

export default useAuthStore;