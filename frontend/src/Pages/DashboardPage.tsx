import { useState } from "react";
import SideNav from "../layout/SideNav";
import { CreditCard, ReceiptText, Receipt } from "lucide-react";
import CreatePaymentLink from "../Modals/CreatePaymentLink";

function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);
        console.log("set",setIsOpen, "close", isOpen);

  const payments = [
    {
      image: CreditCard,
      title: "Receive payment",
      message:
        "Create a payment link in just a few clicks and share the link with your customers no code required.",
      button: "create payment link",
    },
    {
      image: ReceiptText,
      title: "Create and send invoices",
      message:
        "Create and send professional invoices easily, get paid and track payment with SimuPay invoicing.",
      button: "coming soon...",
    },
    {
      image: Receipt,
      title: "Start selling online",
      message:
        "Create a free online store that helps you find customers and accept payments from anyone.",
      button: "coming soon...",
    },
  ];

  return (
    <div className="flex z-1 relative">
      <SideNav />

      <div className="grid grid-cols-3 px-10 gap-4 items-center">
        {payments.map((payment, index) => (
          <div
            key={index}
            className="w-70 h-70  border border-gray-100 p-4 rounded-lg shadow-lg"
          >
            <payment.image className="text-red-600" />
            <p className="my-3 font-semibold">{payment.title}</p>
            <p className="text-gray-400 my-3">{payment.message}</p>
            <button
              onClick={() =>
                payment.button === "create payment link" ? setIsOpen(true) : null
              }
              className="cursor-pointer border-1 rounded-xs p-1 w-full"
            >
              {payment.button}
            </button>
          </div>
        ))}
      </div>

      { isOpen && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
          <CreatePaymentLink isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
