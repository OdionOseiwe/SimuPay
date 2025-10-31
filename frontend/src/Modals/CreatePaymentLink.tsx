import { useState } from "react";
import { X } from "lucide-react";
import {usePaymentStore} from "../store/paymentstore"
import toast from "react-hot-toast";

type formType = {
  paymentName: string;
  description: string;
  minAmount: number;
};

type typeProps = {
  isOpenCreateLinkModal: boolean;
  setIsOpenCreateLinkModal: (close: boolean) => void;
};

function CreatePaymentLink({  setIsOpenCreateLinkModal }: typeProps) {
  const [wordCount, setWordCount] = useState(0);
  const {createPaymentLink,isCreatingLinks} = usePaymentStore();

  const [formData, setFormData] = useState<formType>({
    paymentName: "",
    description: "",
    minAmount: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Count words if it's the description textarea
    if (name === "description") {
      const words = value.trim().split(/\s+/); // split by whitespace
      const count = value.trim() === "" ? 0 : words.length;
      setWordCount(count);
    }
  };

  const handleCreatePaymentLink = async (e: React.FormEvent) =>{
    e.preventDefault();
    // Logic to create payment link goes here
    try {
      await createPaymentLink(formData.paymentName, formData.minAmount, formData.description)
      toast.success("Payment link created sucessfully");
      setIsOpenCreateLinkModal(false);
    } catch (error:any) {
      console.log(error);
      toast.error(error.response.data.msg || "Error occured while creating link");
    }
  }

  
  return (
    <div className="inset-0 fixed z-10 bg-white">
      <div className="flex p-4 justify-between border-b border-gray-300">
        <div className="flex space-x-3 items-center">
          <button className="cursor-pointer" onClick={() =>setIsOpenCreateLinkModal(false)}>
            <X />
          </button>
          <p className="text-2xl md:relative hidden">create payment link</p>
        </div>
        <div className="flex space-x-3 text-l">
          <button
            onClick={() => setIsOpenCreateLinkModal(false)}
            className="border rounded-xs py-1 px-4 cursor-pointer"
          >
            cancel
          </button>
          <button onClick={handleCreatePaymentLink} className="bg-red-600 text-white rounded-xs py-1 px-4">
            {isCreatingLinks ? "creating link" : "create link"}
          </button>
        </div>
      </div>
      <div className="my-20 mx-20 flex flex-col items-center">
        <form onSubmit={handleCreatePaymentLink} className="flex flex-col space-y-8" action="">
          <div className="">
            <input
              className="text-gray-600 md:w-100 w-75 border border-gray-300  px-3 py-1 rounded-lg outline-none"
              onChange={handleChange}
              placeholder="paymentname"
              type="text"
              value={formData.paymentName}
              name="paymentName"
              required
            />
          </div>
          <div>
            <input
              className="text-gray-600 md:w-100 w-75 border border-gray-300  px-3 py-1 rounded-lg outline-none"
              placeholder="minimum Amount"
              type="number"
              name="minAmount"
              value={formData.minAmount}
              onChange={handleChange}
              required
            />
            <p className="text-xs text-gray-600 mt-1">
              any amount inputed and above can be paid
            </p>
          </div>
          <div>
            <textarea
              className="outline-none border text-gray-600  border-gray-300  px-3 py-1 rounded-lg w-full "
              placeholder="decription"
              name="description"
              rows={4} 
              maxLength={1250}
              value={formData.description}
              onChange={handleChange}             
              required
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">Words typed: {wordCount}/50</p>  
          </div>    

          <button className="bg-red-600 text-white rounded-xs py-1 px-4">
            {isCreatingLinks ? "creating link" : "create link"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePaymentLink;
