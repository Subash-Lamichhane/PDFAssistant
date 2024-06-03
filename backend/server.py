from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import PyPDF2
from llmware.models import ModelCatalog
import os
import uuid
import logging  # Added import for logging

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploaded_pdfs"
os.makedirs(UPLOAD_DIR, exist_ok=True)  # Ensures the directory is created if it does not exist

logging.basicConfig(level=logging.DEBUG)  # Set up logging

def extract_text(file_path: str, page_no: int) -> Optional[str]:  # Added type annotations
    try:
        with open(file_path, "rb") as file:
            pdf_reader = PyPDF2.PdfReader(file)
            if 0 <= page_no < len(pdf_reader.pages):
                page = pdf_reader.pages[page_no]
                return page.extract_text()
            else:
                logging.error(f"Page number {page_no} out of range for file {file_path}")  # Added detailed error logging
                return None
    except FileNotFoundError as e:
        logging.error(f"File not found: {e}")  # Added detailed error logging
        return None
    except Exception as e:
        logging.error(f"Error extracting text: {e}")  # Added detailed error logging
        return None

def summarize_text(text: str) -> str:  # Added type annotations
    if text:
        try:
            slim_model = ModelCatalog().load_model("slim-summary-tool")
            response = slim_model.function_call(text, params=["key points (3)"], function="summarize")
            return response["llm_response"]
        except Exception as e:
            logging.error(f"Error summarizing text: {e}")  # Added error handling and logging
            return "Error summarizing text"
    else:
        return "Invalid text"

def classify_tags(text: str) -> str:  # Added type annotations
    if text:
        try:
            slim_model = ModelCatalog().load_model("slim-tags-tool")
            response = slim_model.function_call(text, params=["tags"], function="classify")
            return response["llm_response"]
        except Exception as e:
            logging.error(f"Error classifying tags: {e}")  # Added error handling and logging
            return "Error classifying tags"
    else:
        return "Invalid text"

def identify_topic(text: str) -> str:  # Added type annotations
    if text:
        try:
            slim_model = ModelCatalog().load_model("slim-topics-tool")
            response = slim_model.function_call(text, params=["topics"], function="classify")
            return response["llm_response"]
        except Exception as e:
            logging.error(f"Error identifying topic: {e}")  # Added error handling and logging
            return "Error identifying topic"
    else:
        return "Invalid text"

def get_answer(text: str, question: str) -> str:  # Added type annotations
    if text:
        try:
            questions = f'"{question} (explain)"'  # Fixed string formatting
            slim_model = ModelCatalog().load_model("slim-boolean-tool")
            response = slim_model.function_call(text, params=[questions], function="boolean")
            return response["llm_response"]
        except Exception as e:
            logging.error(f"Error getting answer: {e}")  # Added error handling and logging
            return "Error getting answer"
    else:
        return "Invalid text"

@app.post("/process_pdf/")
async def process_pdf(
    function_name: str = Form(...),
    page_no: int = Form(...),
    question: Optional[str] = Form(None),
    file: UploadFile = File(...)
):
    logging.debug(f"Received function_name: {function_name}, page_no: {page_no}, question: {question}")  # Added logging
    logging.debug(f"File details: filename={file.filename}, content_type={file.content_type}")  # Added logging
    
    file_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}.pdf")

    try:
        with open(file_path, "wb") as f:
            f.write(await file.read())
        
        pdf_reader = PyPDF2.PdfReader(file_path)
        pdf_pages = len(pdf_reader.pages)
        logging.debug(f"Total pages in PDF: {pdf_pages}")  # Added logging

        text = extract_text(file_path, page_no)
        if text is None:
            raise HTTPException(status_code=404, detail="PDF or page not found")

        if function_name == "get_summary":
            result = summarize_text(text)
        elif function_name == "get_tags":
            result = classify_tags(text)
        elif function_name == "get_topic":
            result = identify_topic(text)
        elif function_name == "get_answer":
            if not question:
                raise HTTPException(status_code=400, detail="Question not found!")
            result = get_answer(text, question)
        else:
            raise HTTPException(status_code=400, detail="Invalid function name")

    except HTTPException as e:
        logging.error(f"HTTP exception: {e.detail}")  # Added error logging for HTTP exceptions
        os.remove(file_path)
        raise e
    except Exception as e:
        logging.error(f"Unhandled exception: {e}")  # Added logging for unhandled exceptions
        os.remove(file_path)
        raise HTTPException(status_code=500, detail="Internal server error")

    os.remove(file_path)  # Clean up the file
    return JSONResponse(content={"result": result, "totalpages": pdf_pages})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
