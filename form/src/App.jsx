import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

// New Flow
import Step1Welcome from "./pages/Step1Welcome";
import Step2Symptoms from "./pages/Step2Symptoms";
import Step3Conditions from "./pages/Step3Conditions";
import Step4Result from "./pages/Step4Result";
import Step5Details from "./pages/Step5Details";

// Doctor Flow
import DoctorHome from "./pages/DoctorHome";
import DoctorList from "./pages/DoctorList";
import DoctorProfile from "./pages/DoctorProfile";
import BookAppointment from "./pages/BookAppointment";
import ChatList from "./pages/ChatList";
import AudioCall from "./pages/AudioCall";

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

        {/* Doctor Flow */}
        <Route path="/doctor" element={<DoctorHome />} />
        <Route path="/doctor/list" element={<DoctorList />} />
        <Route path="/doctor/profile/:id" element={<DoctorProfile />} />
        <Route path="/doctor/book" element={<BookAppointment />} />
        <Route path="/doctor/chat" element={<ChatList />} />
        <Route path="/doctor/call" element={<AudioCall />} />

        {/* Catch-all redirect */}
        <Route path="/form" element={<Navigate to="/register" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
