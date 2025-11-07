import { cn } from "@/lib/utils";
import { Home, DollarSign, Settings, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: Home,
  },
  {
    name: "Expenses",
    path: "/expenses",
    icon: DollarSign,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

const NavItem = ({ item }: { item: typeof navItems[0] }) => (
  <NavLink
    to={item.path}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isActive
          ? "bg-sidebar-primary text-sidebar-primary-foreground"
          : "text-sidebar-foreground",
      )
    }
  >
    <item.icon className="h-5 w-5" />
    {item.name}
  </NavLink>
);

const SidebarContent = () => (
  <nav className="grid items-start gap-2 px-2 text-sm font-medium lg:px-4">
    <div className="p-2 text-lg font-semibold text-sidebar-primary">
      Expense Manager
    </div>
    <Separator className="mb-2 bg-sidebar-border" />
    {navItems.map((item) => (
      <NavItem key={item.path} item={item} />
    ))}
  </nav>
);

export const Sidebar = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col bg-sidebar p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="hidden border-r bg-sidebar lg:block h-full">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <span className="text-xl font-semibold text-sidebar-primary">
            Expense Manager
          </span>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <SidebarContent />
        </div>
      </div>
    </div>
  );
};