import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SetDisplayName from "./pages/SetDisplayName";
import AuthPage from "./pages/AuthPage";
import { AuthProvider } from "./components/AuthProvider";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="auth" element={<AuthPage />} />
            <Route path="setDisplay" element={<SetDisplayName />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
