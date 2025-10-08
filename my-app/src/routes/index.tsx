import { BrowserRouter, Routes, Route } from "react-router-dom";
import NBAReportPage from "../pages/NBAReportPage/NBAReportPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFound from "../pages/NotFound";
import MainLayout from "../components/layout/MainLayout";
import PrivateRoute from "./PrivateRoute"; // ✅ import component vừa tạo
import AdminPage from "../pages/AdminPage/AdminPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/nba-Report"
          element={
            <PrivateRoute>
              <MainLayout>
                <NBAReportPage />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <MainLayout>
                <AdminPage />
              </MainLayout>
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="*"
          element={
            <MainLayout is404={true}>
              <NotFound />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
