import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "react-router-dom";

export const HomeHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-8 w-full">
      <Link to="/" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
        Home Expense Tracker
      </Link>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
      </div>
    </header>
  );
};