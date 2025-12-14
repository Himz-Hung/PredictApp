import { BrowserRouter, Routes, Route } from "react-router-dom";
import NBAReportPage from "../pages/NBAReportPage/NBAReportPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFound from "../pages/NotFound";
import MainLayout from "../components/layout/MainLayout";
import PrivateRoute from "./PrivateRoute";
import AdminPage from "../pages/AdminPage/AdminPage";
import MLBReportPage from "../pages/MLBReportPage/MLBReportPage";
import NFLReportPage from "../pages/NFLReportPage/NFLReportPage";
import NHLReportPage from "../pages/NHLReportPage/NHLReportPage";
import NCAAReportPage from "../pages/NCAAReportPage/NCAAReportPage";
import PackagePage from "../pages/PackagePage/PackagePage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/prediction-packages"
          element={
            <PrivateRoute>
              <MainLayout currentPage="packagePage">
                <PackagePage />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <PrivateRoute>
              <MainLayout currentPage="packagePage">
                <PaymentPage />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/order/:orderId"
          element={
            <PrivateRoute>
              <MainLayout currentPage="packagePage">
                <PaymentPage />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/nba-Report"
          element={
            <PrivateRoute>
              <MainLayout currentPage="nba-basketball">
                <NBAReportPage />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/mlb-Report"
          element={
            <PrivateRoute>
              <MainLayout currentPage="mlb-baseball">
                <MLBReportPage />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/nfl-Report"
          element={
            <PrivateRoute>
              <MainLayout currentPage="nfl-football">
                <NFLReportPage />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/nhl-Report"
          element={
            <PrivateRoute>
              <MainLayout currentPage="nhl-hockey">
                <NHLReportPage />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/ncaa-Report"
          element={
            <PrivateRoute>
              <MainLayout currentPage="ncaa-basketball">
                <NCAAReportPage />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute isAdminRoute={true}>
              <MainLayout currentPage="adminPage">
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
              <MainLayout currentPage="404Page" is404={true}>
                <NotFound />
              </MainLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
