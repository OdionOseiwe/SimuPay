import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const HOST_URL = import.meta.env.VITE_NODE_ENV as string;

// -------------------------------
// 📘 Interfaces & Types
// -------------------------------
interface WalletState {
  balance: number;
  loading: boolean;
  error: string | null;
  successMsg: string | null;

  // Actions
  getWalletBalance: () => Promise<void>;
  mockMoney: (amount: number) => Promise<void>;
  transferToWallet: (data: TransferData) => Promise<void>;
  withdrawFromWallet: (data: WithdrawData) => Promise<void>;
}

interface TransferData {
  userName: string;
  amount: number;
}

interface WithdrawData {
  amount: number;
  bankName: string;
  accountName: string;
  accountNumber: string;
  description: string;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  balance: 0,
  loading: false,
  error: null,
  successMsg: null,

  // ✅ Fetch Wallet Balance
  getWalletBalance: async () => {
    try {
      set({ loading: true, error: null });
      const res = await axios.get(
        `${HOST_URL}/wallet/balance`
      );
      set({ balance: res.data.balance, loading: false });
    } catch (err: any) {
      console.error("Error fetching wallet balance:", err);
      set({
        error: err.response?.data?.msg || "Failed to get balance",
        loading: false,
      });
    }
  },

  // ✅ Mock Money
  mockMoney: async (amount) => {
    try {
      set({ loading: true, error: null, successMsg: null });
      const res = await axios.post(
        `${HOST_URL}/wallet/mock-money`,
        { amount }
      );
      set({
        balance: res.data.balance,
        loading: false,
        successMsg: "Money added successfully",
      });
    } catch (err: any) {
      console.error("Error mocking money:", err);
      set({
        error: err.response?.data?.msg || "Failed to add money",
        loading: false,
      });
    }
  },

  // ✅ Transfer to Another Wallet
  transferToWallet: async ({ userName, amount }) => {
    try {
      set({ loading: true, error: null, successMsg: null });
      const res = await axios.post(
        `${HOST_URL}/wallet/transfer`,
        { userName, amount }
      );
      set({
        balance: res.data.balance,
        loading: false,
        successMsg: "Transfer successful",
      });
    } catch (err: any) {
      console.error("Error transferring money:", err);
      set({
        error: err.response?.data?.msg || "Transfer failed",
        loading: false,
      });
    }
  },

  // ✅ Withdraw from Wallet
  withdrawFromWallet: async ({
    amount,
    bankName,
    accountName,
    accountNumber,
    description,
  })=> {
    try {
      set({ loading: true, error: null, successMsg: null });
      const res = await axios.post(
        `${HOST_URL}/wallet/withdraw`,
        {
          amount,
          bankName,
          accountName,
          accountNumber,
          description,
        }
      );
      set({
        balance: res.data.balance,
        loading: false,
        successMsg: "Withdrawal successful",
      });
    } catch (err: any) {
      console.error("Error withdrawing money:", err);
      set({
        error: err.response?.data?.msg || "Withdrawal failed",
        loading: false,
      });
    }
  }
}));
