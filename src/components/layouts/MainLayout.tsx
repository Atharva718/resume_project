
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Footer from "@/components/sections/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const MainLayout = ({ children, fullWidth = false }: MainLayoutProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full fixed top-0 z-50 py-4 glass border-b border-border/20">
        <div className={cn("flex items-center justify-between mx-auto", 
          fullWidth ? "px-4 md:px-8" : "container"
        )}>
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <span className="text-xl font-display font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              ResumeMaster
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/" active={isActive("/")}>Home</NavLink>
            <NavLink to="/builder" active={isActive("/builder")}>Builder</NavLink>
            <NavLink to="/templates" active={isActive("/templates")}>Templates</NavLink>
            <NavLink to="/about" active={isActive("/about")}>About</NavLink>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link to="/builder">
              <Button 
                className="rounded-full px-6 py-2 h-auto shadow-sm hover:shadow-md transition-all font-medium"
                variant="default"
              >
                Create Resume
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className={cn(
        "flex-1 pt-24",
        fullWidth ? "" : "container"
      )}>
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink = ({ to, active, children }: NavLinkProps) => (
  <Link
    to={to}
    className={cn(
      "px-1 py-2 text-sm font-medium relative transition-colors duration-200",
      active 
        ? "text-foreground" 
        : "text-foreground/60 hover:text-foreground"
    )}
  >
    {children}
    {active && (
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-fade-in" />
    )}
  </Link>
);

export default MainLayout;
