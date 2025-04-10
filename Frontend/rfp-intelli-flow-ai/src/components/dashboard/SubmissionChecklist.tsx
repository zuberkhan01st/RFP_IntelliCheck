
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Mock checklist items
const checklistItems = [
  {
    id: 1,
    title: "SF-33 Form",
    status: "completed",
    dueDate: "2023-04-15",
    description: "Standard Form 33 - Solicitation, Offer and Award",
  },
  {
    id: 2,
    title: "Technical Proposal",
    status: "completed",
    dueDate: "2023-04-15",
    description: "Technical approach, methodology, and qualifications",
  },
  {
    id: 3,
    title: "Cost Proposal",
    status: "completed",
    dueDate: "2023-04-15",
    description: "Detailed pricing structure and cost breakdown",
  },
  {
    id: 4,
    title: "Past Performance",
    status: "in_progress",
    dueDate: "2023-04-12",
    description: "References and past performance documentation",
  },
  {
    id: 5,
    title: "Compliance Matrix",
    status: "not_started",
    dueDate: "2023-04-14",
    description: "Detailed compliance against each RFP requirement",
  },
  {
    id: 6,
    title: "W-9 Form",
    status: "not_started",
    dueDate: "2023-04-14",
    description: "Current W-9 form with EIN information",
  },
];

const SubmissionChecklist = () => {
  // Calculate progress
  const completedItems = checklistItems.filter(item => item.status === "completed").length;
  const progress = (completedItems / checklistItems.length) * 100;
  
  // Get upcoming due items
  const today = new Date();
  const upcomingDue = checklistItems
    .filter(item => item.status !== "completed" && new Date(item.dueDate) > today)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  
  // Mock function to toggle item status
  const toggleStatus = (id: number) => {
    console.log(`Toggle status for item ${id}`);
    // In a real app, this would update the status in state or on the server
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Submission Checklist</CardTitle>
        <div className="text-sm text-muted-foreground">
          Due: April 15, 2023
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm">{completedItems} of {checklistItems.length} completed</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="space-y-4">
          {upcomingDue.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-100 rounded-md p-3 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm text-yellow-800">Attention Required</h4>
                <p className="text-xs text-yellow-700">
                  {upcomingDue[0].title} is due soon ({upcomingDue[0].dueDate})
                </p>
              </div>
            </div>
          )}
          
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-muted p-3">
              <h3 className="font-medium">Required Documents</h3>
            </div>
            <div className="divide-y divide-border">
              {checklistItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-3 p-3 hover:bg-muted/30 transition-colors"
                >
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 rounded-full p-0 shrink-0"
                    onClick={() => toggleStatus(item.id)}
                  >
                    {item.status === "completed" ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : item.status === "in_progress" ? (
                      <div className="h-5 w-5 rounded-full border-2 border-yellow-500 border-dashed flex items-center justify-center">
                        <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                      </div>
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </Button>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className={`font-medium text-sm ${
                        item.status === "completed" ? "line-through text-muted-foreground" : ""
                      }`}>
                        {item.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Due: {item.dueDate}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubmissionChecklist;
