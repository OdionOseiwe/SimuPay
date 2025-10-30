import { useState } from "react";
import SideNav from "../layout/SideNav";
import { CreditCard, ReceiptText, Receipt,Menu} from "lucide-react";
import CreatePaymentLink from "../Modals/CreatePaymentLink";

function DashboardPage() {
  const [isOpenCreateLinkModal, setIsOpenCreateLinkModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // for mobile toggle

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
    <div className="flex z-1 relative min-h-screen">
      <div className="md:hidden py-4 pl-2" 
          onClick={() => setIsSidebarOpen(true)}>
        <Menu size={30} color="red"  />
      </div>
      <SideNav
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
        {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  px-4 md:px-5 py-10 md:py-0 gap-4 items-center">
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
                payment.button === "create payment link" ? setIsOpenCreateLinkModal(true) : null
              }
              className="cursor-pointer border-1 rounded-xs p-1 w-full"
            >
              {payment.button}
            </button>
          </div>
        ))}
      </div>

      { isOpenCreateLinkModal && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
          <CreatePaymentLink isOpenCreateLinkModal={isOpenCreateLinkModal} setIsOpenCreateLinkModal={setIsOpenCreateLinkModal} />
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
