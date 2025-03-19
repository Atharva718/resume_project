
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  User, 
  BookOpen, 
  Briefcase, 
  Wrench, 
  Award, 
  FileText,
  Plus,
  Trash2,
  ChevronRight,
  ChevronLeft,
  MoveDown,
  MoveUp
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";

// Form validation schemas
const personalInfoSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  location: z.string().optional(),
  linkedin: z.string().optional(),
  website: z.string().optional(),
  summary: z.string().optional(),
});

const educationSchema = z.object({
  education: z.array(
    z.object({
      school: z.string().min(2, { message: "School name is required" }),
      degree: z.string().optional(),
      fieldOfStudy: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      location: z.string().optional(),
      description: z.string().optional(),
    })
  ),
});

const experienceSchema = z.object({
  experience: z.array(
    z.object({
      company: z.string().min(2, { message: "Company name is required" }),
      position: z.string().min(2, { message: "Position is required" }),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      location: z.string().optional(),
      description: z.string().optional(),
    })
  ),
});

const skillsSchema = z.object({
  skills: z.array(
    z.object({
      category: z.string().optional(),
      skillList: z.string().min(2, { message: "Please enter at least one skill" }),
    })
  ),
});

const projectsSchema = z.object({
  projects: z.array(
    z.object({
      name: z.string().min(2, { message: "Project name is required" }),
      role: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      description: z.string().optional(),
      technologies: z.string().optional(),
    })
  ),
});

// Combined resume schema
const resumeSchema = z.object({
  ...personalInfoSchema.shape,
  ...educationSchema.shape,
  ...experienceSchema.shape,
  ...skillsSchema.shape,
  ...projectsSchema.shape,
});

type ResumeFormValues = z.infer<typeof resumeSchema>;

interface ResumeFormProps {
  className?: string;
  templateId?: string;
}

const ResumeForm = ({ className, templateId = "modern" }: ResumeFormProps) => {
  const [activeTab, setActiveTab] = useState("personal");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
      summary: "",
      education: [
        { 
          school: "", 
          degree: "", 
          fieldOfStudy: "", 
          startDate: "", 
          endDate: "", 
          location: "",
          description: "" 
        }
      ],
      experience: [
        { 
          company: "", 
          position: "", 
          startDate: "", 
          endDate: "", 
          location: "",
          description: "" 
        }
      ],
      skills: [
        { 
          category: "Technical Skills", 
          skillList: "" 
        }
      ],
      projects: [
        { 
          name: "", 
          role: "", 
          startDate: "", 
          endDate: "", 
          description: "",
          technologies: ""
        }
      ],
    },
  });
  
  // Field arrays for repeatable sections
  const { fields: educationFields, append: appendEducation, remove: removeEducation, move: moveEducation } = useFieldArray({
    control: form.control,
    name: "education",
  });
  
  const { fields: experienceFields, append: appendExperience, remove: removeExperience, move: moveExperience } = useFieldArray({
    control: form.control,
    name: "experience",
  });
  
  const { fields: skillsFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control: form.control,
    name: "skills",
  });
  
  const { fields: projectFields, append: appendProject, remove: removeProject, move: moveProject } = useFieldArray({
    control: form.control,
    name: "projects",
  });
  
  function onSubmit(data: ResumeFormValues) {
    // Store form data in localStorage
    localStorage.setItem("resumeData", JSON.stringify(data));
    localStorage.setItem("resumeTemplate", templateId);
    
    toast({
      title: "Resume data saved!",
      description: "Your resume has been saved. Redirecting to preview...",
    });
    
    // Navigate to preview
    setTimeout(() => {
      navigate("/preview");
    }, 1000);
  }
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const tabNavigation = {
    personal: { prev: null, next: "education" },
    education: { prev: "personal", next: "experience" },
    experience: { prev: "education", next: "skills" },
    skills: { prev: "experience", next: "projects" },
    projects: { prev: "skills", next: null },
  };
  
  const handleNext = () => {
    const nextTab = tabNavigation[activeTab as keyof typeof tabNavigation].next;
    if (nextTab) {
      setActiveTab(nextTab);
    } else {
      form.handleSubmit(onSubmit)();
    }
  };
  
  const handlePrev = () => {
    const prevTab = tabNavigation[activeTab as keyof typeof tabNavigation].prev;
    if (prevTab) {
      setActiveTab(prevTab);
    }
  };
  
  return (
    <div className={className}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="personal" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span className="hidden md:inline">Personal</span>
              </TabsTrigger>
              <TabsTrigger value="education" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span className="hidden md:inline">Education</span>
              </TabsTrigger>
              <TabsTrigger value="experience" className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                <span className="hidden md:inline">Experience</span>
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex items-center gap-1">
                <Wrench className="h-4 w-4" />
                <span className="hidden md:inline">Skills</span>
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span className="hidden md:inline">Projects</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="pt-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email*</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="City, State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn</FormLabel>
                        <FormControl>
                          <Input placeholder="linkedin.com/in/johndoe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="johndoe.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="col-span-1 md:col-span-2">
                    <FormField
                      control={form.control}
                      name="summary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Professional Summary</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="A brief summary highlighting your experience and skills..."
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="education" className="pt-6">
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Education</h2>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendEducation({ 
                      school: "", 
                      degree: "", 
                      fieldOfStudy: "", 
                      startDate: "", 
                      endDate: "", 
                      location: "",
                      description: "" 
                    })}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Add Education
                  </Button>
                </div>
                
                {educationFields.map((field, index) => (
                  <div key={field.id} className="mb-8 pb-6 border-b border-border/60 last:border-0 last:mb-0 last:pb-0">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Education #{index + 1}</h3>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => index > 0 && moveEducation(index, index - 1)}
                          disabled={index === 0}
                          className="h-8 w-8"
                        >
                          <MoveUp className="h-4 w-4" />
                          <span className="sr-only">Move up</span>
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => index < educationFields.length - 1 && moveEducation(index, index + 1)}
                          disabled={index === educationFields.length - 1}
                          className="h-8 w-8"
                        >
                          <MoveDown className="h-4 w-4" />
                          <span className="sr-only">Move down</span>
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => educationFields.length > 1 && removeEducation(index)}
                          disabled={educationFields.length === 1}
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name={`education.${index}.school`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>School / University*</FormLabel>
                            <FormControl>
                              <Input placeholder="University Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`education.${index}.degree`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Degree</FormLabel>
                            <FormControl>
                              <Input placeholder="Bachelor of Science" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`education.${index}.fieldOfStudy`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Field of Study</FormLabel>
                            <FormControl>
                              <Input placeholder="Computer Science" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`education.${index}.location`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="City, State" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`education.${index}.startDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                              <Input placeholder="Sep 2018" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`education.${index}.endDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                              <Input placeholder="May 2022 (or 'Present')" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="col-span-1 md:col-span-2">
                        <FormField
                          control={form.control}
                          name={`education.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Relevant coursework, honors, activities, etc."
                                  className="min-h-[100px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </Card>
            </TabsContent>
            
            <TabsContent value="experience" className="pt-6">
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Work Experience</h2>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendExperience({ 
                      company: "", 
                      position: "", 
                      startDate: "", 
                      endDate: "", 
                      location: "", 
                      description: "" 
                    })}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Add Experience
                  </Button>
                </div>
                
                {experienceFields.map((field, index) => (
                  <div key={field.id} className="mb-8 pb-6 border-b border-border/60 last:border-0 last:mb-0 last:pb-0">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Experience #{index + 1}</h3>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => index > 0 && moveExperience(index, index - 1)}
                          disabled={index === 0}
                          className="h-8 w-8"
                        >
                          <MoveUp className="h-4 w-4" />
                          <span className="sr-only">Move up</span>
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => index < experienceFields.length - 1 && moveExperience(index, index + 1)}
                          disabled={index === experienceFields.length - 1}
                          className="h-8 w-8"
                        >
                          <MoveDown className="h-4 w-4" />
                          <span className="sr-only">Move down</span>
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => experienceFields.length > 1 && removeExperience(index)}
                          disabled={experienceFields.length === 1}
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name={`experience.${index}.position`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Position / Title*</FormLabel>
                            <FormControl>
                              <Input placeholder="Software Engineer" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`experience.${index}.company`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company / Organization*</FormLabel>
                            <FormControl>
                              <Input placeholder="Company Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`experience.${index}.location`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="City, State" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`experience.${index}.startDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Start Date</FormLabel>
                              <FormControl>
                                <Input placeholder="Jan 2020" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`experience.${index}.endDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>End Date</FormLabel>
                              <FormControl>
                                <Input placeholder="Current" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="col-span-1 md:col-span-2">
                        <FormField
                          control={form.control}
                          name={`experience.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="• Describe your achievements and responsibilities
• Use bullet points for better readability
• Quantify achievements when possible (e.g., 'Increased sales by 20%')"
                                  className="min-h-[150px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Use bullet points starting with "•" for better readability
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </Card>
            </TabsContent>
            
            <TabsContent value="skills" className="pt-6">
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Skills</h2>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendSkill({ category: "", skillList: "" })}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Add Skill Category
                  </Button>
                </div>
                
                {skillsFields.map((field, index) => (
                  <div key={field.id} className="mb-6 pb-6 border-b border-border/60 last:border-0 last:mb-0 last:pb-0">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Skill Category #{index + 1}</h3>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => skillsFields.length > 1 && removeSkill(index)}
                        disabled={skillsFields.length === 1}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <FormField
                        control={form.control}
                        name={`skills.${index}.category`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Technical Skills, Soft Skills, Languages, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`skills.${index}.skillList`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Skills</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="JavaScript, React, TypeScript, Node.js, CSS, HTML"
                                className="min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Separate skills with commas for better formatting
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </Card>
            </TabsContent>
            
            <TabsContent value="projects" className="pt-6">
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Projects</h2>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendProject({ 
                      name: "", 
                      role: "", 
                      startDate: "", 
                      endDate: "", 
                      description: "",
                      technologies: ""
                    })}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Add Project
                  </Button>
                </div>
                
                {projectFields.map((field, index) => (
                  <div key={field.id} className="mb-8 pb-6 border-b border-border/60 last:border-0 last:mb-0 last:pb-0">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Project #{index + 1}</h3>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => index > 0 && moveProject(index, index - 1)}
                          disabled={index === 0}
                          className="h-8 w-8"
                        >
                          <MoveUp className="h-4 w-4" />
                          <span className="sr-only">Move up</span>
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => index < projectFields.length - 1 && moveProject(index, index + 1)}
                          disabled={index === projectFields.length - 1}
                          className="h-8 w-8"
                        >
                          <MoveDown className="h-4 w-4" />
                          <span className="sr-only">Move down</span>
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => projectFields.length > 1 && removeProject(index)}
                          disabled={projectFields.length === 1}
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name={`projects.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Name*</FormLabel>
                            <FormControl>
                              <Input placeholder="Project Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`projects.${index}.role`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Role</FormLabel>
                            <FormControl>
                              <Input placeholder="Lead Developer, Project Manager, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`projects.${index}.startDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Start Date</FormLabel>
                              <FormControl>
                                <Input placeholder="Jan 2022" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`projects.${index}.endDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>End Date</FormLabel>
                              <FormControl>
                                <Input placeholder="Mar 2022" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="col-span-1 md:col-span-2">
                        <FormField
                          control={form.control}
                          name={`projects.${index}.technologies`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Technologies Used</FormLabel>
                              <FormControl>
                                <Input placeholder="React, Node.js, MongoDB, etc." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="col-span-1 md:col-span-2">
                        <FormField
                          control={form.control}
                          name={`projects.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="• Describe the project and your contributions
• Highlight key features and technologies
• Mention results and impact (e.g., 'Reduced load time by 40%')"
                                  className="min-h-[150px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Use bullet points starting with "•" for better readability
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-between">
            {tabNavigation[activeTab as keyof typeof tabNavigation].prev ? (
              <Button 
                type="button" 
                variant="outline" 
                onClick={handlePrev}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
            ) : (
              <div></div>
            )}
            
            {tabNavigation[activeTab as keyof typeof tabNavigation].next ? (
              <Button 
                type="button" 
                onClick={handleNext}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                type="submit" 
                className="flex items-center gap-2"
              >
                Save & Preview
                <FileText className="h-4 w-4" />
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ResumeForm;
