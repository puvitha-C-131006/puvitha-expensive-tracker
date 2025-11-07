import React from "react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t bg-background py-4 mt-8">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>
          &copy; {currentYear} HOME EXPENSIVE TRACKER. All Rights Reserved.
        </p>
        <p className="mt-1">
          Developed by Puvitha C
        </p>
      </div>
    </footer>
  );
};