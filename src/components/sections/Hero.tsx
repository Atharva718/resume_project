
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui-custom/Button";
import AnimatedText from "@/components/ui-custom/AnimatedText";

interface HeroProps {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  return (
    <section className={cn("py-16 md:py-24 lg:py-32 relative", className)}>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-border/40 bg-background px-3 py-1 text-sm">
            <span className="flex items-center gap-1.5 text-foreground/80">
              {/* <Sparkles size={14} className="text-primary" /> */}
              
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
            <AnimatedText 
              text="Create Your Professional" 
              className="block text-balance" 
              tag="span"
              animationType="slide"
            />
            <AnimatedText 
              text="Resume in Minutes" 
              className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mt-2" 
              tag="span"
              delay={300}
              animationType="slide"
            />
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto text-balance animate-fade-in opacity-0" style={{ animationDelay: "500ms" }}>
            Stand out from the crowd with a professionally designed resume. 
            Let our AI enhance your content while you focus on what matters most.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center animate-fade-in opacity-0" style={{ animationDelay: "700ms" }}>
            <Link to="/builder" className="w-full sm:w-auto">
              <Button 
                className="w-full sm:w-auto rounded-full px-8 py-6 h-auto text-base sm:text-lg shadow-lg hover:shadow-xl bg-primary hover:bg-primary/90"
              >
                Start Building
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/templates" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto rounded-full px-8 py-6 h-auto text-base sm:text-lg border-2"
              >
                Browse Templates
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
