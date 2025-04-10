
import React from "react";

const Architecture = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 order-2 lg:order-1">
            <div className="bg-gradient-to-br from-rfp-blue to-rfp-teal p-1 rounded-xl">
              <div className="bg-card p-6 rounded-lg h-full">
                <div className="flex flex-col space-y-6">
                  {/* Simplified architecture diagram */}
                  <div className="w-full bg-muted p-4 rounded-lg">
                    <div className="text-center font-medium mb-2">User Interface Layer</div>
                    <div className="flex justify-center space-x-4">
                      <div className="bg-white px-3 py-2 rounded shadow-sm text-sm">Upload Portal</div>
                      <div className="bg-white px-3 py-2 rounded shadow-sm text-sm">Dashboard</div>
                      <div className="bg-white px-3 py-2 rounded shadow-sm text-sm">Alerts</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19 12L12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  
                  <div className="w-full bg-muted p-4 rounded-lg">
                    <div className="text-center font-medium mb-2">AI Processing Layer</div>
                    <div className="flex justify-center space-x-4">
                      <div className="bg-white px-3 py-2 rounded shadow-sm text-sm">Document Parser</div>
                      <div className="bg-white px-3 py-2 rounded shadow-sm text-sm">Vectorization</div>
                      <div className="bg-white px-3 py-2 rounded shadow-sm text-sm">Analysis Engine</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19 12L12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  
                  <div className="w-full bg-muted p-4 rounded-lg">
                    <div className="text-center font-medium mb-2">Output Layer</div>
                    <div className="flex justify-center space-x-4">
                      <div className="bg-white px-3 py-2 rounded shadow-sm text-sm">Compliance Reports</div>
                      <div className="bg-white px-3 py-2 rounded shadow-sm text-sm">Risk Analysis</div>
                      <div className="bg-white px-3 py-2 rounded shadow-sm text-sm">Checklists</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">AI-Powered Architecture</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our platform leverages state-of-the-art AI to process and analyze RFP documents with exceptional accuracy.
            </p>
            
            <div className="space-y-6">
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold mb-2">Document Understanding</h3>
                <p className="text-muted-foreground">
                  Our AI parses complex documents, identifying requirements, eligibility criteria, and key terms through advanced natural language processing.
                </p>
              </div>
              
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold mb-2">Risk Assessment Model</h3>
                <p className="text-muted-foreground">
                  Sophisticated algorithms detect potentially problematic clauses and provide risk scores based on historical data and legal frameworks.
                </p>
              </div>
              
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold mb-2">Explainable AI</h3>
                <p className="text-muted-foreground">
                  Our system not only delivers results but also explains its reasoning, helping you understand why certain clauses were flagged or requirements identified.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Architecture;
