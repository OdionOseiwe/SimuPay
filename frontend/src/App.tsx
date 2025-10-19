import HomePage from "./Pages/HomePage"
import SignUpPage from "./Pages/SignUpPage"
import LoginPage from "./Pages/LoginPage"
import VerifyEmailPage from "./Pages/VerifyEmailPage"
import DashboardPage from "./Pages/DashboardPage"
import PaymentLinkspage from "./Pages/PaymentLinkspage"
import TransactionsPage from "./Pages/TransactionsPage"
import WalletPage from "./Pages/WalletPage"
import PaymentPage from "./Pages/PaymentPage"
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>    
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/dashboard" element={<DashboardPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/verify-email" element={<VerifyEmailPage/>}/>
        <Route path="/links" element={<PaymentLinkspage/>}/>
        <Route path="/transactions" element={<TransactionsPage/>}/>
        <Route path="/wallet" element={<WalletPage/>}/>
        <Route path="/pay/:paymentRef" element={<PaymentPage/>}/>
      </Routes>  
      <Toaster />
    </>
  )
}

export default App
