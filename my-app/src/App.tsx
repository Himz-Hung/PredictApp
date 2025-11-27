import { useEffect } from "react";
import "./App.scss";
import { ToastProvider } from "./components/Toast/ToastProvider";
import AppRoutes from "./routes";

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.add(savedTheme);
  }, []);
  return (
    <>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </>
  );
}

export default App;
