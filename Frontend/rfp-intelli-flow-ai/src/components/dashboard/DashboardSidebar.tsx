// src/components/dashboard/DashboardSidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  FileUp,
  BarChart,
  Settings,
  Users,
  Clock,
  HelpCircle,
} from "lucide-react";

interface NavItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Upload RFP",
    icon: FileUp,
    href: "/dashboard/upload",
  },
  {
    title: "Reports",
    icon: BarChart,
    href: "/dashboard/reports",
  },
  {
    title: "History",
    icon: Clock,
    href: "/dashboard/history",
  },
  {
    title: "Team",
    icon: Users,
    href: "/dashboard/team",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
  {
    title: "Help & Support",
    icon: HelpCircle,
    href: "/dashboard/help",
  },
];

interface DashboardSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  activeTab: string; // Add activeTab prop
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ 
  isOpen, 
  toggleSidebar,
  activeTab 
}) => {
  return (
    <aside
      className={`bg-sidebar fixed top-0 left-0 h-full z-30 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 h-16 flex items-center border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-white/20 to-white/10 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-bold text-lg text-white">IntelliCheck</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive || activeTab === item.title.toLowerCase()
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="bg-sidebar-accent/50 rounded-md p-4">
            <div className="text-sm text-sidebar-foreground/80 mb-2">
              Need assistance?
            </div>
            <a
              href="#"
              className="text-sm text-sidebar-primary font-medium hover:underline"
            >
              Contact support
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;