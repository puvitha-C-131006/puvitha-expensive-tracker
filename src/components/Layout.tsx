import React from "react";
import { Sidebar } from "./Sidebar";
import { MadeWithDyad } from "./made-with-dyad";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar />
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-semibold">Expense Tracker</h1>
        </header>
        <main className="flex-1 p-4 md:p-6 space-y-6">
          {children}
        </main>
        <MadeWithDyad />
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="flex min-h-screen">
      {/* Sidebar (Fixed width on desktop) */}
      <aside className="w-64 flex-shrink-0 border-r bg-sidebar">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-8 space-y-6">
          {children}
        </main>
        <MadeWithDyad />
      </div>
    </div>
  );
};