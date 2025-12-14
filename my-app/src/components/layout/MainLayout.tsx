import React, { useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ThemeButton from "../ThemeButton/ThemeButton";
import BlurLayout from "../BlurComponent/BlurLayout";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchUserPackage } from "../../store/getUserPackageSlice";

const MainLayout: React.FC<{
  children: React.ReactNode;
  is404?: boolean;
  currentPage?: string;
}> = ({ children, is404 = false, currentPage = "" }) => {
  const dispatch = useAppDispatch();
  const currentPackage = useAppSelector(state => state.userPackageSlice.data);
  useEffect(() => {
    if (!currentPackage) {
      dispatch(fetchUserPackage());
    }
  }, [currentPackage, dispatch]);
  return (
    <div className="app-dark-bg flex flex-col min-h-screen">
      {!is404 && <Header />}

      <main className="flex-1 flex relative z-10 justify-center items-center">
        {children}
        <BlurLayout
          show={
            !currentPackage?.some(e => e.sports.includes(currentPage)) &&
            currentPage !== "packagePage" &&
            currentPage !== "404Page" && 
            currentPage !== "adminPage"
          }
        />
      </main>

      {!is404 && <Footer />}

      {!is404 && (
        <div className="fixed bottom-10 right-4 z-10 mb:bottom-15">
          <ThemeButton />
        </div>
      )}
    </div>
  );
};
export default MainLayout;
