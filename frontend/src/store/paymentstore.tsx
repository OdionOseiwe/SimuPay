import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const HOST_URL = import.meta.env.VITE_NODE_ENV;

type PaymentType ={
    creatorId:string,
    walletId:string,
    paymentName:string,
    minimumAmountForPayment:number,
    paymentDescription:string,
    paymentLink: string,
    paymentRef:string
}

type paymentStore ={
    isGetingLinks: Boolean,
    isCreatingLinks:Boolean,
    links:PaymentType[] | null,
    createPaymentLink: ( paymentName:string,minimumAmountForPayment:number,paymentDescription:string) => Promise<void>
    getAllPaymentLinks: () => Promise<void>
}

export const usePaymentStore = create<paymentStore>((set) => ({
    isGetingLinks: false,
    isCreatingLinks:false,
    links:null,

    // ✅ create payment link
    createPaymentLink: async(paymentName,  minimumAmountForPayment, paymentDescription) =>{
        set({isCreatingLinks:true});
        try {
            const response = await axios.post(`${HOST_URL}/payment-link`, {
                paymentName,  minimumAmountForPayment, paymentDescription
            })
            set({isCreatingLinks:false});
            console.log(response);
        } catch (error) {
            console.log("error creating link",error);
            set({isCreatingLinks:false});
            throw error;
        }
    },

    // ✅ get all payment links
    getAllPaymentLinks: async()=>{
        set({isGetingLinks:true});
        try {
            const response = await axios.get(`${HOST_URL}/all-links`)
            set({isGetingLinks:false, links:response.data.msg});
        } catch (error) {
            console.log("error getting links",error);
            set({isGetingLinks:false})
        }
    }
}))
