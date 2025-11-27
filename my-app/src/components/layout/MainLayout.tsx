import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ThemeButton from "../ThemeButton/ThemeButton";

const MainLayout: React.FC<{ children: React.ReactNode; is404?: boolean }> = ({
  children,
  is404 = false,
}) => (
  <div className="app-dark-bg flex flex-col min-h-screen">
    {!is404 && <Header />}

    <main className="flex-1 flex relative z-10 justify-center items-center">
      {children}
    </main>

    {!is404 && <Footer />}

    {!is404 && (
      <div className="fixed bottom-10 right-4 z-10 mb:bottom-15">
        <ThemeButton />
      </div>
    )}
  </div>
);
export default MainLayout;
