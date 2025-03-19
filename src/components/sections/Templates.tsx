
import React from "react";
import { cn } from "@/lib/utils";
import Card from "@/components/ui-custom/Card";
import Button from "@/components/ui-custom/Button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface TemplatesProps {
  className?: string;
  limit?: number;
}

const Templates = ({ className, limit }: TemplatesProps) => {
  const templates = [
    {
      id: "classic",
      name: "Classic Professional",
      description: "A timeless template suitable for traditional industries",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=400&h=500&auto=format&fit=crop",
      category: "Professional"
    },
    {
      id: "modern",
      name: "Modern Minimalist",
      description: "Clean and contemporary design for the modern professional",
      image: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?q=80&w=400&h=500&auto=format&fit=crop",
      category: "Minimalist"
    },
    {
      id: "creative",
      name: "Creative Portfolio",
      description: "Stand out with this bold design for creative industries",
      image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=400&h=500&auto=format&fit=crop",
      category: "Creative"
    },
    {
      id: "tech",
      name: "Tech Innovator",
      description: "Modern design perfect for tech and innovation sectors",
      image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=400&h=500&auto=format&fit=crop",
      category: "Technology"
    }
  ];

  const displayedTemplates = limit ? templates.slice(0, limit) : templates;

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Premium Resume Templates
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl text-balance">
              Choose from our collection of professionally designed templates for every industry and career stage.
            </p>
          </div>
          
          {limit && (
            <Link to="/templates" className="mt-6 md:mt-0">
              <Button 
                variant="outline" 
                className="group"
              >
                View All Templates
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedTemplates.map((template) => (
            <Link 
              key={template.id}
              to={`/builder?template=${template.id}`}
              className="block"
            >
              <Card 
                className="group h-full overflow-hidden p-0 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
              >
                <div className="aspect-[3/4] overflow-hidden bg-secondary/40">
                  <img 
                    src={template.image} 
                    alt={template.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      {template.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{template.name}</h3>
                  <p className="text-sm text-foreground/70">{template.description}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Templates;
