import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="app-dark-bg flex flex-col min-h-screen">
    <Header />
    <main className="flex-1 relative z-10">{children}</main>
    <Footer />
  </div>
);

export default MainLayout;
