import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { loginThunk } from "../../features/authThunk";
import { useToast } from "../../hooks/useContextHook";

export default function useLoginPageHook() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    document.title = "Phatify-Login Page";
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/nba-report", { replace: true });
  }, [navigate]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { showToast } = useToast();
  const mess = location.state?.message;
  const validateForm = (): boolean => {
    if (!username.trim() || !password.trim()) {
      setError("Username and password cannot be left blank.");
      setLoading(false);
      return false;
    }
    setError(null);
    return true;
  };
  useEffect(() => {
    if (mess === "EXP-JWT") {
      showToast({
        title: "Session Expired",
        message: "Your session has expired. Please login again.",
        type: "error",
      });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.pathname, mess, navigate, showToast]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!validateForm()) return;

    try {
      const result = await dispatch(loginThunk({ username, password }));

      if (loginThunk.fulfilled.match(result)) {
        navigate("/nba-report", { replace: true });
      } else {
        setLoading(false);
        setError(result.payload as string);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError("Login failed. Please try again.");
    }
  };

  const state = {
    username,
    password,
    error,
    loading,
  };

  const handler = {
    setUsername,
    setPassword,
    handleSubmit,
  };

  return { state, handler };
}
