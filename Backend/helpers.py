from config import Config
import os
import nest_asyncio
from langchain.embeddings import HuggingFaceHubEmbeddings
from dotenv import load_dotenv
from llama_parse import LlamaParse
from langchain.chains import RetrievalQA
from langchain_google_genai import ChatGoogleGenerativeAI  # Changed to Google Gemini
import json
from langchain_community.vectorstores import Chroma
from langgraph.graph import StateGraph, END
from typing import Dict, List, Union, Any, TypedDict, Optional
from langchain_core.messages import BaseMessage, FunctionMessage, HumanMessage, AIMessage
from pydantic import BaseModel, Field
import docx
import chromadb

class RFPHelper():
    def allowed_file(self, filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in Config().ALLOWED_EXTENSIONS

# Initialize Flask app with CORS support
# Apply asyncio for async operations
nest_asyncio.apply()
load_dotenv()

# Load environment variables
google_api_key = os.environ.get("GOOGLE_API_KEY")  # Changed to GOOGLE_API_KEY
llama_parse_api_key = os.environ.get("LLAMA_PARSE_API_KEY")
huggingfacehub_api_token = os.environ.get("HUGGINGFACEHUB_API_TOKEN")

if not all([google_api_key, llama_parse_api_key, huggingfacehub_api_token]):
    raise ValueError("One or more API keys are missing in your .env file.")

# Initialize LlamaParse
parser = LlamaParse(
    result_type="markdown",
    api_key=llama_parse_api_key,
)

# Initialize embeddings model
model_name = "sentence-transformers/all-mpnet-base-v2"
hf_embeddings = HuggingFaceHubEmbeddings(
    model=model_name,
    task="feature-extraction",
    huggingfacehub_api_token=huggingfacehub_api_token,
)

# Initialize LLM with Google Gemini Pro
llm = ChatGoogleGenerativeAI(
    google_api_key=google_api_key,
    model="gemini-2.5-pro-preview-03-25",  # Using Gemini Pro model
    temperature=0.2,  # Lower temperature for more deterministic outputs
    max_output_tokens=4000,  # Adjust based on your needs
    top_p=0.95,
    top_k=40,
    convert_system_message_to_human=True  # Required for Gemini to handle system messages
)

def build_multi_agent_graph():
    """Builds the graph for multi-agent orchestration with conditional execution"""
    builder = StateGraph(MultiAgentState)

    # Add all the agent nodes
    builder.add_node("eligibility_agent", eligibility_agent)
    builder.add_node("checklist_agent", checklist_agent)
    builder.add_node("risk_agent", risk_agent)
    builder.add_node("criteria_agent", criteria_agent)
    builder.add_node("summary_agent", summary_agent)
    builder.add_node("prepare_response", prepare_response)

    # Set the entry point
    builder.set_entry_point("eligibility_agent")

    # Add conditional paths based on eligibility
    builder.add_conditional_edges(
        "eligibility_agent",
        route_based_on_eligibility,
        {
            "eligible": "checklist_agent",
            "not_eligible": "prepare_response"
        }
    )

    # Add rest of the graph for the eligible path
    builder.add_edge("checklist_agent", "risk_agent")
    builder.add_edge("risk_agent", "criteria_agent")
    builder.add_edge("criteria_agent", "summary_agent")
    builder.add_edge("summary_agent", "prepare_response")

    # Add final edge to end
    builder.add_edge("prepare_response", END)

    return builder.compile()

# Helper Functions
def setup_chroma_vector_store(embedding, collection_name="rfp_collection"):
    client = chromadb.Client()
    vector_store = Chroma(
        collection_name=collection_name,
        embedding_function=embedding,
        client=client,
        persist_directory="./chroma_db"
    )
    print(f"Chroma vector store initialized with collection: {collection_name}")
    return vector_store


def parse_document_llama_parse(file_path):
    try:
        if file_path.lower().endswith(".pdf"):
            print("Parsing PDF document with LlamaParse (metadata discarded)...")
            documents_from_llama_parse = parser.load_data(file_path=file_path)
            full_document_text = ""
            for doc in documents_from_llama_parse:
                full_document_text += doc.text + "\n\n"
            return full_document_text.strip()
        elif file_path.lower().endswith(".docx"):
            print("Parsing DOCX document with python-docx...")
            doc = docx.Document(file_path)
            text_list = [paragraph.text for paragraph in doc.paragraphs]
            return "\n\n".join(text_list)
        else:
            print(f"Unsupported file type: {file_path}. Only PDF and DOCX files are supported.")
            return None
    except Exception as e:
        print(f"Error parsing document: {e}")
        return None


def parse_docx_company_data():
        return {
            "company": {
                "legal_name": "FirstStaff Workforce Solutions, LLC",
                "principal_business_address": "3105 Maple Avenue, Suite 1200, Dallas, TX 75201",
                "phone_number": "(214) 832-4455",
                "fax_number": "(214) 832-4460",
                "email_address": "proposals@firststaffsolutions.com",
                "authorized_representative": {
                    "name": "Meredith Chan",
                    "title": "Director of Contracts",
                    "phone": "(212) 555-0199",
                    "signature": "Meredith Chan (signed manually)"
                },
                "length_of_existence_years": 9,
                "years_of_experience_in_temp_staffing": 7,
                "duns_number": "07-842-1490",
                "cage_code": "8J4T7",
                "sam_registration_date": "2022-03-01",
                "naics_codes": [
                    "561320 – Temporary Help Services",
                    "541611 – Admin Management"
                ],
                "state_of_incorporation": "Delaware",
                "state_registration_number": "SRN-DE-0923847",
                "bank_letter_of_creditworthiness": "Not Available",
                "services_provided": [
                    "Administrative Staffing",
                    "IT Staffing",
                    "Legal Staffing",
                    "Credentialing Staffing"
                ],
                "business_structure": "Limited Liability Company (LLC)",
                "w9_form": {
                    "attached": True,
                    "tin": "47-6392011"
                },
                "certificate_of_insurance": {
                    "provider": "Travelers Insurance",
                    "policy_number": "TX-884529-A",
                    "coverage": [
                        "Workers' Comp",
                        "Liability",
                        "Auto"
                    ]
                },
                "licenses": [
                    {
                        "name": "Texas Employment Agency License",
                        "number": "TXEA-34892"
                    }
                ],
                "hub_dbe_status": "Not certified",
                "mbe_certification": False,
                "key_personnel": {
                    "project_manager": "Ramesh Iyer",
                    "technical_lead": "Sarah Collins",
                    "security_auditor": "James Wu"
                }
            }
        }


def embed_and_store_in_chroma(vector_store, document_text):
    if not document_text:
        print("No document text to embed.")
        return None

    chunk_size = 1000
    texts = [document_text[i:i + chunk_size] for i in range(0, len(document_text), chunk_size)]

    print(f"Embedding {len(texts)} document chunks and storing in Chroma")

    try:
        vector_store.add_texts(
            texts=texts,
            metadatas=None
        )
        print("Document chunks successfully embedded and stored in Chroma.")
    except Exception as e:
        print(f"Error storing in Chroma: {e}")
        return None

    return vector_store


def create_retrieval_qa_chain(vectorstore):
    return RetrievalQA.from_chain_type(
        llm=llm,
        retriever=vectorstore.as_retriever(search_kwargs={'k': 10}),
        chain_type="stuff"
    )


# ===== AGENT 1: ELIGIBILITY ASSESSMENT AGENT =====
def check_eligibility(company_data, eligibility_qa_chain):
    print(company_data)
    """First agent: determines if company meets basic eligibility to proceed"""
    prompt = f"""
    You are the PRIMARY ELIGIBILITY ASSESSMENT AGENT responsible for determining if a company meets the minimum qualifying criteria to bid on an RFP.

    TASK: So we have this RFP first analyze it in brief 
          Then we have to check whether are the Company is Eligible or not Check their Compliance, Legal, Certifications, Insurance, Experience & Other Requirements (all are strict). Company Data is given below
          Check the Companies Core Business even it matches with the RFP or not. 
          There can be some Form which are asked to fill, so they just needed to be filled so we can ignore them
          Sometimes they do some kind of seminars/invitations/Pre-Proposal Conference, so we can ignore them
          Mainly we are focusing on the requirements and legal issues regarding licenses, registration, Experience, etc.
          Some Documents like reports, annual, Affidavit reports, financial etc. can be ignored as they can be provided in the future.

    Company Data:
    {json.dumps(company_data, indent=2)}

    ```
    ## Eligibility Determination

    ### Mandatory Criteria Assessed
    1. [Criterion 1: Detail]: [Met/Not Met/Insufficient Data] - [Evidence from company data]
    2. [Criterion 2: Detail]: [Met/Not Met/Insufficient Data] - [Evidence from company data]
    ...

    ### Missing Information
    - [List any critical information gaps]

    ### FINAL ELIGIBILITY ASSESSMENT
    PROCEED: [YES/NO]
    CONFIDENCE: [High/Medium/Low]
    RATIONALE: [Brief explanation of decision]
    ```
    
    ### Final Output Format
    We will be strictly using json as this data has to be sent to frontend so do not add any formatting.
    - proceed: yes/no
    - confidence: high/medium/low
    - eligibilities: 
        - eligibility_name: name of eligibility like license, registration etc.
        - eligibility_passed: true/false
    - detailed_explanation: brief explanation of decision

    Remember: Be extremely thorough in identifying mandatory requirements, but ONLY assess eligibility on clearly stated requirements, not preferences or non-mandatory items.
    """

    # Use the retrieval QA chain to get relevant RFP sections and analyze them
    response = eligibility_qa_chain.invoke({"query": prompt})
    return response["result"]


# ===== AGENT 2: CHECKLIST GENERATION AGENT =====
def generate_checklist(company_data, checklist_qa_chain):
    """Second agent: generates submission checklist if eligible"""
    prompt = f"""
    You are the RFP SUBMISSION CHECKLIST AGENT. 

    TASK: Create a comprehensive submission checklist ONLY for items that are specifically required in the RFP.

    Company Profile:
    {json.dumps(company_data, indent=2)}

    Please:

    1. EXTRACT ALL REQUIRED SUBMISSION COMPONENTS:
       - Required forms and attachments (with exact form names/numbers)
       - Required documentation (certificates, financials, references)
       - Structure/organization requirements (tabs, sections, page limitations)
       - Format specifications (font, margins, file types)
       - Submission logistics (physical copies, electronic formats, delivery method)

    2. IDENTIFY COMPLETION STATUS:
       - Map each requirement to company data
       - Mark items as:
         * COMPLETE: Company has this ready (cite evidence)
         * PARTIAL: Some progress but not ready (specify what's missing)
         * MISSING: No evidence company has this item

    3. PRIORITIZE THE CHECKLIST:
       - Flag "deal-breaker" items that would cause immediate disqualification
       - Note items with specific deadlines
       - Identify long-lead items that need significant preparation time

    Your output MUST follow this format:

    ```
    # RFP Submission Checklist

    ## Critical Submission Components
    | Requirement | RFP Reference | Status | Action Needed | Deadline |
    |-------------|--------------|--------|---------------|----------|
    | [Component] | [Page/Section] | [Complete/Partial/Missing] | [Specific action] | [Date if any] |

    ## Documentation Requirements
    | Document | RFP Reference | Status | Action Needed | Deadline |
    |----------|--------------|--------|---------------|----------|
    | [Document] | [Page/Section] | [Complete/Partial/Missing] | [Specific action] | [Date if any] |

    ## Format Requirements
    - [Requirement]: [Status] - [Action if needed]

    ## Submission Instructions
    - Due Date: [Exact date and time]
    - Submission Method: [Electronic/Physical/Both]
    - [Other specific instructions]

    ## High Priority Items
    1. [Item] - [Reason for priority] - [Deadline]
    ```

    Remember: Your checklist must be COMPREHENSIVE and PRECISE. Include EVERY required item from the RFP.
    """

    # Use the retrieval QA chain to get relevant RFP sections and analyze them
    response = checklist_qa_chain.invoke({"query": prompt})
    return response["result"]


# ===== AGENT 3: RISK ANALYSIS AGENT =====
def analyze_risk(company_data, risk_qa_chain):
    """Third agent: performs contract risk analysis if eligible"""
    prompt = f"""
    You are the CONTRACT RISK ANALYSIS AGENT specializing in government and commercial RFPs.

    TASK: Identify and assess specific contractual risks in the RFP that could impact project profitability, liability, or compliance.

    Company Profile and Risk Tolerance:
    {json.dumps(company_data, indent=2)}

    Please provide:

    1. RISK IDENTIFICATION:
       - Extract ALL contractual clauses representing risk, including:
         * Liability provisions (indemnification, warranties, guarantees)
         * Payment terms (timing, holdbacks, penalties)
         * Termination clauses (especially unilateral)
         * Intellectual property rights
         * Performance guarantees and penalties
         * Insurance and bonding requirements
         * Change order/scope change provisions

    2. CLAUSE-BY-CLAUSE RISK ASSESSMENT:
       - For each identified clause:
         * Quote the EXACT language from the RFP
         * Assign risk level: HIGH/MEDIUM/LOW
         * Explain the specific business/legal impact
         * Compare to standard industry terms

    3. MITIGATION RECOMMENDATIONS:
       - For HIGH and MEDIUM risks:
         * Suggest alternative language
         * Propose operational mitigations
         * Identify insurance or other transfer mechanisms

    4. DEAL-BREAKERS:
       - Flag any provisions that might be non-negotiable deal-breakers

    Your output MUST use this exact structure:

    ```
    # Contract Risk Analysis

    ## Executive Summary
    - Overall risk profile: [HIGH/MEDIUM/LOW]
    - Key concerns: [Brief summary of top 3-5 issues]

    ## High-Risk Provisions

    ### [Clause name/reference]
    - **RFP Language**: "[Exact quote]"
    - **Risk Level**: HIGH
    - **Impact**: [Specific business consequences]
    - **Industry Standard**: [How this differs from normal]
    - **Mitigation Strategy**: [Specific recommendation]

    ## Medium-Risk Provisions
    [Same format as above]

    ## Low-Risk Provisions
    [Same format as above]

    ## Potential Deal-Breakers
    1. [Provision] - [Reason]

    ## Negotiation Priorities
    1. [Highest priority item to negotiate]
    2. [Second priority]
    ...
    ```

    Remember: Be extremely precise in quoting contract language. Your analysis should focus ONLY on contractual/legal risks, not technical or operational risks.
    """

    # Use the retrieval QA chain to get relevant RFP sections and analyze them
    response = risk_qa_chain.invoke({"query": prompt})
    return response["result"]


# ===== AGENT 4: COMPETITIVE ANALYSIS AGENT =====
def extract_criteria(company_data, criteria_qa_chain):
    """Fourth agent: analyzes competitive positioning if eligible"""
    prompt = f"""
    You are the COMPETITIVE POSITIONING ANALYST specializing in RFP evaluation criteria.

    TASK: Extract all evaluation criteria and assess the company's competitive position against these criteria.

    Company Profile:
    {json.dumps(company_data, indent=2)}

    Please provide:

    1. FORMAL EVALUATION CRITERIA:
       - Extract ALL formal scoring criteria from the RFP
       - Identify point values or weighting for each criterion
       - Note both mandatory requirements and preference factors
       - Organize by category (technical, management, past performance, price, etc.)

    2. COMPETITIVE ASSESSMENT:
       - For each criterion:
         * Assess company's likely score based on provided data
         * Identify strengths that can be emphasized
         * Flag weaknesses or gaps that need addressing

    3. DIFFERENTIATORS:
       - Identify areas where the company can showcase unique advantages
       - Suggest specific proof points from company data
       - Recommend themes or messaging to emphasize

    4. WIN STRATEGY:
       - Suggest structure for the proposal to maximize scoring
       - Identify 3-5 key win themes based on evaluation criteria
       - Recommend allocation of page count/effort based on point values

    Your output MUST follow this exact format:

    ```
    # Competitive Position Analysis

    ## Evaluation Criteria Summary
    | Criterion | Weight/Points | Category | Company Position | Gap/Opportunity |
    |-----------|--------------|----------|------------------|-----------------|
    | [Criterion] | [Points/Weight] | [Category] | [Strong/Moderate/Weak] | [Specific gap or opportunity] |

    ## Technical Criteria
    ### [Criterion 1]
    - **Weight**: [Points or percentage]
    - **Requirement**: [What RFP asks for]
    - **Company Position**: [Assessment]
    - **Evidence**: [Company data supporting this]
    - **Gap/Opportunity**: [What to address or emphasize]

    [Repeat for all criteria categories: Management, Past Performance, Price, etc.]

    ## Key Competitive Advantages
    1. [Advantage 1]: [How to emphasize]
    2. [Advantage 2]: [How to emphasize]
    ...

    ## Critical Weaknesses to Address
    1. [Weakness 1]: [Mitigation strategy]
    2. [Weakness 2]: [Mitigation strategy]
    ...

    ## Win Strategy
    - **Theme 1**: [Key message]
    - **Theme 2**: [Key message]
    ...
    ```

    Remember: Base your assessment SOLELY on the evaluation criteria in the RFP and the company data provided. Be data-driven and specific in your recommendations.
    """

    # Use the retrieval QA chain to get relevant RFP sections and analyze them
    response = criteria_qa_chain.invoke({"query": prompt})
    return response["result"]


# ===== AGENT 5: EXECUTIVE SUMMARY AGENT =====
def generate_executive_summary(eligibility_result, checklist_result, risk_result, criteria_result, summary_qa_chain):
    """Fifth agent: creates executive summary of all analysis if eligible"""
    prompt = f"""
    You are the EXECUTIVE SUMMARY AGENT for RFP analysis.

    TASK: Synthesize the findings from all previous agents into a clear, concise executive summary for senior decision-makers.

    Previous Agent Outputs:

    === ELIGIBILITY ASSESSMENT ===
    {eligibility_result}

    === SUBMISSION CHECKLIST ===
    {checklist_result}

    === RISK ANALYSIS ===
    {risk_result}

    === COMPETITIVE ANALYSIS ===
    {criteria_result}

    Please create:

    1. OPPORTUNITY OVERVIEW:
       - Brief description of the RFP opportunity
       - Key dates and financial scope
       - Strategic fit for the company

    2. GO/NO-GO RECOMMENDATION:
       - Clear recommendation on whether to pursue
       - Key factors supporting this recommendation
       - Confidence level in recommendation

    3. KEY CONSIDERATIONS:
       - Top 3-5 factors that influenced the recommendation
       - Critical risks and mitigations
       - Competitive advantages and disadvantages

    4. NEXT STEPS:
       - Critical path actions with owners and deadlines
       - Resource requirements for successful pursuit
       - Dependencies or potential blockers

    Your output MUST use this format:

    ```
    # Executive Summary: [RFP Name/Number]

    ## Opportunity Assessment
    - **Opportunity**: [Brief description]
    - **Value**: [Estimated contract value]
    - **Deadlines**: [Key submission dates]
    - **Strategic Fit**: [High/Medium/Low] - [Explanation]

    ## Recommendation
    **Decision**: [PURSUE / DO NOT PURSUE]
    **Confidence**: [High/Medium/Low]

    **Rationale**:
    [3-5 bullet points explaining recommendation]

    ## Critical Factors

    ### Strengths
    - [Key strength 1]
    - [Key strength 2]
    ...

    ### Concerns
    - [Key concern 1]
    - [Key concern 2]
    ...

    ## Action Plan
    | Action | Owner | Timeline | Priority |
    |--------|-------|----------|----------|
    | [Action] | [Role] | [Timeframe] | [High/Med/Low] |

    ## Resource Requirements
    - [Specific resource requirements]
    ```

    Remember: Your summary must be CONCISE, BALANCED, and FACTUAL. Focus on the most decision-critical information. Your primary audience is executives who need to make a pursuit decision.
    """

    # Use the retrieval QA chain to get relevant RFP sections and analyze them
    response = summary_qa_chain.invoke({"query": prompt})
    return response["result"]


# Multi-agent orchestration state definition
class MultiAgentState(BaseModel):
    # Input data
    company_data: dict = None
    eligibility_qa_chain: RetrievalQA = None
    checklist_qa_chain: RetrievalQA = None
    risk_qa_chain: RetrievalQA = None
    criteria_qa_chain: RetrievalQA = None
    summary_qa_chain: RetrievalQA = None

    # Process tracking
    current_agent: str = "eligibility_agent"
    eligibility_decision: str = None

    # Agent outputs
    eligibility_result: str = None
    checklist_result: str = None
    risk_result: str = None
    criteria_result: str = None
    executive_summary: str = None

    # Final response
    final_response: dict = None

    class Config:
        arbitrary_types_allowed = True


# Agent nodes for multi-agent graph
def eligibility_agent(state: MultiAgentState):
    """First agent: performs eligibility check"""
    print("Running eligibility agent...")

    result = check_eligibility(state.company_data, state.eligibility_qa_chain)
    cleaned_data = result.strip("```").strip("json").strip()
    result = json.loads(cleaned_data)

    if result['proceed']:
        eligibility_decision = "YES"
    else:
        eligibility_decision = "NO"

    print(f"Eligibility decision: {eligibility_decision}")
    print(result)

    return {
        "eligibility_result": str(result),
        "eligibility_decision": eligibility_decision
    }


def checklist_agent(state: MultiAgentState):
    """Second agent: generates submission checklist if eligible"""
    print("Running checklist agent...")
    result = generate_checklist(state.company_data, state.checklist_qa_chain)
    print(result)
    return {"checklist_result": result}


def risk_agent(state: MultiAgentState):
    """Third agent: analyzes contract risks if eligible"""
    print("Running risk agent...")
    result = analyze_risk(state.company_data, state.risk_qa_chain)
    print(result)
    return {"risk_result": result}


def criteria_agent(state: MultiAgentState):
    """Fourth agent: analyzes competitive positioning if eligible"""
    print("Running criteria agent...")
    result = extract_criteria(state.company_data, state.criteria_qa_chain)
    print(result)
    return {"criteria_result": result}


def summary_agent(state: MultiAgentState):
    """Fifth agent: creates executive summary of all analyses"""
    print("Running executive summary agent...")
    result = generate_executive_summary(
        state.eligibility_result,
        state.checklist_result,
        state.risk_result,
        state.criteria_result,
        state.summary_qa_chain
    )
    print(result)
    return {"executive_summary": result}


def prepare_response(state: MultiAgentState):
    """Final node: prepares the response based on whether company is eligible"""
    print("Preparing final response...")

    if state.eligibility_decision == "YES":
        print("Company is eligible - including all analyses")
        # Include all analysis results
        response = {
            "eligible": True,
            "eligibility_details": state.eligibility_result,
            "submission_checklist": state.checklist_result,
            "risk_analysis": state.risk_result,
            "competitive_analysis": state.criteria_result,
            "executive_summary": state.executive_summary
        }
    else:
        print("Company is not eligible - only returning eligibility result")
        # Only include eligibility results since company isn't eligible for further analysis
        response = {
            "eligible": False,
            "eligibility_details": state.eligibility_result,
            "message": "The company does not meet the minimum eligibility requirements for this RFP. No further analysis was performed."
        }

    return {"final_response": response}


# Route conditions based on eligibility
def route_based_on_eligibility(state: MultiAgentState):
    """Determine which path to take based on eligibility"""
    if state.eligibility_decision == "YES":
        print("Eligible path: continuing with further analysis")
        return "eligible"
    else:
        print("Not eligible path: skipping to response preparation")
        return "not_eligible"


# Build the multi-agent orchestration graph
def build_multi_agent_graph():
    """Builds the graph for multi-agent orchestration with conditional execution"""
    builder = StateGraph(MultiAgentState)

    # Add all the agent nodes
    builder.add_node("eligibility_agent", eligibility_agent)
    builder.add_node("checklist_agent", checklist_agent)
    builder.add_node("risk_agent", risk_agent)
    builder.add_node("criteria_agent", criteria_agent)
    builder.add_node("summary_agent", summary_agent)
    builder.add_node("prepare_response", prepare_response)

    # Set the entry point
    builder.set_entry_point("eligibility_agent")

    # Add conditional paths based on eligibility
    builder.add_conditional_edges(
        "eligibility_agent",
        route_based_on_eligibility,
        {
            "eligible": "checklist_agent",
            "not_eligible": "prepare_response"
        }
    )

    # Add rest of the graph for the eligible path
    builder.add_edge("checklist_agent", "risk_agent")
    builder.add_edge("risk_agent", "criteria_agent")
    builder.add_edge("criteria_agent", "summary_agent")
    builder.add_edge("summary_agent", "prepare_response")

    # Add final edge to end
    builder.add_edge("prepare_response", END)

    return builder.compile()