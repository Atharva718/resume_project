
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import ResumeForm from "@/components/forms/ResumeForm";

const Builder = () => {
  const [searchParams] = useSearchParams();
  const [templateId, setTemplateId] = useState<string>("modern");

  useEffect(() => {
    const template = searchParams.get("template");
    if (template) {
      setTemplateId(template);
    } else {
      // Get from localStorage if available
      const storedTemplate = localStorage.getItem("resumeTemplate");
      if (storedTemplate) {
        setTemplateId(storedTemplate);
      }
    }
  }, [searchParams]);

  return (
    <MainLayout>
      <div className="py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold mb-2">Resume Builder</h1>
          <p className="text-foreground/70 mb-8">
            Fill in your details to create a professional resume. Navigate through the tabs to complete each section.
          </p>
          
          <ResumeForm templateId={templateId} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Builder;
