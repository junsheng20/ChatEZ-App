import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SetDisplayName from "./pages/SetDisplayName";
import AuthPage from "./pages/AuthPage";
import { AuthProvider } from "./components/AuthProvider";
import HomePage from "./pages/Home";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/setDisplay" element={<SetDisplayName />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
