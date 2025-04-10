from dotenv import load_dotenv
import os

load_dotenv()
class Config():
    PINECONE_API_KEY = os.getenv('PINECONE_API_KEY')
    ALLOWED_EXTENSIONS = {'pdf'}
    UPLOAD_FOLDER = "RFPs"

