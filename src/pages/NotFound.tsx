
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/ui-custom/Button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] py-16">
        <h1 className="text-7xl font-bold mb-6">404</h1>
        <p className="text-xl text-foreground/80 mb-8 max-w-md text-center">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button 
            className="rounded-full px-6"
            icon={<ArrowLeft className="h-4 w-4" />}
          >
            Return to Home
          </Button>
        </Link>
      </div>
    </MainLayout>
  );
};

export default NotFound;
