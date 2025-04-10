
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const eligibilityRequirements = [
  {
    id: 1,
    name: "DUNS Number",
    status: "passed",
    details: "Valid DUNS Number verified: 123456789",
  },
  {
    id: 2,
    name: "SAM Registration",
    status: "passed",
    details: "Active SAM registration found, expires 12/31/2025",
  },
  {
    id: 3,
    name: "Past Performance",
    status: "passed",
    details: "Meets minimum 5 years of past performance requirements",
  },
  {
    id: 4,
    name: "Financial Capability",
    status: "passed",
    details: "Annual revenue exceeds minimum threshold",
  },
  {
    id: 5,
    name: "Certifications",
    status: "warning",
    details: "ISO 27001 certification required but not detected",
  },
];

const EligibilitySection = () => {
  const [expanded, setExpanded] = React.useState<number | null>(null);
  
  const toggleExpand = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };
  
  // Calculate overall eligibility status
  const hasFailures = eligibilityRequirements.some(req => req.status === "failed");
  const hasWarnings = eligibilityRequirements.some(req => req.status === "warning");
  
  let overallStatus = "passed";
  let statusText = "Meets all eligibility requirements";
  let statusIcon = <CheckCircle className="h-5 w-5 text-green-500" />;
  
  if (hasFailures) {
    overallStatus = "failed";
    statusText = "Failed to meet all eligibility requirements";
    statusIcon = <XCircle className="h-5 w-5 text-red-500" />;
  } else if (hasWarnings) {
    overallStatus = "warning";
    statusText = "Meets requirements with observations";
    statusIcon = <HelpCircle className="h-5 w-5 text-yellow-500" />;
  }
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Eligibility Verification</CardTitle>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted">
          {statusIcon}
          <span className="text-sm font-medium">
            {overallStatus === "passed" && "Eligible"}
            {overallStatus === "warning" && "Conditionally Eligible"}
            {overallStatus === "failed" && "Not Eligible"}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{statusText}</p>
        
        <div className="space-y-3">
          {eligibilityRequirements.map((requirement) => (
            <div 
              key={requirement.id}
              className="border border-border rounded-lg overflow-hidden"
            >
              <div 
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50"
                onClick={() => toggleExpand(requirement.id)}
              >
                <div className="flex items-center gap-3">
                  {requirement.status === "passed" && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {requirement.status === "warning" && <HelpCircle className="h-5 w-5 text-yellow-500" />}
                  {requirement.status === "failed" && <XCircle className="h-5 w-5 text-red-500" />}
                  <span>{requirement.name}</span>
                </div>
                <Button variant="ghost" size="sm">
                  {expanded === requirement.id ? "Hide" : "Show"} details
                </Button>
              </div>
              
              {expanded === requirement.id && (
                <div className="p-3 bg-muted/30 border-t border-border">
                  <p className="text-sm">{requirement.details}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EligibilitySection;
