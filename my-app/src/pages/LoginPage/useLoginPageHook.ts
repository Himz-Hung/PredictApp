import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { loginThunk } from "../../features/authThunk";
import { useToast } from "../../hooks/useContextHook";
import axiosClient from "../../api/axiosClient";
import axios from "axios";

export default function useLoginPageHook() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    document.title = "Everwin-Login Page";
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/nba-report", { replace: true });
  }, [navigate]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { showToast } = useToast();
  const mess = location.state?.message;
  const validateForm = (): boolean => {
    if (isRegistered && password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return false;
    }
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
  const resetForm = () => {
    setUsername("");
    setPassword("");
    setError(null);
    setConfirmPassword("");
    return;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (isRegistered) {
      e.preventDefault();
      setLoading(true);
      if (!validateForm()) return;
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }
      try {
        const res = await axiosClient.post("/users", {
          username,
          plainPassword: password,
        });
        if (res.status === 200 || res.status === 201) {
          setLoading(false);
          showToast({
            title: "Registration Successful",
            message: "You have registered successfully. Please login.",
            type: "success",
          });
          setIsRegistered(false);
          resetForm();
          return;
        }
      } catch (error:unknown) {
        setLoading(false);
        if (axios.isAxiosError(error)) {
          console.log(error?.response?.data?.description || error);
          setError(
            error?.response?.data?.description ||
              "Registration failed. Please try again."
          );
          return;
        }else{
          console.log(error);
          setError("Registration failed. Please try again.");
          return;
        }
        return;
      }
    }
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
    isRegistered,
    confirmPassword,
  };

  const handler = {
    setUsername,
    setPassword,
    handleSubmit,
    setIsRegistered,
    setConfirmPassword,
    resetForm,
  };

  return { state, handler };
}
