
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/70 backdrop-blur-sm border-b border-border sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-rfp-blue to-rfp-teal rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <span className="font-bold text-xl text-rfp-blue hidden sm:inline">RFP IntelliCheck</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-6">
            <Link to="/" className="nav-link font-medium">Home</Link>
            <Link to="/features" className="nav-link font-medium">Features</Link>
            <Link to="/pricing" className="nav-link font-medium">Pricing</Link>
            <Link to="/about" className="nav-link font-medium">About</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/" className="nav-link font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/features" className="nav-link font-medium" onClick={() => setIsMenuOpen(false)}>Features</Link>
            <Link to="/pricing" className="nav-link font-medium" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
            <Link to="/about" className="nav-link font-medium" onClick={() => setIsMenuOpen(false)}>About</Link>
            
            <div className="flex flex-col space-y-2 pt-2 border-t border-border">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
