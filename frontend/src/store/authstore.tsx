import { create } from "zustand";
import axios from "axios";

const HOST_URL =
  import.meta.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/user"
    : "/api/auth";

axios.defaults.withCredentials = true;

// 🧩 Type for user (you can expand this later)
type User = {
  id: string;
  email: string;
  name: string;
} | null;

// 🧩 Store type
type AuthStore = {
  user: User | any;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  message: string | null;

  // Actions
  signUp: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  verifyEmail:(code:string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  // 🟩 Sign Up
  signUp: async (email, password, BusinessName) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`http://localhost:5000/simupay/api/user/signup`, {
        email,
        password,
        BusinessName,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    console.log(response);
    
    } catch (error: any) {
      set({
        error: error|| "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async(code) =>{
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${HOST_URL}/verify-email`, { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error:any) {
      set({
        error: error|| "Error  verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  // 🟩 Login
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${HOST_URL}/login`, { email, password });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.msg || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  // 🟩 Logout
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${HOST_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  // 🟩 Check Auth
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${HOST_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.msg || "Error checking auth",
        isCheckingAuth: false,
      });
    }
  },
}));
