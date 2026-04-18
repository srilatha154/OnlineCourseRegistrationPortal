import { BrowserRouter, Routes, Route } from "react-router-dom";
import PortalLogin from "./components/PortalLogin";
import PortalRegister from "./components/PortalRegister";
import PortalCRUD from "./components/PortalCrud";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortalLogin />} />
        <Route path="/register" element={<PortalRegister />} />
        <Route path="/dashboard" element={<PortalCRUD />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;