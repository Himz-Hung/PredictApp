import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { loginThunk } from "../../features/authThunk";

export default function useLoginPageHook() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/nba-report", { replace: true });
  }, [navigate]);

  // ---------- STATE ----------
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ---------- VALIDATION ----------
  const validateForm = (): boolean => {
    if (!username.trim() || !password.trim()) {
      setError("Username and password cannot be left blank.");
      return false;
    }
    setError(null);
    return true;
  };

  // ---------- HANDLER ----------
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
