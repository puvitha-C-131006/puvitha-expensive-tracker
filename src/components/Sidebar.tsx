import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, DollarSign, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/hooks/use-user-profile";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Expenses",
    href: "/expenses",
    icon: DollarSign,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const userProfile = useUserProfile(); // Use the new hook

  return (
    <div className="flex flex-col space-y-4 p-4 h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="text-2xl font-bold text-sidebar-primary-foreground mb-6 p-2">
        Expense Tracker
      </div>
      <nav className="flex flex-col space-y-1 flex-grow">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <Link key={item.name} to={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90"
                    : "hover:bg-sidebar-accent/50",
                )}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>
      
      {/* User Profile Display at the bottom */}
      <div className="p-2 border-t border-sidebar-border mt-auto">
        <div className="flex items-center text-sm text-sidebar-foreground/80">
          <User className="h-4 w-4 mr-2" />
          <span>{userProfile.name}</span>
        </div>
      </div>
    </div>
  );
};