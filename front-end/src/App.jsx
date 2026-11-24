import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";

import VisaoGeral from "./pages/VisaoGeral";
import Usuarios from "./pages/Usuarios";
import Motoristas from "./pages/Motoristas";
import Documentos from "./pages/Documentos";
import Denuncias from "./pages/Denuncias";
import Suporte from "./pages/Suporte";
import Configuracoes from "./pages/Configuracoes";
import Monitoramento from "./pages/Monitoramento";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/visao-geral" replace />} />

      <Route element={<AdminLayout />}>
        <Route path="/visao-geral" element={<VisaoGeral />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/motoristas" element={<Motoristas />} />
        <Route path="/documentos" element={<Documentos />} />
        <Route path="/denuncias" element={<Denuncias />} />
        <Route path="/suporte" element={<Suporte />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
        <Route path="/monitoramento" element={<Monitoramento />} />
      </Route>
    </Routes>
  );
}

export default App;