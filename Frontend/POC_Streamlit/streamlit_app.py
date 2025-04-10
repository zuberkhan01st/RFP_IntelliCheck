import streamlit as st
import pandas as pd
import random
from fpdf import FPDF
from datetime import datetime, timedelta
import time
import base64
from io import BytesIO

# --- Page Config ---
st.set_page_config(
    page_title="RFP IntelliCheck Pro",
    page_icon="📑",
    layout="wide"
)

# --- Custom CSS ---
st.markdown("""
<style>
    .success { color: #28a745; font-weight: bold; }
    .warning { color: #ffc107; font-weight: bold; }
    .danger { color: #dc3545; font-weight: bold; }
    .progress-bar {
        height: 20px;
        background-color: #e9ecef;
        border-radius: 4px;
        margin: 10px 0;
    }
    .progress-fill {
        height: 100%;
        border-radius: 4px;
    }
    .risk-high { background-color: #dc3545; }
    .risk-medium { background-color: #ffc107; }
    .risk-low { background-color: #28a745; }
    .stButton>button {
        background-color: #4e4376;
        color: white;
    }
    .report-section {
        background-color: #f8f9fa;
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 15px;
    }
</style>
""", unsafe_allow_html=True)

# --- Enhanced Mock Data Generator ---
def generate_mock_analysis(rfp_text=""):
    risk_levels = ["High", "Medium", "Low"]
    risk_colors = {"High": "danger", "Medium": "warning", "Low": "success"}

    return {
        "rfp_title": "Temporary IT Staffing Services for Texas State Agencies",
        "rfp_agency": "Texas Department of Information Resources (DIR)",
        "rfp_number": "DIR-SDD-24-001",
        "rfp_release_date": "2024-05-15",
        "compliance_score": random.randint(60, 95),
        "executive_summary": "Our analysis shows strong compliance with the RFP requirements, scoring 85%. All mandatory requirements are met except for HUB certification. We identified two moderate-risk clauses that require negotiation. The submission checklist is 80% complete, with only the SF-33 form remaining.",
        "eligibility": [
            {"requirement": "SAM.gov Registration", "status": "✅ PASS", "detail": "Registered since 03/01/2022 (CAGE: 8J4T7)"},
            {"requirement": "State License", "status": "✅ PASS", "detail": "Valid license #TXEA-34892 (Expires 12/2025)"},
            {"requirement": "HUB Certification", "status": "❌ FAIL", "detail": "Not certified (reduces scoring priority by 10%)"}
        ],
        "checklist": [
            {"item": "W-9 Form", "status": "✅ Complete", "detail": "Attached (TIN: 47-6392011)", "assigned_to": "Legal Dept", "due_date": "Completed"},
            {"item": "Certificate of Insurance", "status": "✅ Complete", "detail": "Policy #TX-884529-A (Expires 12/2025)", "assigned_to": "Finance", "due_date": "Completed"},
            {"item": "SF-33 Form", "status": "❌ Missing", "detail": "Required - [Download Form](https://www.acquisition.gov/forms)", "assigned_to": "Contracts Team", "due_date": (datetime.now() + timedelta(days=5)).strftime("%Y-%m-%d")},
            {"item": "Past Performance", "status": "✅ Complete", "detail": "3 case studies attached", "assigned_to": "Business Dev", "due_date": "Completed"},
            {"item": "Technical Proposal", "status": "🔄 In Progress", "detail": "Draft 80% complete", "assigned_to": "Tech Team", "due_date": (datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d")}
        ],
        "risks": [
            {"clause": "90-Day Termination", "risk": "Medium", "suggestion": "Negotiate for 30-day notice period", "impact": "Moderate financial risk if contract is terminated abruptly"},
            {"clause": "Net 45 Payment", "risk": "Medium", "suggestion": "Request Net 30 terms to improve cash flow", "impact": "Will affect working capital for first 2 months"},
            {"clause": "Liquidated Damages", "risk": "Low", "suggestion": "Acceptable as written", "impact": "Standard terms, minimal exposure"}
        ],
        "recommendations": [
            "Partner with HUB-certified subcontractor to improve scoring by 10%",
            "Prioritize negotiation of termination clause with legal team",
            "Complete SF-33 form submission by deadline",
            "Highlight our 7 years of experience in temporary staffing in executive summary",
            "Include 3 case studies of similar government projects"
        ],
        "timeline": {
            "RFP Release Date": "2024-05-15",
            "Questions Due": "2024-05-22",
            "Answers Published": "2024-05-29",
            "Internal Review": (datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d"),
            "Final Approval": (datetime.now() + timedelta(days=10)).strftime("%Y-%m-%d"),
            "Submission Deadline": (datetime.now() + timedelta(days=14)).strftime("%Y-%m-%d")
        },
        "key_personnel": [
            {"name": "Ramesh Iyer", "role": "Project Manager", "experience": "7 years in IT staffing", "relevant_certs": "PMP, ITIL"},
            {"name": "Sarah Collins", "role": "Technical Lead", "experience": "AWS-certified, 6 years experience", "relevant_certs": "AWS Solutions Architect"},
            {"name": "James Wu", "role": "Security Auditor", "experience": "5 years in gov contracts", "relevant_certs": "CISSP, CISM"}
        ],
        "scoring_criteria": [
            {"criteria": "Technical Approach", "weight": "40%", "strength": "Strong", "notes": "Our methodology scored 95% in similar RFPs"},
            {"criteria": "Past Performance", "weight": "30%", "strength": "Strong", "notes": "3 relevant case studies available"},
            {"criteria": "Price", "weight": "20%", "strength": "Competitive", "notes": "Will be within 5% of market rate"},
            {"criteria": "Small Business", "weight": "10%", "strength": "Weak", "notes": "Missing HUB certification"}
        ]
    }

# --- Enhanced PDF Generator ---
def generate_comprehensive_pdf(data):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    
    # Cover Page
    pdf.set_font("Arial", 'B', 20)
    pdf.cell(0, 20, txt="RFP Compliance Report", ln=1, align='C')
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(0, 15, txt=data['rfp_title'], ln=1, align='C')
    pdf.cell(0, 10, txt=f"Issued by: {data['rfp_agency']}", ln=1, align='C')
    pdf.cell(0, 10, txt=f"RFP Number: {data['rfp_number']}", ln=1, align='C')
    
    # Compliance Score with color
    if data['compliance_score'] > 80:
        pdf.set_text_color(40, 167, 69)  # Green
        verdict = "READY TO SUBMIT"
    elif data['compliance_score'] > 60:
        pdf.set_text_color(255, 193, 7)  # Yellow
        verdict = "NEEDS REVIEW"
    else:
        pdf.set_text_color(220, 53, 69)  # Red
        verdict = "NOT READY - MAJOR ISSUES"
    
    pdf.set_font("Arial", 'B', 24)
    pdf.cell(0, 20, txt=f"Compliance Score: {data['compliance_score']}%", ln=1, align='C')
    pdf.cell(0, 10, txt=verdict, ln=1, align='C')
    pdf.set_text_color(0, 0, 0)  # Reset to black
    
    pdf.ln(20)
    pdf.set_font("Arial", 'I', 12)
    pdf.cell(0, 10, txt=f"Report generated on: {datetime.now().strftime('%Y-%m-%d %H:%M')}", ln=1, align='C')
    pdf.ln(15)
    
    # Table of Contents
    pdf.add_page()
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(0, 10, txt="Table of Contents", ln=1)
    pdf.set_font("Arial", '', 12)
    
    sections = [
        ("Executive Summary", 3),
        ("Compliance Overview", 4),
        ("Eligibility Verification", 5),
        ("Submission Checklist", 6),
        ("Risk Analysis", 7),
        ("Scoring Criteria", 8),
        ("Key Personnel", 9),
        ("Recommendations", 10),
        ("Submission Timeline", 11),
        ("Next Steps", 12)
    ]
    
    for section, page in sections:
        pdf.cell(0, 10, txt=f"{section} ................................................ {page}", ln=1)
    
    # Executive Summary
    pdf.add_page()
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(0, 10, txt="1. Executive Summary", ln=1)
    pdf.set_font("Arial", '', 12)
    pdf.multi_cell(0, 8, txt=data['executive_summary'])
    pdf.ln(10)
    
    # Compliance Overview
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(0, 10, txt="2. Compliance Overview", ln=1)
    pdf.set_font("Arial", '', 12)
    
    # Score breakdown
    pdf.cell(40, 10, txt="Overall Score:", ln=0)
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(0, 10, txt=f"{data['compliance_score']}%", ln=1)
    pdf.set_font("Arial", '', 12)
    
    # Eligibility status
    pass_count = sum(1 for x in data['eligibility'] if "✅" in x['status'])
    fail_count = len(data['eligibility']) - pass_count
    pdf.cell(40, 10, txt="Eligibility:", ln=0)
    pdf.cell(0, 10, txt=f"{pass_count} passed, {fail_count} failed", ln=1)
    
    # Checklist status
    complete = sum(1 for x in data['checklist'] if "✅" in x['status'])
    missing = sum(1 for x in data['checklist'] if "❌" in x['status'])
    in_progress = len(data['checklist']) - complete - missing
    pdf.cell(40, 10, txt="Checklist:", ln=0)
    pdf.cell(0, 10, txt=f"{complete} complete, {in_progress} in progress, {missing} missing", ln=1)
    
    # Risk summary
    high = sum(1 for x in data['risks'] if x['risk'] == "High")
    medium = sum(1 for x in data['risks'] if x['risk'] == "Medium")
    low = sum(1 for x in data['risks'] if x['risk'] == "Low")
    pdf.cell(40, 10, txt="Risks:", ln=0)
    pdf.cell(0, 10, txt=f"{high} high, {medium} medium, {low} low", ln=1)
    pdf.ln(10)
    
    # Eligibility Verification
    pdf.add_page()
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(0, 10, txt="3. Eligibility Verification", ln=1)
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(90, 10, txt="Requirement", border=1, ln=0)
    pdf.cell(30, 10, txt="Status", border=1, ln=0)
    pdf.cell(0, 10, txt="Details", border=1, ln=1)
    pdf.set_font("Arial", '', 12)
    
    for item in data['eligibility']:
        status = "PASS" if "✅" in item['status'] else "FAIL"
        pdf.cell(90, 8, txt=item['requirement'], border=1, ln=0)
        pdf.cell(30, 8, txt=status, border=1, ln=0)
        pdf.multi_cell(0, 8, txt=item['detail'], border=1)
    
    # Submission Checklist
    pdf.add_page()
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(0, 10, txt="4. Submission Checklist", ln=1)
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(60, 10, txt="Item", border=1, ln=0)
    pdf.cell(30, 10, txt="Status", border=1, ln=0)
    pdf.cell(40, 10, txt="Assigned To", border=1, ln=0)
    pdf.cell(30, 10, txt="Due Date", border=1, ln=0)
    pdf.cell(0, 10, txt="Details", border=1, ln=1)
    pdf.set_font("Arial", '', 12)
    
    for item in data['checklist']:
        status = "COMPLETE" if "✅" in item['status'] else "MISSING" if "❌" in item['status'] else "IN PROGRESS"
        pdf.cell(60, 8, txt=item['item'], border=1, ln=0)
        pdf.cell(30, 8, txt=status, border=1, ln=0)
        pdf.cell(40, 8, txt=item['assigned_to'], border=1, ln=0)
        pdf.cell(30, 8, txt=item['due_date'], border=1, ln=0)
        pdf.multi_cell(0, 8, txt=item['detail'], border=1)
    
    # Risk Analysis
    pdf.add_page()
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(0, 10, txt="5. Risk Analysis", ln=1)
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(60, 10, txt="Clause", border=1, ln=0)
    pdf.cell(30, 10, txt="Risk Level", border=1, ln=0)
    pdf.cell(0, 10, txt="Recommendation", border=1, ln=1)
    pdf.set_font("Arial", '', 12)
    
    for risk in data['risks']:
        pdf.cell(60, 8, txt=risk['clause'], border=1, ln=0)
        pdf.cell(30, 8, txt=risk['risk'], border=1, ln=0)
        pdf.multi_cell(0, 8, txt=risk['suggestion'], border=1)
        pdf.cell(60, 8, txt="Potential Impact:", ln=0)
        pdf.set_font("Arial", 'I', 12)
        pdf.multi_cell(0, 8, txt=risk['impact'], border=1)
        pdf.set_font("Arial", '', 12)
        pdf.ln(2)
    
    # Scoring Criteria
    pdf.add_page()
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(0, 10, txt="6. Scoring Criteria", ln=1)
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(50, 10, txt="Criteria", border=1, ln=0)
    pdf.cell(30, 10, txt="Weight", border=1, ln=0)
    pdf.cell(40, 10, txt="Our Strength", border=1, ln=0)
    pdf.cell(0, 10, txt="Notes", border=1, ln=1)
    pdf.set_font("Arial", '', 12)
    
    for criteria in data['scoring_criteria']:
        pdf.cell(50, 8, txt=criteria['criteria'], border=1, ln=0)
        pdf.cell(30, 8, txt=criteria['weight'], border=1, ln=0)
        pdf.cell(40, 8, txt=criteria['strength'], border=1, ln=0)
        pdf.multi_cell(0, 8, txt=criteria['notes'], border=1)
    
    # Key Personnel
    pdf.add_page()
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(0, 10, txt="7. Key Personnel", ln=1)
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(50, 10, txt="Name", border=1, ln=0)
    pdf.cell(50, 10, txt="Role", border=1, ln=0)
    pdf.cell(40, 10, txt="Experience", border=1, ln=0)
    pdf.cell(0, 10, txt="Certifications", border=1, ln=1)
    pdf.set_font("Arial", '', 12)
    
    for person in data['key_personnel']:
        pdf.cell(50, 8, txt=person['name'], border=1, ln=0)
        pdf.cell(50, 8, txt=person['role'], border=1, ln=0)
        pdf.cell(40, 8, txt=person['experience'], border=1, ln=0)
        pdf.multi_cell(0, 8, txt=person['relevant_certs'], border=1)
    
    # Recommendations
    pdf.add_page()
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(0, 10, txt="8. Recommendations", ln=1)
    pdf.set_font("Arial", '', 12)
    
    for i, rec in enumerate(data['recommendations'], 1):
        pdf.cell(10, 8, txt=f"{i}.", ln=0)
        pdf.multi_cell(0, 8, txt=rec)
        pdf.ln(3)
    
    # Submission Timeline
    pdf.add_page()
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(0, 10, txt="9. Submission Timeline", ln=1)
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(80, 10, txt="Milestone", border=1, ln=0)
    pdf.cell(0, 10, txt="Date", border=1, ln=1)
    pdf.set_font("Arial", '', 12)
    
    for milestone, date in data['timeline'].items():
        pdf.cell(80, 8, txt=milestone.replace('_', ' ').title(), border=1, ln=0)
        pdf.cell(0, 8, txt=date, border=1, ln=1)
    
    # Next Steps
    pdf.add_page()
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(0, 10, txt="10. Next Steps", ln=1)
    pdf.set_font("Arial", '', 12)
    
    steps = [
        "1. Review all missing items in the checklist and assign owners",
        "2. Schedule negotiation meetings for high/medium risk clauses",
        "3. Complete all required documents by their due dates",
        "4. Conduct internal review of proposal materials",
        "5. Submit final proposal package before the deadline",
        "6. Prepare presentation materials for potential oral presentations"
    ]
    
    for step in steps:
        pdf.multi_cell(0, 8, txt=step)
        pdf.ln(3)
    
    # Final page
    pdf.set_font("Arial", 'I', 12)
    pdf.cell(0, 10, txt="Generated by RFP IntelliCheck Pro", ln=1, align='C')
    pdf.cell(0, 10, txt=f"Report generated on: {datetime.now().strftime('%Y-%m-%d %H:%M')}", ln=1, align='C')
    
    return pdf.output(dest='S').encode('latin1')

# --- Main App ---
st.title("📑 RFP IntelliCheck Pro")
st.caption("Advanced AI-powered RFP analysis platform")

# --- File Upload ---
uploaded_file = st.file_uploader("Upload RFP PDF", type=["pdf"], help="Upload the RFP document for analysis")

if uploaded_file:
    st.success(f"Uploaded: {uploaded_file.name}")
    
    # Simulate processing with progress bar
    progress_bar = st.progress(0)
    status_text = st.empty()
    
    for percent_complete in range(100):
        time.sleep(0.02)  # Simulate processing time
        progress_bar.progress(percent_complete + 1)
        status_text.text(f"Analyzing document... {percent_complete+1}%")
    
    mock_data = generate_mock_analysis()
    progress_bar.empty()
    status_text.empty()

    # --- Enhanced Results Dashboard ---
    st.subheader("Comprehensive Analysis Results")
    
    # Score Card with color coding
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("Compliance Score", f"{mock_data['compliance_score']}%", 
                 delta_color="off" if mock_data['compliance_score'] > 80 else "inverse")
    with col2:
        missing = sum(1 for x in mock_data["checklist"] if "❌" in x["status"])
        st.metric("Missing Items", missing, delta_color="inverse" if missing > 0 else "off")
    with col3:
        high_risks = sum(1 for x in mock_data["risks"] if x["risk"] == "High")
        st.metric("High Risks", high_risks, delta_color="inverse" if high_risks > 0 else "off")
    with col4:
        st.metric("Submission Deadline", mock_data["timeline"]["Submission Deadline"])
    
    # Executive Summary
    with st.expander("📌 Executive Summary", expanded=True):
        st.markdown(f"""
        **RFP Title:** {mock_data['rfp_title']}  
        **Agency:** {mock_data['rfp_agency']}  
        **RFP Number:** {mock_data['rfp_number']}  
        **Release Date:** {mock_data['rfp_release_date']}
        """)
        st.write(mock_data["executive_summary"])
        if mock_data['compliance_score'] > 80:
            st.success("✅ You meet all critical requirements and are ready to proceed!")
        else:
            st.warning("⚠️ Review the recommendations below before proceeding")
    
    # --- Enhanced Sections ---
    tab1, tab2, tab3, tab4, tab5, tab6 = st.tabs(["📋 Eligibility", "✅ Checklist", "⚠️ Risks", "📊 Scoring", "👥 Team", "💡 Recommendations"])
    
    with tab1:
        st.dataframe(
            pd.DataFrame(mock_data["eligibility"]),
            column_config={
                "requirement": "Requirement",
                "status": "Status",
                "detail": "Details"
            },
            hide_index=True,
            use_container_width=True,
            height=200
        )
    
    with tab2:
        df_checklist = pd.DataFrame(mock_data["checklist"])
        st.dataframe(
            df_checklist,
            column_config={
                "item": "Item",
                "status": "Status",
                "detail": "Details",
                "assigned_to": "Owner",
                "due_date": "Due Date"
            },
            hide_index=True,
            use_container_width=True,
            height=250
        )
    
    with tab3:
        df_risks = pd.DataFrame(mock_data["risks"])
        st.dataframe(
            df_risks,
            column_config={
                "clause": "Clause",
                "risk": "Risk Level",
                "suggestion": "Recommended Action",
                "impact": "Potential Impact"
            },
            hide_index=True,
            use_container_width=True,
            height=200
        )
        
        # Risk visualization
        risk_counts = df_risks["risk"].value_counts().to_dict()
        st.markdown("**Risk Distribution**")
        for risk, count in risk_counts.items():
            color = "#dc3545" if risk == "High" else "#ffc107" if risk == "Medium" else "#28a745"
            st.markdown(f"""
            <div style="display: flex; align-items: center; margin-bottom: 5px;">
                <div style="width: 100px; text-align: right; margin-right: 10px;">{risk}:</div>
                <div style="background-color: {color}; width: {count * 100}px; height: 20px; border-radius: 4px;"></div>
                <div style="margin-left: 10px;">{count}</div>
            </div>
            """, unsafe_allow_html=True)
    
    with tab4:
        st.dataframe(
            pd.DataFrame(mock_data["scoring_criteria"]),
            column_config={
                "criteria": "Criteria",
                "weight": "Weight",
                "strength": "Our Strength",
                "notes": "Notes"
            },
            hide_index=True,
            use_container_width=True,
            height=200
        )
    
    with tab5:
        st.dataframe(
            pd.DataFrame(mock_data["key_personnel"]),
            column_config={
                "name": "Name",
                "role": "Role",
                "experience": "Experience",
                "relevant_certs": "Certifications"
            },
            hide_index=True,
            use_container_width=True,
            height=200
        )
    
    with tab6:
        st.write("**Key Recommendations:**")
        for rec in mock_data["recommendations"]:
            st.markdown(f"- {rec}")
        
        st.write("\n**Proposal Timeline:**")
        timeline_df = pd.DataFrame.from_dict(mock_data["timeline"], orient="index", columns=["Date"])
        st.dataframe(timeline_df, use_container_width=True)
    
    # --- Enhanced PDF Download ---
    st.divider()
    st.subheader("Download Comprehensive Report")
    
    with st.container():
        col1, col2 = st.columns([3, 1])
        with col1:
            st.markdown("""
            **Generate a professional PDF report containing:**
            - Executive summary and compliance overview
            - Detailed eligibility verification
            - Complete submission checklist with due dates
            - Risk analysis with mitigation strategies
            - Scoring criteria assessment
            - Key personnel profiles
            - Actionable recommendations
            - Complete submission timeline
            - Next steps for your team
            """)
        
        with col2:
            if st.button("📄 Generate Full Report", use_container_width=True, type="primary"):
                with st.spinner("Generating professional PDF report..."):
                    pdf_data = generate_comprehensive_pdf(mock_data)
                    st.toast("Comprehensive report generated successfully!", icon="✅")
                    
                    # Create download button
                    st.download_button(
                        label="⬇️ Download Full Report",
                        data=pdf_data,
                        file_name=f"RFP_Report_{mock_data['rfp_number']}_{datetime.now().strftime('%Y%m%d')}.pdf",
                        mime="application/pdf",
                        use_container_width=True
                    )

else:
    # --- Enhanced Demo Placeholder ---
    st.info("Please upload an RFP document to begin analysis")
    st.divider()
    
    # How it works section
    st.subheader("How It Works")
    cols = st.columns(3)
    with cols[0]:
        st.markdown("""
        **1. Upload RFP**  
        Drag and drop any government RFP PDF
        """)
        st.image("https://via.placeholder.com/300x200?text=PDF+Upload", use_column_width=True)
    with cols[1]:
        st.markdown("""
        **2. AI Analysis**  
        Automated compliance, risk, and eligibility checks
        """)
        st.image("https://via.placeholder.com/300x200?text=AI+Analysis", use_column_width=True)
    with cols[2]:
        st.markdown("""
        **3. Actionable Insights**  
        Get recommendations and automated reports
        """)
        st.image("https://via.placeholder.com/300x200?text=Reports+Dashboard", use_column_width=True)
    
    # Key features
    st.divider()
    st.subheader("Key Features")
    feature_cols = st.columns(4)
    features = [
        ("📑", "PDF Parsing", "Extract key requirements automatically"),
        ("✅", "Compliance Check", "Verify all legal and technical requirements"),
        ("⚠️", "Risk Analysis", "Identify problematic contract clauses"),
        ("📊", "Win Strategy", "Recommendations to improve your bid"),
        ("📅", "Timeline Tracking", "Never miss a deadline"),
        ("👥", "Team Management", "Assign tasks to team members"),
        ("📈", "Scoring Analysis", "Understand evaluation criteria"),
        ("📤", "Report Generation", "Professional PDF exports")
    ]
    for col, (icon, title, desc) in zip(feature_cols, features):
        with col:
            st.markdown(f"**{icon} {title}**")
            st.caption(desc)