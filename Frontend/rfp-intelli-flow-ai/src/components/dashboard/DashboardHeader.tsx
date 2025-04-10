// src/components/dashboard/DashboardHeader.tsx
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, Settings, User, Menu, X } from "lucide-react";

interface DashboardHeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  title?: string; // Add optional title prop
  description?: string;
  actions?: ReactNode; // Add optional description prop
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  toggleSidebar, 
  isSidebarOpen,
  title,
  description 
}) => {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left Side - Sidebar Toggle and Logo */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden"
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            <div className="flex flex-col">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-rfp-blue to-rfp-teal rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <span className="font-bold text-lg hidden sm:inline">RFP IntelliCheck</span>
              </Link>
              {title && <h1 className="text-sm font-medium">{title}</h1>}
              {description && <p className="text-xs text-muted-foreground">{description}</p>}
            </div>
          </div>

          {/* Right Side - Notifications and Profile */}
          <div className="flex items-center gap-2">
            {/* Notification Bell */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rfp-amber rounded-full text-[10px] text-white flex items-center justify-center">
                3
              </span>
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>

            {/* User Profile */}
            <Button
              variant="ghost"
              size="icon"
              className="w-9 h-9 rounded-full overflow-hidden border border-border"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;