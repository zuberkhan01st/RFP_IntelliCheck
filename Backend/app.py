from flask import Flask, jsonify, request
from helpers import RFPHelper
import os
import tempfile
from config import Config
from flask_cors import CORS
import time
from helpers import setup_chroma_vector_store, parse_document_llama_parse, \
    parse_docx_company_data, build_multi_agent_graph, embed_and_store_in_chroma, hf_embeddings, create_retrieval_qa_chain

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Set up temporary directory for uploaded files
UPLOAD_FOLDER = tempfile.mkdtemp()
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def hello_world():
    return jsonify(
        {
            "message": "WORKING IN PROGRESS"
        }
    )

@app.route('/api/upload', methods=['POST'])
def upload_files():
    try:
        # Check if the required files are in the request
        if 'rfp_file' not in request.files:
            return jsonify({'error': 'Missing RFP file or company data file'}), 400

        rfp_file = request.files['rfp_file']

        # Check if files were actually selected
        if rfp_file.filename == '':
            return jsonify({'error': 'No selected files'}), 400

        # Save the uploaded files to temporary locations
        rfp_file_path = os.path.join(app.config['UPLOAD_FOLDER'], rfp_file.filename)

        rfp_file.save(rfp_file_path)

        # Process the company data
        company_data = parse_docx_company_data()
        if not company_data:
            return jsonify({'error': 'Failed to process company data file'}), 400

        # Parse the RFP document
        rfp_text = parse_document_llama_parse(rfp_file_path)
        if not rfp_text:
            return jsonify({'error': 'Failed to parse RFP file'}), 400

        # Set up vector store
        vector_store = setup_chroma_vector_store(hf_embeddings)
        if vector_store is None:
            return jsonify({'error': 'Failed to set up vector store'}), 500

        # Embed and store document
        vector_store = embed_and_store_in_chroma(vector_store, rfp_text)
        if vector_store is None:
            return jsonify({'error': 'Failed to embed document in vector store'}), 500

        # Create QA chains
        eligibility_qa_chain = create_retrieval_qa_chain(vector_store)
        checklist_qa_chain = create_retrieval_qa_chain(vector_store)
        risk_qa_chain = create_retrieval_qa_chain(vector_store)
        criteria_qa_chain = create_retrieval_qa_chain(vector_store)
        summary_qa_chain = create_retrieval_qa_chain(vector_store)

        # Save the prepared data in a session
        session_id = str(int(time.time()))

        # Store session data
        app.config[f'session_{session_id}'] = {
            'company_data': company_data,
            'eligibility_qa_chain': eligibility_qa_chain,
            'checklist_qa_chain': checklist_qa_chain,
            'risk_qa_chain': risk_qa_chain,
            'criteria_qa_chain': criteria_qa_chain,
            'summary_qa_chain': summary_qa_chain,
        }

        return jsonify({
            'message': 'Files uploaded and processed successfully',
            'session_id': session_id
        }), 200

    except Exception as e:
        print(f"Error in file upload: {str(e)}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/analyze', methods=['POST'])
def analyze_rfp():
    try:
        data = request.get_json()

        if not data or 'session_id' not in data:
            return jsonify({'error': 'Missing session_id in request'}), 400

        session_id = data['session_id']

        # Retrieve session data
        session_data = app.config.get(f'session_{session_id}')
        if not session_data:
            return jsonify({'error': 'Session not found or expired'}), 404

        # Build the multi-agent graph
        graph = build_multi_agent_graph()

        # Prepare inputs for the graph
        inputs = {
            "company_data": session_data['company_data'],
            "eligibility_qa_chain": session_data['eligibility_qa_chain'],
            "checklist_qa_chain": session_data['checklist_qa_chain'],
            "risk_qa_chain": session_data['risk_qa_chain'],
            "criteria_qa_chain": session_data['criteria_qa_chain'],
            "summary_qa_chain": session_data['summary_qa_chain'],
        }

        # Invoke the graph
        output = graph.invoke(inputs)

        if "final_response" in output:
            return jsonify(output["final_response"]), 200
        else:
            return jsonify({
                'error': 'No response generated',
                'state': str(output)
            }), 500

    except Exception as e:
        print(f"Error in analysis: {str(e)}")
        return jsonify({'error': str(e)}), 500


# Cleanup endpoint for session management
@app.route('/api/cleanup', methods=['POST'])
def cleanup_session():
    try:
        data = request.get_json()

        if not data or 'session_id' not in data:
            return jsonify({'error': 'Missing session_id in request'}), 400

        session_id = data['session_id']

        # Remove session data
        if f'session_{session_id}' in app.config:
            del app.config[f'session_{session_id}']

        return jsonify({
            'message': f'Session {session_id} cleaned up successfully'
        }), 200

    except Exception as e:
        print(f"Error in cleanup: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
