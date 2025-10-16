import { BrowserRouter, Routes, Route } from "react-router-dom";
import NBAReportPage from "../pages/NBAReportPage/NBAReportPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFound from "../pages/NotFound";
import MainLayout from "../components/layout/MainLayout";
import PrivateRoute from "./PrivateRoute"; // ✅ import component vừa tạo
import AdminPage from "../pages/AdminPage/AdminPage";
import MLBReportPage from "../pages/MLBReportPage/MLBReportPage";
import NFLReportPage from "../pages/NFLReportPage/NFLReportPage";

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
          path="/mlb-Report"
          element={
            <PrivateRoute>
              <MainLayout>
                <MLBReportPage />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/nfl-Report"
          element={
            <PrivateRoute>
              <MainLayout>
                <NFLReportPage />
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
            <PrivateRoute>
             <MainLayout is404={true}>
              <NotFound />
            </MainLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
