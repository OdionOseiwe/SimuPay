import { useState } from "react";
import { X } from "lucide-react";

type formType = {
  paymentName: string;
  description: string;
  minAmount: number;
};

type typeProps = {
  isOpen: boolean;
  setIsOpen: (close: boolean) => void;
};

function CreatePaymentLink({  setIsOpen }: typeProps) {
  const [wordCount, setWordCount] = useState(0);

  const [formData, setFormData] = useState({
    paymentName: "",
    description: "",
    minAmount: "",
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

  
  return (
    <div className="inset-0 fixed z-2 bg-white">
      <div className="flex p-4 justify-between border-b border-gray-300">
        <div className="flex space-x-3 items-center">
          <button className="cursor-pointer" onClick={() =>setIsOpen(false)}>
            <X />
          </button>
          <p className="text-2xl">create payment link</p>
        </div>
        <div className="flex space-x-3 text-l">
          <button
            onClick={() => setIsOpen(false)}
            className="border-1 rounded-xs py-1 px-4 cursor-pointer"
          >
            cancel
          </button>
          <button className="bg-red-600 text-white rounded-xs py-1 px-4">
            Create Link
          </button>
        </div>
      </div>
      <div className="my-20 mx-20 flex flex-col items-center">
        <form className="flex flex-col space-y-8" action="">
          <div className="">
            <input
              className="text-gray-600 w-100 border border-gray-300  px-3 py-1 rounded-lg outline-none"
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
              className="text-gray-600 w-100 border border-gray-300  px-3 py-1 rounded-lg outline-none"
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
              rows="4"
              maxLength={50}
              value={formData.description}
              onChange={(e) => handleChange(e)}
              required
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">Words typed: {wordCount}/50</p>  
          </div>    

          <button className="bg-red-600 text-white rounded-xs py-1 px-4">
            Create Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePaymentLink;
