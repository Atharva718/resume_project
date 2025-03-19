
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  animationType?: "typing" | "fade" | "slide";
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

const AnimatedText = ({
  text,
  className,
  delay = 0,
  animationType = "fade",
  tag: Tag = "span",
}: AnimatedTextProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => {
            setIsVisible(true);
          }, delay);
          
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, [delay]);

  const getAnimationClass = () => {
    if (!isVisible) return "opacity-0";
    
    switch (animationType) {
      case "typing":
        return "animate-slide-up";
      case "fade":
        return "animate-fade-in";
      case "slide":
        return "animate-slide-up";
      default:
        return "animate-fade-in";
    }
  };

  return (
    <Tag
      ref={textRef}
      className={cn(getAnimationClass(), className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {text}
    </Tag>
  );
};

export default AnimatedText;
