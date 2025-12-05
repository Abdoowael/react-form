import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./pages/Form";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Hello from "./pages/Hello";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/hello" element={<Hello />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
