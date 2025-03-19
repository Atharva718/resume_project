
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, FileEdit, Printer, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import html2pdf from "html2pdf.js";

interface ResumePreviewProps {
  className?: string;
}

// Resume templates
const templates = {
  modern: {
    name: "Modern Minimalist",
    component: ModernTemplate,
  },
  classic: {
    name: "Classic Professional",
    component: ClassicTemplate,
  },
  creative: {
    name: "Creative Portfolio",
    component: CreativeTemplate,
  },
  tech: {
    name: "Tech Innovator",
    component: TechTemplate,
  },
};

const ResumePreview = ({ className }: ResumePreviewProps) => {
  const [resumeData, setResumeData] = useState<any>(null);
  const [template, setTemplate] = useState<string>("modern");
  const [loading, setLoading] = useState<boolean>(false);
  const [enhancingText, setEnhancingText] = useState<boolean>(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Load resume data from localStorage
    const storedData = localStorage.getItem("resumeData");
    const storedTemplate = localStorage.getItem("resumeTemplate");
    
    if (storedData) {
      setResumeData(JSON.parse(storedData));
    } else {
      // If no data, redirect to builder
      navigate("/builder");
    }
    
    if (storedTemplate) {
      setTemplate(storedTemplate);
    }
  }, [navigate]);

  const downloadAsPDF = () => {
    if (!resumeRef.current) return;
    
    setLoading(true);
    
    const element = resumeRef.current;
    const opt = {
      margin: 0.5,
      filename: `${resumeData?.fullName || 'Resume'}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    // Add a class for PDF generation (can be used to modify styles for PDF)
    element.classList.add('printing');
    
    html2pdf().set(opt).from(element).save().then(() => {
      element.classList.remove('printing');
      setLoading(false);
      
      toast({
        title: "Resume downloaded!",
        description: "Your resume has been saved as a PDF.",
      });
    });
  };

  const printResume = () => {
    if (!resumeRef.current) return;
    window.print();
  };

  const enhanceWithAI = () => {
    setEnhancingText(true);
    
    // Simulating AI enhancement with a timeout (in a real app, you'd call an API here)
    setTimeout(() => {
      const enhancedData = { ...resumeData };
      
      // Enhance summary
      if (enhancedData.summary) {
        enhancedData.summary = "Results-driven software engineer with over 3 years of experience in developing scalable web applications. Proficient in React, TypeScript, and Node.js with a track record of delivering high-quality code on time. Passionate about creating intuitive user experiences and optimizing application performance.";
      }
      
      // Enhance experience descriptions
      if (enhancedData.experience && enhancedData.experience.length > 0) {
        enhancedData.experience[0].description = "• Led the development of a customer-facing portal, increasing user engagement by 45%\n• Optimized database queries, reducing load times by 30% and improving overall application performance\n• Collaborated with UX designers to implement responsive designs, ensuring seamless user experience across all devices\n• Mentored 3 junior developers, improving team productivity and code quality";
      }
      
      setResumeData(enhancedData);
      localStorage.setItem("resumeData", JSON.stringify(enhancedData));
      setEnhancingText(false);
      
      toast({
        title: "Resume enhanced!",
        description: "AI has improved your resume content. Check it out!",
      });
    }, 2000);
  };

  const handleEdit = () => {
    navigate("/builder");
  };

  if (!resumeData) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const TemplateComponent = templates[template as keyof typeof templates]?.component || templates.modern.component;

  return (
    <div className={className}>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-3/4 mx-auto">
          <Card className="p-0 overflow-hidden shadow-md">
            <div className="bg-white" ref={resumeRef}>
              <TemplateComponent data={resumeData} />
            </div>
          </Card>
        </div>
        
        <div className="w-full lg:w-1/4 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Actions</h2>
            <div className="space-y-4">
              <Button 
                variant="default" 
                className="w-full flex items-center gap-2 py-6"
                onClick={downloadAsPDF}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                Download PDF
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2 py-6"
                onClick={printResume}
              >
                <Printer className="h-4 w-4" />
                Print
              </Button>
              
              <Button 
                variant="secondary" 
                className="w-full flex items-center gap-2 py-6"
                onClick={handleEdit}
              >
                <FileEdit className="h-4 w-4" />
                Edit Resume
              </Button>
              
              <Button 
                variant="secondary" 
                className="w-full flex items-center gap-2 py-6"
                onClick={enhanceWithAI}
                disabled={enhancingText}
              >
                {enhancingText ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                Enhance with AI
              </Button>
            </div>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Template</h2>
            <p className="text-sm text-foreground/70 mb-4">
              Current template: <span className="font-medium">{templates[template as keyof typeof templates]?.name || "Modern Minimalist"}</span>
            </p>
            
            <div className="space-y-3">
              {Object.entries(templates).map(([key, value]) => (
                <Button
                  key={key}
                  variant={key === template ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => {
                    setTemplate(key);
                    localStorage.setItem("resumeTemplate", key);
                  }}
                >
                  {value.name}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Template components
function ModernTemplate({ data }: { data: any }) {
  return (
    <div className="p-8 font-sans">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-1">{data.fullName}</h1>
        
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
          {data.email && <div>{data.email}</div>}
          {data.phone && <div>{data.phone}</div>}
          {data.location && <div>{data.location}</div>}
          {data.linkedin && <div>{data.linkedin}</div>}
          {data.website && <div>{data.website}</div>}
        </div>
      </header>
      
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2">Summary</h2>
          <p className="text-sm">{data.summary}</p>
        </section>
      )}
      
      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-3">Experience</h2>
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between mb-1">
                <div>
                  <h3 className="font-semibold">{exp.position}</h3>
                  <div className="text-sm">{exp.company}{exp.location ? `, ${exp.location}` : ''}</div>
                </div>
                {(exp.startDate || exp.endDate) && (
                  <div className="text-sm text-gray-600">
                    {exp.startDate || ''} - {exp.endDate || 'Present'}
                  </div>
                )}
              </div>
              {exp.description && <p className="text-sm whitespace-pre-line">{exp.description}</p>}
            </div>
          ))}
        </section>
      )}
      
      {data.education && data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-3">Education</h2>
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between mb-1">
                <div>
                  <h3 className="font-semibold">{edu.school}</h3>
                  <div className="text-sm">
                    {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                    {edu.location ? ` - ${edu.location}` : ''}
                  </div>
                </div>
                {(edu.startDate || edu.endDate) && (
                  <div className="text-sm text-gray-600">
                    {edu.startDate || ''} - {edu.endDate || 'Present'}
                  </div>
                )}
              </div>
              {edu.description && <p className="text-sm whitespace-pre-line">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}
      
      {data.skills && data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-3">Skills</h2>
          {data.skills.map((skill: any, index: number) => (
            <div key={index} className="mb-3 last:mb-0">
              {skill.category && <h3 className="font-medium text-sm mb-1">{skill.category}</h3>}
              <p className="text-sm">{skill.skillList}</p>
            </div>
          ))}
        </section>
      )}
      
      {data.projects && data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-3">Projects</h2>
          {data.projects.map((project: any, index: number) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between mb-1">
                <div>
                  <h3 className="font-semibold">{project.name}</h3>
                  {project.role && <div className="text-sm">{project.role}</div>}
                </div>
                {(project.startDate || project.endDate) && (
                  <div className="text-sm text-gray-600">
                    {project.startDate || ''} - {project.endDate || 'Present'}
                  </div>
                )}
              </div>
              {project.technologies && (
                <div className="text-sm font-medium my-1">
                  Technologies: {project.technologies}
                </div>
              )}
              {project.description && <p className="text-sm whitespace-pre-line">{project.description}</p>}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

function ClassicTemplate({ data }: { data: any }) {
  return (
    <div className="p-8 font-serif">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-wider mb-2">{data.fullName}</h1>
        
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm">
          {data.email && <div>{data.email}</div>}
          {data.phone && <div>{data.phone}</div>}
          {data.location && <div>{data.location}</div>}
          {data.linkedin && <div>{data.linkedin}</div>}
          {data.website && <div>{data.website}</div>}
        </div>
      </header>
      
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2 text-center">Professional Summary</h2>
          <div className="w-full h-px bg-gray-300 mb-3"></div>
          <p className="text-sm">{data.summary}</p>
        </section>
      )}
      
      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2 text-center">Professional Experience</h2>
          <div className="w-full h-px bg-gray-300 mb-3"></div>
          
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="mb-5 last:mb-0">
              <div className="flex justify-between mb-1">
                <h3 className="font-bold">{exp.position}</h3>
                {(exp.startDate || exp.endDate) && (
                  <div className="text-sm">
                    {exp.startDate || ''} - {exp.endDate || 'Present'}
                  </div>
                )}
              </div>
              <div className="mb-2 italic">{exp.company}{exp.location ? `, ${exp.location}` : ''}</div>
              {exp.description && <p className="text-sm whitespace-pre-line">{exp.description}</p>}
            </div>
          ))}
        </section>
      )}
      
      {data.education && data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2 text-center">Education</h2>
          <div className="w-full h-px bg-gray-300 mb-3"></div>
          
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between mb-1">
                <h3 className="font-bold">{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</h3>
                {(edu.startDate || edu.endDate) && (
                  <div className="text-sm">
                    {edu.startDate || ''} - {edu.endDate || 'Present'}
                  </div>
                )}
              </div>
              <div className="mb-2 italic">{edu.school}{edu.location ? `, ${edu.location}` : ''}</div>
              {edu.description && <p className="text-sm whitespace-pre-line">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}
      
      {data.skills && data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2 text-center">Skills</h2>
          <div className="w-full h-px bg-gray-300 mb-3"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.skills.map((skill: any, index: number) => (
              <div key={index}>
                {skill.category && <h3 className="font-bold mb-1">{skill.category}</h3>}
                <p className="text-sm">{skill.skillList}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {data.projects && data.projects.length > 0 && (
        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2 text-center">Projects</h2>
          <div className="w-full h-px bg-gray-300 mb-3"></div>
          
          {data.projects.map((project: any, index: number) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between mb-1">
                <h3 className="font-bold">{project.name}</h3>
                {(project.startDate || project.endDate) && (
                  <div className="text-sm">
                    {project.startDate || ''} - {project.endDate || 'Present'}
                  </div>
                )}
              </div>
              {project.role && <div className="mb-1 italic">{project.role}</div>}
              {project.technologies && (
                <div className="text-sm font-medium mb-1">
                  Technologies: {project.technologies}
                </div>
              )}
              {project.description && <p className="text-sm whitespace-pre-line">{project.description}</p>}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

function CreativeTemplate({ data }: { data: any }) {
  return (
    <div className="font-sans">
      <div className="bg-gradient-to-r from-primary/80 to-primary p-8 text-white">
        <h1 className="text-3xl font-bold mb-1">{data.fullName}</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm opacity-90">
          {data.email && <div>{data.email}</div>}
          {data.phone && <div>{data.phone}</div>}
          {data.location && <div>{data.location}</div>}
          {data.linkedin && <div>{data.linkedin}</div>}
          {data.website && <div>{data.website}</div>}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-6 p-8">
        <div className="col-span-3 lg:col-span-2">
          {data.summary && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary mb-3">About Me</h2>
              <p className="text-sm">{data.summary}</p>
            </section>
          )}
          
          {data.experience && data.experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary mb-4">Experience</h2>
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="mb-6 last:mb-0">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                    <h3 className="text-lg font-semibold">{exp.position}</h3>
                    {(exp.startDate || exp.endDate) && (
                      <div className="text-sm font-medium text-gray-600">
                        {exp.startDate || ''} - {exp.endDate || 'Present'}
                      </div>
                    )}
                  </div>
                  <div className="text-sm font-medium mb-2">
                    {exp.company}{exp.location ? `, ${exp.location}` : ''}
                  </div>
                  {exp.description && <p className="text-sm whitespace-pre-line">{exp.description}</p>}
                </div>
              ))}
            </section>
          )}
          
          {data.projects && data.projects.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-primary mb-4">Projects</h2>
              {data.projects.map((project: any, index: number) => (
                <div key={index} className="mb-6 last:mb-0">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    {(project.startDate || project.endDate) && (
                      <div className="text-sm font-medium text-gray-600">
                        {project.startDate || ''} - {project.endDate || 'Present'}
                      </div>
                    )}
                  </div>
                  {project.role && <div className="text-sm font-medium mb-1">{project.role}</div>}
                  {project.technologies && (
                    <div className="text-sm font-medium mb-2 text-primary">
                      {project.technologies}
                    </div>
                  )}
                  {project.description && <p className="text-sm whitespace-pre-line">{project.description}</p>}
                </div>
              ))}
            </section>
          )}
        </div>
        
        <div className="col-span-3 lg:col-span-1">
          {data.education && data.education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary mb-4">Education</h2>
              {data.education.map((edu: any, index: number) => (
                <div key={index} className="mb-4 last:mb-0">
                  <h3 className="font-semibold">{edu.school}</h3>
                  <div className="text-sm">
                    {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                  </div>
                  {(edu.startDate || edu.endDate) && (
                    <div className="text-sm text-gray-600 mb-1">
                      {edu.startDate || ''} - {edu.endDate || 'Present'}
                    </div>
                  )}
                  {edu.location && <div className="text-sm mb-1">{edu.location}</div>}
                  {edu.description && <p className="text-sm whitespace-pre-line">{edu.description}</p>}
                </div>
              ))}
            </section>
          )}
          
          {data.skills && data.skills.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-primary mb-4">Skills</h2>
              {data.skills.map((skill: any, index: number) => (
                <div key={index} className="mb-4 last:mb-0">
                  {skill.category && <h3 className="font-semibold mb-2">{skill.category}</h3>}
                  <p className="text-sm">{skill.skillList}</p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function TechTemplate({ data }: { data: any }) {
  return (
    <div className="font-mono bg-white">
      <div className="bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold mb-2">{data.fullName}</h1>
        
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {data.email && <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            {data.email}
          </div>}
          
          {data.phone && <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            {data.phone}
          </div>}
          
          {data.location && <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            {data.location}
          </div>}
          
          {data.linkedin && <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            {data.linkedin}
          </div>}
          
          {data.website && <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            {data.website}
          </div>}
        </div>
      </div>
      
      <div className="p-8">
        {data.summary && (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-primary border-b-2 border-primary inline-block pb-1">&lt;Summary&gt;</h2>
            <p className="text-sm">{data.summary}</p>
          </section>
        )}
        
        {data.skills && data.skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-primary border-b-2 border-primary inline-block pb-1">&lt;Skills&gt;</h2>
            {data.skills.map((skill: any, index: number) => (
              <div key={index} className="mb-3 last:mb-0">
                {skill.category && <h3 className="font-bold text-sm mb-1">{skill.category}:</h3>}
                <p className="text-sm bg-gray-100 p-2 rounded font-mono">{skill.skillList}</p>
              </div>
            ))}
          </section>
        )}
        
        {data.experience && data.experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-primary border-b-2 border-primary inline-block pb-1">&lt;Experience&gt;</h2>
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="mb-5 last:mb-0">
                <div className="flex justify-between mb-1">
                  <h3 className="font-bold">{exp.position}</h3>
                  {(exp.startDate || exp.endDate) && (
                    <div className="text-sm font-mono">
                      {exp.startDate || ''} - {exp.endDate || 'Present'}
                    </div>
                  )}
                </div>
                <div className="text-sm font-bold text-primary mb-2">{exp.company}{exp.location ? ` @ ${exp.location}` : ''}</div>
                {exp.description && <p className="text-sm whitespace-pre-line">{exp.description}</p>}
              </div>
            ))}
          </section>
        )}
        
        {data.projects && data.projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-primary border-b-2 border-primary inline-block pb-1">&lt;Projects&gt;</h2>
            {data.projects.map((project: any, index: number) => (
              <div key={index} className="mb-5 last:mb-0">
                <div className="flex justify-between mb-1">
                  <h3 className="font-bold">{project.name}</h3>
                  {(project.startDate || project.endDate) && (
                    <div className="text-sm font-mono">
                      {project.startDate || ''} - {project.endDate || 'Present'}
                    </div>
                  )}
                </div>
                {project.role && <div className="text-sm mb-1">{project.role}</div>}
                {project.technologies && (
                  <div className="text-sm font-mono bg-gray-100 p-1 rounded mb-2">
                    {project.technologies}
                  </div>
                )}
                {project.description && <p className="text-sm whitespace-pre-line">{project.description}</p>}
              </div>
            ))}
          </section>
        )}
        
        {data.education && data.education.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-3 text-primary border-b-2 border-primary inline-block pb-1">&lt;Education&gt;</h2>
            {data.education.map((edu: any, index: number) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex justify-between mb-1">
                  <h3 className="font-bold">{edu.school}</h3>
                  {(edu.startDate || edu.endDate) && (
                    <div className="text-sm font-mono">
                      {edu.startDate || ''} - {edu.endDate || 'Present'}
                    </div>
                  )}
                </div>
                <div className="text-sm">{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</div>
                {edu.location && <div className="text-sm mb-1">{edu.location}</div>}
                {edu.description && <p className="text-sm whitespace-pre-line">{edu.description}</p>}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

export default ResumePreview;
