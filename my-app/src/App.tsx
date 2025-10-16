import "./App.scss";
import {ToastProvider} from "./components/Toast/ToastProvider";
import AppRoutes from "./routes";

function App() {
  return (
    <>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </>
  );
}

export default App;
