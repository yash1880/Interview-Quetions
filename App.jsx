import { BrowserRouter, Routes, Route } from "react-router-dom";
import EcommerceDashboard from "./pages/Dashboard.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EcommerceDashboard />} />
        <Route path="/dashboard-02" element={<EcommerceDashboard />} />
        <Route path="*" element={<EcommerceDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}