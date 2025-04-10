
import React, { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import ComplianceSummary from "@/components/dashboard/ComplianceSummary";
import EligibilitySection from "@/components/dashboard/EligibilitySection";
import RiskAnalysis from "@/components/dashboard/RiskAnalysis";
import SubmissionChecklist from "@/components/dashboard/SubmissionChecklist";
import VernoseExplanation from "@/components/dashboard/VernoseExplanation";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar isOpen={isSidebarOpen} />
      
      <div className="flex-1 lg:ml-64">
        <DashboardHeader toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        
        <main className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">RFP Dashboard</h1>
            <p className="text-muted-foreground">Federal IT Services RFP #FSA-2023-05</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ComplianceSummary />
            <EligibilitySection />
          </div>
          
          <div className="mb-6">
            <RiskAnalysis />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <SubmissionChecklist />
            <VernoseExplanation />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
