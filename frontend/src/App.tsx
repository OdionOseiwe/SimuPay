import {useEffect} from 'react'
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
import { Loader } from 'lucide-react'


const ProtectedRoutes = ({children}: { children: any })=>{
  const { isAuthenticated, user } = useAuthStore();

  if(!isAuthenticated){
    return <Navigate to= "/login" replace />;
  }

  if(!user?.isverified){
    return <Navigate to = '/verify-email' replace/>;
  }
  return children
}

const RedirectAuthenticateduser =({children}:{children:any}) =>{
  const {isAuthenticated, user} = useAuthStore();
  
  console.log(user, isAuthenticated);

  if(isAuthenticated && user.isverified){
    return <Navigate to= "/dashboard" replace />;
  }
  return children
}

function App() {
  const {checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size={50} color="red" className="animate-spin" />
      </div>
    );
  }

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
            <PaymentPage/>}
        />

      </Routes>  
      <Toaster />
    </>
  )
}

export default App
