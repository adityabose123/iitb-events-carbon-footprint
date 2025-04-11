
import React from "react";
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-iitb-light">
      <header className="bg-iitb-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6" />
            <h1 className="text-xl font-bold">IITB Events Emissions Calculator</h1>
          </Link>
        </div>
      </header>
      <main className="container mx-auto py-6 px-4 min-h-[calc(100vh-140px)]">
        {children}
      </main>
      <footer className="bg-iitb-primary text-white p-4">
        <div className="container mx-auto text-center">
          <p>© 2025 IITB Events Emissions Calculator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
