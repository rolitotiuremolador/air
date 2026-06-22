// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./pages/ProtectedRoute";
import Landing from "./pages/Landing";

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Home Route */}
        <Route path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* Public Route  */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/landing" element={<Landing />} />
        {/* Fallback  */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
