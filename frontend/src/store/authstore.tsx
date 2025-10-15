import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const HOST_URL = import.meta.env.VITE_NODE_ENV;

// 🧩 Type for user (you can expand this later)
type User = {
  id: string;
  email: string;
  name: string;
} | null;

// 🧩 Store type
type AuthStore = {
  user: User | any;
  email:string, //for resend-code 
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  message: string | null;

  // Actions
  signUp: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  verifyEmail:(code:string) => Promise<void>;
  resendVerificationCode:(email:string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  email:'',
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  // 🟩 Sign Up
  signUp: async (email, password, BusinessName) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${HOST_URL}/user/signup`, {
        email,
        password,
        BusinessName,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        email:email, //to be used in resend-verification code email component
      });    
    } catch (error: any) {
      set({
        error: error.response?.data?.msg || error.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async(code) =>{
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${HOST_URL}/user/verify-email`, { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error:any) {
      set({
        error: error.response?.data?.msg || error.message || "Error  verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  resendVerificationCode: async(email)=>{
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${HOST_URL}/user/resend-verification-code`, { email });
      set({
        user: response.data,
        isLoading: false,
      });
    } catch (error:any) {
      set({
        error: error.response?.data?.msg || error.message || "Error resending code",
        isLoading: false,
      });
      throw error;
    }
  },

  // 🟩 Login
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${HOST_URL}/user/login`, { email, password });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.msg || error.message  || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  // 🟩 Logout
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${HOST_URL}/userlogout`);
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
      const response = await axios.get(`${HOST_URL}/user/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.msg || error.message  || "Error checking auth",
        isCheckingAuth: false,
      });
    }
  },
}));
