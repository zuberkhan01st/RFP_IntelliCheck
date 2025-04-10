
import React from "react";
import { FileText, ChevronRight, Layers, CheckCircle, AlertTriangle, CheckSquare, Bell } from "lucide-react";

const features = [
  {
    title: "RFP Upload Portal",
    description: "Simply upload your RFPs in any format. Our system handles PDFs, DOCs, and more.",
    icon: <FileText className="h-6 w-6 text-rfp-teal" />,
  },
  {
    title: "Automated Chunking & Vectorization",
    description: "Our AI breaks down documents into meaningful sections for analysis.",
    icon: <Layers className="h-6 w-6 text-rfp-teal" />,
  },
  {
    title: "Compliance & Eligibility Check",
    description: "Instantly verify if your proposal meets all requirements and eligibility criteria.",
    icon: <CheckCircle className="h-6 w-6 text-rfp-teal" />,
  },
  {
    title: "Clause Risk Analyzer",
    description: "Identify potentially problematic clauses and get negotiation suggestions.",
    icon: <AlertTriangle className="h-6 w-6 text-rfp-teal" />,
  },
  {
    title: "Checklist Generator",
    description: "Auto-generate submission checklists tailored to each RFP's requirements.",
    icon: <CheckSquare className="h-6 w-6 text-rfp-teal" />,
  },
  {
    title: "Interactive Dashboard with Alerts",
    description: "Track compliance status and receive notifications about pending items.",
    icon: <Bell className="h-6 w-6 text-rfp-teal" />,
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform streamlines RFP compliance from document upload to submission.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <a href="#" className="inline-flex items-center text-rfp-teal hover:text-rfp-blue font-medium">
                Learn more <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
