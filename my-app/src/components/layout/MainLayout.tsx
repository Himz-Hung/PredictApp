import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const MainLayout: React.FC<{ children: React.ReactNode , is404?: boolean}> = ({ children,is404 = false }) => (
  <div className="app-dark-bg flex flex-col min-h-screen">
    {!is404 && <Header />}
    <main className="flex-1 flex relative z-10 justify-center items-center">{children}</main>
    {!is404 && <Footer />}
  </div>
);

export default MainLayout;
