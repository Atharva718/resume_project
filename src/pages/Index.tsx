
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Templates from "@/components/sections/Templates";

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      <Features />
      <Templates limit={4} />
    </MainLayout>
  );
};

export default Index;
