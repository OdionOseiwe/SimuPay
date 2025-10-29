import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const HOST_URL = import.meta.env.VITE_NODE_ENV as string;

// -------------------------------
// 📘 Interfaces & Types
// -------------------------------
interface WalletState {
  balance: number;
  transferLoading: boolean;
  withdrawalloading: boolean;
  balanceLoading: boolean
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
  accountNumber: number;
  description: string;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  balance: 0,
  transferLoading: false,
  withdrawalloading: false,  
  balanceLoading: false,
  error: null,
  successMsg: null,

  // ✅ Fetch Wallet Balance
  getWalletBalance: async () => {
    try {
      set({ balanceLoading: true, error: null });
      const res = await axios.get(
        `${HOST_URL}/wallet/balance`
      );
      set({ balance: res.data.balance, balanceLoading: false });
    } catch (err: any) {
      console.error("Error fetching wallet balance:", err);
      set({
        error: "Failed to get balance",
        balanceLoading: false,
      });
      throw err
    }
  },

  // ✅ Mock Money
  mockMoney: async (amount) => {
    try {
      set({error: null, successMsg: null });
      const res = await axios.post(
        `${HOST_URL}/wallet/mock-money`,
        { amount }
      );
      set({
        balance: res.data.balance,
        successMsg: "Money added successfully",
      });
    } catch (err: any) {
      console.error("Error mocking money:", err);
      set({
        error:  "Failed to add money",
      });
      throw err
    }
  },

  // ✅ Transfer to Another Wallet
  transferToWallet: async ({ userName, amount }) => {
    try {
      set({ transferLoading: true, error: null, successMsg: null });
      const res = await axios.post(
        `${HOST_URL}/wallet/transfer`,
        {  amount, BusinessName:userName }
      );
      console.log("res transfer to wallet", res);

      set({
        balance: res.data.balance,
        transferLoading: false,
        successMsg: "Transfer successful",
      });
      
    } catch (err: any) {
      console.error("Error transferring money:", err);
      set({
        error: "Transfer failed",
        transferLoading: false,
      });
      throw err
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
      set({ withdrawalloading: true, error: null, successMsg: null });
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
        withdrawalloading: false,
        successMsg: "Withdrawal successful",
      });
    } catch (err: any) {
      console.error("Error withdrawing money:", err);
      set({
        error: "Withdrawal failed",
        withdrawalloading: false,
      });
      throw err
    }
  }
}));
