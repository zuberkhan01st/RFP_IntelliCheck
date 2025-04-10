
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ArrowRight } from "lucide-react";

const riskClauses = [
  {
    id: 1,
    section: "Section 5.2 - Liability",
    riskLevel: "High",
    description: "Unlimited liability clause detected without standard limitations.",
    suggestion: "Request liability cap based on contract value or insurance coverage limits.",
    page: 17,
  },
  {
    id: 2,
    section: "Section 8.4 - Intellectual Property",
    riskLevel: "Medium",
    description: "Ambiguous IP rights transfer language may affect ownership of deliverables.",
    suggestion: "Clarify ownership specifically for pre-existing materials vs. created content.",
    page: 28,
  },
  {
    id: 3,
    section: "Section 12.1 - Payment Terms",
    riskLevel: "Medium",
    description: "Net-60 payment terms exceed company standard of Net-30.",
    suggestion: "Request amendment to Net-30 or Net-45 terms, consistent with company policy.",
    page: 45,
  },
  {
    id: 4,
    section: "Section 15.3 - Termination",
    riskLevel: "Low",
    description: "30-day notice period for convenience termination is shorter than preferred.",
    suggestion: "Consider requesting 60-day notice period for adequate transition.",
    page: 52,
  },
];

const RiskAnalysis = () => {
  const [selectedRisk, setSelectedRisk] = React.useState<number | null>(null);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Risk Analysis</CardTitle>
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">Found</span>
          <Badge variant="outline" className="ml-1">{riskClauses.length} issues</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2 border border-border rounded-lg overflow-hidden">
            <div className="bg-muted p-3 border-b border-border">
              <h3 className="font-medium">Flagged Clauses</h3>
            </div>
            <div className="divide-y divide-border max-h-[300px] overflow-y-auto">
              {riskClauses.map((clause) => (
                <div 
                  key={clause.id}
                  className={`p-3 cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedRisk === clause.id ? "bg-muted/80" : ""
                  }`}
                  onClick={() => setSelectedRisk(clause.id)}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm">{clause.section}</span>
                    <Badge className={`
                      ${clause.riskLevel === "High" ? "bg-red-500" : ""}
                      ${clause.riskLevel === "Medium" ? "bg-yellow-500" : ""}
                      ${clause.riskLevel === "Low" ? "bg-blue-500" : ""}
                    `}>
                      {clause.riskLevel} Risk
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">{clause.description}</p>
                  <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
                    <span>Page {clause.page}</span>
                    <span className="flex items-center">View details <ArrowRight className="ml-1 h-3 w-3" /></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 border border-border rounded-lg overflow-hidden">
            <div className="bg-muted p-3 border-b border-border">
              <h3 className="font-medium">Negotiation Suggestions</h3>
            </div>
            
            {selectedRisk ? (
              <div className="p-4">
                {riskClauses.find(clause => clause.id === selectedRisk) ? (
                  <>
                    <div className="mb-4">
                      <h4 className="font-medium mb-1">
                        {riskClauses.find(clause => clause.id === selectedRisk)?.section}
                      </h4>
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <AlertTriangle className="h-4 w-4 mt-0.5 text-yellow-500" />
                        <p className="text-sm">
                          {riskClauses.find(clause => clause.id === selectedRisk)?.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 p-3 rounded-md">
                      <h5 className="text-sm font-medium mb-2">Suggestion:</h5>
                      <p className="text-sm">
                        {riskClauses.find(clause => clause.id === selectedRisk)?.suggestion}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    Risk not found
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground flex flex-col items-center justify-center h-[224px]">
                <AlertTriangle className="h-8 w-8 mb-2 text-muted-foreground/50" />
                <p>Select a flagged clause to view negotiation suggestions</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAnalysis;
