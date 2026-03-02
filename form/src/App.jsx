import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

// New Flow
import Step1Welcome from "./pages/Step1Welcome";
import Step2Symptoms from "./pages/Step2Symptoms";
import Step3Conditions from "./pages/Step3Conditions";
import Step4Result from "./pages/Step4Result";
import Step5Details from "./pages/Step5Details";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* New 5-Step Flow */}
        <Route path="/step1" element={<Step1Welcome />} />
        <Route path="/step2" element={<Step2Symptoms />} />
        <Route path="/step3" element={<Step3Conditions />} />
        <Route path="/step4" element={<Step4Result />} />
        <Route path="/step5" element={<Step5Details />} />

        {/* Catch-all redirect */}
        <Route path="/form" element={<Navigate to="/register" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
