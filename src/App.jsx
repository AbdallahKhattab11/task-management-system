import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CreateAccount from "./components/Authentication/CreateAccount";
import Login from "./components/Authentication/Login";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import CreateWorkSpace from "./components/sections/CreateWorkSpace";
import MySpace from "./pages/MySpace";
import ProtectedRoutes from "./components/Authentication/ProtectedRoutes";

function App() {
  return (
    <main className="App">
      <Router>
        <Routes>
          <Route path="/" element={<CreateAccount />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route
            path="/create-workspace"
            element={
              <ProtectedRoutes>
                {" "}
                <CreateWorkSpace />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/my-space"
            element={
              <ProtectedRoutes>
                {" "}
                <MySpace />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
