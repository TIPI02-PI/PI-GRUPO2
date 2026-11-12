
import { Routes, Route, Navigate } from "react-router-dom";

import LoginScreen from "./pages/Login";
import LumioAdminAccess from "./pages/LumioAdminAccess";
// import Dashboard from "./pages/Dashboard";
// import Cadastro from "./pages/Cadastro";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/admin" element={<LumioAdminAccess />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      {/* <Route path="/cadastro" element={<Cadastro />} /> */}
    </Routes>
  );
}

export default App;