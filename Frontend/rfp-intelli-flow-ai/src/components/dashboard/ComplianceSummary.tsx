
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const ComplianceSummary = () => {
  // Mock data for compliance score
  const complianceScore = 85;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Compliance Score</span>
              <span className="text-lg font-bold">{complianceScore}%</span>
            </div>
            <Progress value={complianceScore} className="h-2" />
            
            <div className="flex items-center gap-2 mt-2">
              {complianceScore >= 80 ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : complianceScore >= 60 ? (
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <span className="text-sm text-muted-foreground">
                {complianceScore >= 80
                  ? "Your RFP passes the compliance check."
                  : complianceScore >= 60
                  ? "Your RFP needs some improvements."
                  : "Your RFP has significant compliance issues."}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-muted/50 p-3 rounded-lg text-center">
              <div className="text-sm font-medium mb-1">Requirements</div>
              <div className="text-xl font-bold text-rfp-blue">25/28</div>
              <div className="text-xs text-muted-foreground">Requirements met</div>
            </div>
            
            <div className="bg-muted/50 p-3 rounded-lg text-center">
              <div className="text-sm font-medium mb-1">Eligibility</div>
              <div className="text-xl font-bold text-green-500">Passed</div>
              <div className="text-xs text-muted-foreground">All criteria met</div>
            </div>
            
            <div className="bg-muted/50 p-3 rounded-lg text-center">
              <div className="text-sm font-medium mb-1">Risk Level</div>
              <div className="text-xl font-bold text-yellow-500">Medium</div>
              <div className="text-xs text-muted-foreground">3 issues found</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceSummary;
