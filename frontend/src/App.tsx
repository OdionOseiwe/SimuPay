import HomePage from "./Pages/HomePage"
import SignUpPage from "./Pages/SignUpPage"
import LoginPage from "./Pages/LoginPage"
import VerifyEmailPage from "./Pages/VerifyEmailPage"
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>    
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/verify-" element={<VerifyEmailPage/>}/>
      </Routes>  
    </>
  )
}

export default App
