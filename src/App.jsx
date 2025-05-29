import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import CreateAccount from "./components/Authentication/CreateAccount"
import Login from "./components/Authentication/Login"
import ForgotPassword from "./components/Authentication/ForgotPassword"
import CreateWorkSpace from "./components/sections/CreateWorkSpace"


function App() {

  return (
    <main className="App">
        <Router>
          <Routes>
            <Route path="/" element={<CreateAccount/>}/>
            <Route path="/create-account" element={<CreateAccount/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/forgot-password" element={<ForgotPassword/>}/>
            <Route path="/create-workspace" element={<CreateWorkSpace/>}/>
          </Routes>
        </Router>
        
    </main>
  )
}

export default App
