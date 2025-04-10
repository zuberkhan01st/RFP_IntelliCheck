
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-rfp-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-rfp-teal/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text tracking-tight">
              RFP IntelliCheck
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Streamline Your RFP Compliance with AI-Powered Intelligence
            </p>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Automate eligibility verification, risk analysis, and checklist generation for your RFP submissions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link to="/dashboard">
                <Button className="text-lg px-8 py-6 rounded-lg">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="outline" className="text-lg px-8 py-6 rounded-lg">
                  Watch Demo
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="aspect-[4/3] relative z-10 rounded-xl overflow-hidden shadow-2xl border border-white/20 animate-fade-in">
              <img 
                src="https://placehold.co/800x600/0F3460/FFFFFF?text=RFP+IntelliCheck+AI+Dashboard&font=Roboto" 
                alt="RFP IntelliCheck Dashboard" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="absolute top-8 -right-8 w-64 h-24 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 z-20 animate-pulse-subtle border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-sm">Compliance Check</div>
                  <div className="text-xs text-muted-foreground">Passed with 95% score</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-8 w-72 h-24 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 z-20 animate-pulse-subtle border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" x2="12" y1="8" y2="12"></line>
                    <line x1="12" x2="12.01" y1="16" y2="16"></line>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-sm">Risk Alert</div>
                  <div className="text-xs text-muted-foreground">Section 5.2 needs attention</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
