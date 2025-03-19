
import React from "react";
import { Cpu, FileText, Layout, Sparkles, Clock, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";
import Card from "@/components/ui-custom/Card";
import AnimatedText from "@/components/ui-custom/AnimatedText";

interface FeaturesProps {
  className?: string;
}

const Features = ({ className }: FeaturesProps) => {
  const features = [
    {
      icon: <Cpu className="h-6 w-6 text-primary" />,
      title: "AI-Powered Content",
      description: "Our AI enhances your resume content to highlight achievements and skills effectively."
    },
    {
      icon: <Layout className="h-6 w-6 text-primary" />,
      title: "Professional Templates",
      description: "Choose from a variety of expertly designed templates that stand out to employers."
    },
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: "Custom Formatting",
      description: "Customize fonts, colors, and layouts to match your personal brand and industry."
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Time-Saving",
      description: "Create a polished resume in minutes instead of hours with our intuitive builder."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-primary" />,
      title: "ATS-Friendly",
      description: "Ensure your resume passes Applicant Tracking Systems with optimized formatting."
    },
    {
      icon: <Cloud className="h-6 w-6 text-primary" />,
      title: "Save & Export",
      description: "Save your progress and export your resume in multiple formats including PDF."
    }
  ];

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            <AnimatedText 
              text="Features Designed for Success" 
              className="inline-block text-balance" 
              tag="span"
            />
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto text-balance">
            Our resume builder combines powerful AI with beautiful design to help you create the perfect resume.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="flex flex-col items-start h-full"
              hover
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
