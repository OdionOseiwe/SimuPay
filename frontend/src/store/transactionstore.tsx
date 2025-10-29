import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const HOST_URL = import.meta.env.VITE_NODE_ENV as string;

// -------------------------------
// 📘 Interfaces & Types
// -------------------------------
export interface Transaction {
  _id: string;
  fromEmail: string;
  from: string;
  to: string;
  receiverWalletId: string;
  amount: number;
  paymentName: string;
  paymentRef: string;
  transactionType: "credit" | "debit";
  reference: string;
  createdAt: string;
}

interface PayWithLinkData {
  fromEmail: string;
  from: string;
  amount: number;
  paymentRef: any;
}

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  successMsg: string | null;

  // Actions
  getAllTransactions: () => Promise<void>;
  getUserTransactions: () => Promise<void>;
  getTransactionsByPaymentLink: (paymentRef: string) => Promise<void>;
  getTransactionByReference: (reference: string) => Promise<void>;
  payWithPaymentLink: (data: PayWithLinkData) => Promise<void>;
}

// -------------------------------
// 💰 Zustand Store Implementation
// -------------------------------
export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  loading: false,
  error: null,
  successMsg: null,

  // ✅ Fetch all transactions
  getAllTransactions: async () => {
    try {
      set({ loading: true, error: null });
      const res = await axios.get(
        `${HOST_URL}/transactions`
      );
      set({ transactions: res.data.txns, loading: false });
    } catch (err: any) {
      console.error("Error fetching transactions:", err);
      set({
        error: "Failed to fetch transactions",
        loading: false,
      });
      throw err
    }
  },

  // ✅ Fetch transactions by logged-in user
  getUserTransactions: async () => {
    try {
       set({ loading: true, error: null });
      const res = await axios.get(
        `${HOST_URL}/transactions/user`
      );
      set({ transactions: res.data.txns, loading: false });
    } catch (err: any) {
      console.error("Error fetching user transactions:", err);
      set({
        error: "Failed to fetch user transactions",
        loading: false,
      });
      throw err
    }
  },

  // ✅ Fetch transactions by payment link reference
  getTransactionsByPaymentLink: async (paymentRef: string) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.get(
        `${HOST_URL}/transactions/by-payment-link`,
        { params: { paymentRef } }
      );
      set({ transactions: res.data.txns, loading: false });
    } catch (err: any) {
      console.error("Error fetching transactions by payment link:", err);
      set({
        error:"Failed to fetch transactions for this payment link",
        loading: false,
      });
      throw err
    }
  },

  // ✅ Fetch transaction by unique reference
  getTransactionByReference: async (reference: string) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.post<{ success: boolean; msg: Transaction }>(
        `${HOST_URL}/transactions/reference`,
        { reference }
      );
      set({
        transactions: [res.data.msg],
        loading: false,
        successMsg: "Transaction fetched successfully",
      });
    } catch (err: any) {
      console.error("Error fetching transaction by reference:", err);
      set({
        error:"Failed to fetch transaction by reference",
        loading: false,
      });
      throw err
    }
  },

  // ✅ Handle payment with payment link
  payWithPaymentLink: async ({
    fromEmail,
    from,
    amount,
    paymentRef,
  }: PayWithLinkData) => {
    try {
      set({ loading: true, error: null, successMsg: null });
      const res = await axios.post(`${HOST_URL}/pay/${paymentRef}`, {
        fromEmail, 
        from, 
        amount
      });

      set( ({
        loading: false,
        successMsg: res.data.msg || "Payment successful",
      }));
    } catch (err: any) {
      console.error("Error paying with payment link:", err);
      set({
        error:  "Payment failed",
        loading: false,
      });
      throw err
    }
  },

}));
