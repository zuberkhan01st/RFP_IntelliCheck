
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, AlertCircle, HelpCircle } from "lucide-react";

const VernoseExplanation = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Reasoning</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="compliance">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="compliance">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">Overall Compliance Assessment</h4>
                    <Badge className="bg-green-500">85% Compliant</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Your submission meets most of the compliance requirements, with a few areas needing attention.
                  </p>
                  <div className="bg-muted/50 p-3 rounded-md text-sm">
                    <p className="mb-2">
                      <strong>Key findings:</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>All mandatory submission forms are included</li>
                      <li>Technical approach addresses 25 of 28 requirements</li>
                      <li>Missing details on cybersecurity compliance in Section 4.2</li>
                      <li>References provided match the required format</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-500 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Improvement Opportunities</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    The following requirements need additional attention:
                  </p>
                  <div className="bg-muted/50 p-3 rounded-md text-sm">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Section 4.2 - Cybersecurity</strong>
                        <p className="mt-1">Requirement states "Vendor must detail FISMA compliance measures" but this is only briefly mentioned without specific details.</p>
                      </li>
                      <li>
                        <strong>Section 5.7 - Reporting</strong>
                        <p className="mt-1">Proposal indicates monthly reporting, but RFP requires bi-weekly status reports.</p>
                      </li>
                      <li>
                        <strong>Appendix B - Staff Qualifications</strong>
                        <p className="mt-1">One team member's certification expiration date is not provided.</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="eligibility">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-yellow-500 mt-1" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">Eligibility Assessment</h4>
                    <Badge variant="outline">Conditionally Eligible</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Your organization meets the core eligibility criteria, with one certification concern.
                  </p>
                  <div className="bg-muted/50 p-3 rounded-md text-sm">
                    <p className="mb-2">I've evaluated your eligibility based on the following criteria:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-3">
                      <li><strong>DUNS verification:</strong> Successfully validated number 123456789</li>
                      <li><strong>SAM registration:</strong> Active status confirmed through API check</li>
                      <li><strong>Past performance:</strong> 7 years exceeds 5-year requirement</li>
                      <li><strong>Financial capability:</strong> Revenue meets threshold based on provided documentation</li>
                      <li><strong className="text-yellow-600">ISO 27001 certification:</strong> Required but not found in documentation</li>
                    </ul>
                    <p>
                      The missing ISO 27001 certification could impact eligibility, but the RFP states alternatives may be acceptable with proper justification.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Recommendation</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Based on my analysis of the eligibility requirements:
                  </p>
                  <div className="bg-muted/50 p-3 rounded-md text-sm">
                    <p>
                      You should include documentation of your ongoing ISO 27001 certification process or provide alternative security framework compliance that may satisfy the requirement. The RFP indicates in Section 2.3 that "organizations in the process of certification may provide evidence of their current status."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="risk">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-1" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">High Risk Analysis: Section 5.2 - Liability</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    This clause presents significant risk to your organization.
                  </p>
                  <div className="bg-muted/50 p-3 rounded-md text-sm">
                    <p className="mb-2">
                      <strong>Clause text (p. 17):</strong> "Contractor shall indemnify and hold harmless the Government from any losses, damages, or claims arising from performance under this contract, without limitation."
                    </p>
                    <p className="mb-2">
                      <strong>Risk assessment:</strong> The unlimited liability clause deviates from standard government contracts that typically include reasonable limitations. Based on analysis of 147 similar government contracts, 92% included liability caps related to contract value or insurance coverage.
                    </p>
                    <p>
                      <strong>Recommendation:</strong> Request modification to include a liability cap at 2x contract value or your insurance coverage limit, whichever is greater. This request has a 73% success rate based on historical data from similar RFPs.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-500 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Medium Risk Analysis: Section 8.4 - IP Rights</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    The intellectual property clause contains ambiguous language.
                  </p>
                  <div className="bg-muted/50 p-3 rounded-md text-sm">
                    <p className="mb-2">
                      <strong>Clause text (p. 28):</strong> "All materials developed under this contract shall become the property of the Government."
                    </p>
                    <p className="mb-2">
                      <strong>Risk assessment:</strong> The term "materials developed" is not clearly defined. This could be interpreted to include your pre-existing intellectual property incorporated into deliverables, which conflicts with your standard IP terms.
                    </p>
                    <p>
                      <strong>Recommendation:</strong> Request clarification to specify that "materials developed" refers only to newly created work specifically for this contract, and explicitly excludes pre-existing IP, which should be licensed non-exclusively to the Government.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default VernoseExplanation;
