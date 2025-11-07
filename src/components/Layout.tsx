import React from "react";
import { Sidebar } from "./Sidebar";
import { MadeWithDyad } from "./made-with-dyad";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex flex-col">
        {/* Mobile Header/Sidebar Trigger */}
        {isMobile && (
          <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col bg-sidebar p-0 w-64">
                <Sidebar />
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </header>
        )}

        {/* Main Content */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>

        {/* Footer */}
        <MadeWithDyad />
      </div>
    </div>
  );
};