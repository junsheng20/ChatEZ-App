import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SetDisplayName from "./pages/SetDisplayName";
import AuthPage from "./pages/AuthPage";
import { AuthProvider } from "./components/AuthProvider";
import HomePage from "./pages/Home";
import store from "./store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/setDisplay" element={<SetDisplayName />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  );
}
