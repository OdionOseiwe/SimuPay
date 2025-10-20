import HomePage from "./Pages/HomePage"
import SignUpPage from "./Pages/SignUpPage"
import LoginPage from "./Pages/LoginPage"
import VerifyEmailPage from "./Pages/VerifyEmailPage"
import DashboardPage from "./Pages/DashboardPage"
import PaymentLinkspage from "./Pages/PaymentLinkspage"
import TransactionsPage from "./Pages/TransactionsPage"
import WalletPage from "./Pages/WalletPage"
import PaymentPage from "./Pages/PaymentPage"
import {useAuthStore,} from './store/authstore'
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const ProtectedRoutes = ({children}: { children: any })=>{
  const {isAuthenticated, user} = useAuthStore();

  if(!user?.isverified){
    <Navigate to = '/verify-email' replace/>;
  }
  if(!isAuthenticated){
    <Navigate to= "/login" replace />;
  }
  return children
}

const RedirectAuthenticateduser =({children}:{children:any}) =>{
  const {isAuthenticated, user} = useAuthStore();

  if(isAuthenticated && user?.isverified){
    <Navigate to= "/dashboard" replace />;
  }

  return children
}


function App() {
  return (
    <>    
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        
        <Route path="/signup" element={
          <RedirectAuthenticateduser>
            <SignUpPage/>
          </RedirectAuthenticateduser>
        }/>
        <Route path="/login" element={
          <RedirectAuthenticateduser>
            <LoginPage/>
          </RedirectAuthenticateduser>
        }/>
        <Route path="/verify-email" element={
          <RedirectAuthenticateduser>
            <VerifyEmailPage/>
          </RedirectAuthenticateduser>
        }/>

        <Route path="/dashboard" element={
          <ProtectedRoutes>
            <DashboardPage/>
          </ProtectedRoutes>
        }/>

        <Route path="/links" element={
          <ProtectedRoutes>
            <PaymentLinkspage/>
          </ProtectedRoutes>}
        />

        <Route path="/transactions" element={
          <ProtectedRoutes>
            <TransactionsPage/>
          </ProtectedRoutes>}
        />

        <Route path="/wallet" element={
          <ProtectedRoutes>
            <WalletPage/>
          </ProtectedRoutes>}
        />

        <Route path="/pay/:paymentRef" element={
          <ProtectedRoutes>
            <PaymentPage/>
          </ProtectedRoutes>}
        />

      </Routes>  
      <Toaster />
    </>
  )
}

export default App
