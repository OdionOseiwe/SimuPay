import HomePage from "./Pages/HomePage"
import SignUpPage from "./Pages/SignUpPage"
import LoginPage from "./Pages/LoginPage"
import VerifyEmailPage from "./Pages/VerifyEmailPage"
import DashboardPage from "./Pages/DashboardPage"
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>    
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/verify-email" element={<VerifyEmailPage/>}/>
        <Route path="/dashboard" element={<VerifyEmailPage/>}/>
      </Routes>  
      <Toaster />
    </>
  )
}

export default App
