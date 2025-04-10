'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample data - replace with API calls in production
  const mockData = {
    rfpTitle: "Temporary IT Staffing Services for Texas State Agencies",
    rfpAgency: "Texas Department of Information Resources (DIR)",
    rfpNumber: "DIR-SDD-24-001",
    complianceScore: 85,
    executiveSummary: "Our analysis shows strong compliance with the RFP requirements, scoring 85%. All mandatory requirements are met except for HUB certification. We identified two moderate-risk clauses that require negotiation.",
    eligibility: [
      { requirement: "SAM.gov Registration", status: "✅ PASS", detail: "Registered since 03/01/2022" },
      { requirement: "State License", status: "✅ PASS", detail: "Valid license #TXEA-34892" },
      { requirement: "HUB Certification", status: "❌ FAIL", detail: "Not certified" }
    ],
    checklist: [
      { item: "W-9 Form", status: "✅ Complete", assignedTo: "Legal Dept", dueDate: "Completed" },
      { item: "Certificate of Insurance", status: "✅ Complete", assignedTo: "Finance", dueDate: "Completed" },
      { item: "SF-33 Form", status: "❌ Missing", assignedTo: "Contracts Team", dueDate: "2024-06-15" }
    ],
    risks: [
      { clause: "90-Day Termination", risk: "Medium", suggestion: "Negotiate for 30-day notice" },
      { clause: "Net 45 Payment", risk: "Medium", suggestion: "Request Net 30 terms" },
      { clause: "Liquidated Damages", risk: "Low", suggestion: "Acceptable as written" }
    ],
    recommendations: [
      "Partner with HUB-certified subcontractor",
      "Prioritize negotiation of termination clause",
      "Complete SF-33 form submission"
    ],
    timeline: {
      "RFP Release Date": "2024-05-15",
      "Submission Deadline": "2024-06-28"
    }
  };

  const missingItems = mockData.checklist.filter(item => item.status.includes("❌")).length;
  const highRisks = mockData.risks.filter(risk => risk.risk === "High").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">RFP Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              + New Analysis
            </button>
            <div className="relative h-10 w-10">
              <Image
                src="/assets/user-avatar.jpg"
                alt="User profile"
                layout="fill"
                className="rounded-full"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Compliance Score</h3>
            <p className={`text-3xl font-bold ${
              mockData.complianceScore > 80 ? 'text-green-600' : 
              mockData.complianceScore > 60 ? 'text-yellow-500' : 'text-red-600'
            }`}>
              {mockData.complianceScore}%
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Missing Items</h3>
            <p className="text-3xl font-bold text-red-600">{missingItems}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">High Risks</h3>
            <p className="text-3xl font-bold text-red-600">{highRisks}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Submission Deadline</h3>
            <p className="text-3xl font-bold text-gray-900">{mockData.timeline["Submission Deadline"]}</p>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold mb-4">📌 Executive Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">RFP Title</p>
              <p className="font-medium">{mockData.rfpTitle}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Agency</p>
              <p className="font-medium">{mockData.rfpAgency}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">RFP Number</p>
              <p className="font-medium">{mockData.rfpNumber}</p>
            </div>
          </div>
          <p className="text-gray-700">{mockData.executiveSummary}</p>
          {mockData.complianceScore > 80 ? (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded">
              ✅ You meet all critical requirements and are ready to proceed!
            </div>
          ) : (
            <div className="mt-4 p-3 bg-yellow-100 text-yellow-700 rounded">
              ⚠️ Review the recommendations below before proceeding
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="mb-4 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'eligibility', 'checklist', 'risks', 'recommendations'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {activeTab === 'overview' && (
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Compliance Overview</h2>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div 
                  className={`h-4 rounded-full ${
                    mockData.complianceScore > 80 ? 'bg-green-500' : 
                    mockData.complianceScore > 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`} 
                  style={{ width: `${mockData.complianceScore}%` }}
                ></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Eligibility Status</h3>
                  <ul className="space-y-2">
                    {mockData.eligibility.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2">{item.status.includes("✅") ? '✅' : '❌'}</span>
                        <span>{item.requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Risk Distribution</h3>
                  <div className="space-y-2">
                    {['High', 'Medium', 'Low'].map(level => {
                      const count = mockData.risks.filter(r => r.risk === level).length;
                      return (
                        <div key={level} className="flex items-center">
                          <span className="w-24">{level}:</span>
                          <div className="flex-1 bg-gray-200 rounded h-4">
                            <div 
                              className={`h-4 rounded ${
                                level === 'High' ? 'bg-red-500' : 
                                level === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${(count / mockData.risks.length) * 100}%` }}
                            ></div>
                          </div>
                          <span className="ml-2">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'eligibility' && (
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Eligibility Verification</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requirement</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockData.eligibility.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.requirement}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.status.includes("✅") ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {item.status.includes("✅") ? 'PASS' : 'FAIL'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {item.detail}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'checklist' && (
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Submission Checklist</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned To</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockData.checklist.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.item}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.status.includes("✅") ? 'bg-green-100 text-green-800' : 
                            item.status.includes("❌") ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.status.includes("✅") ? 'COMPLETE' : 
                             item.status.includes("❌") ? 'MISSING' : 'IN PROGRESS'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.assignedTo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.dueDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'risks' && (
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Risk Analysis</h2>
              <div className="space-y-4">
                {mockData.risks.map((risk, index) => (
                  <div key={index} className="border-l-4 pl-4 ${
                    risk.risk === 'High' ? 'border-red-500 bg-red-50' : 
                    risk.risk === 'Medium' ? 'border-yellow-500 bg-yellow-50' : 'border-green-500 bg-green-50'
                  } p-4 rounded">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{risk.clause}</h3>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        risk.risk === 'High' ? 'bg-red-100 text-red-800' : 
                        risk.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {risk.risk.toUpperCase()}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Recommendation:</span> {risk.suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Recommendations</h2>
              <ul className="space-y-3">
                {mockData.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 text-indigo-600">{index + 1}.</span>
                    <span className="ml-2">{rec}</span>
                  </li>
                ))}
              </ul>
              
              <h3 className="text-lg font-bold mt-8 mb-4">Submission Timeline</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(mockData.timeline).map(([milestone, date]) => (
                      <tr key={milestone}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {milestone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Report Download */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Download Comprehensive Report</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <p className="text-gray-700 mb-4">
                Generate a professional PDF report containing all analysis results, recommendations, and action items.
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Executive summary and compliance overview</li>
                <li>Detailed eligibility verification</li>
                <li>Complete submission checklist with due dates</li>
                <li>Risk analysis with mitigation strategies</li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Generate PDF Report
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}