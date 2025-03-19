
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import ResumePreview from "@/components/resume/ResumePreview";

const Preview = () => {
  return (
    <MainLayout fullWidth={true}>
      <div className="py-8 px-4 md:px-8">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-3xl font-semibold mb-2">Resume Preview</h1>
          <p className="text-foreground/70 mb-8">
            Review your resume, download as PDF, or go back to edit.
          </p>
          
          <ResumePreview />
        </div>
      </div>
    </MainLayout>
  );
};

export default Preview;
