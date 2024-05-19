from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import PyPDF2
from llmware.models import ModelCatalog
import os
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploaded_pdfs"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

def extract_text_from_pdf(file_path, page_no):
    try:
        with open(file_path, "rb") as file:
            pdf_reader = PyPDF2.PdfReader(file)
            if 0 <= page_no < len(pdf_reader.pages):
                page = pdf_reader.pages[page_no]
                return page.extract_text()
            else:
                return None
    except FileNotFoundError:
        return None

def get_summary(text):
    if text is not None:
        slim_model = ModelCatalog().load_model("slim-summary-tool")
        response = slim_model.function_call(text, params="[key points (3)]", function="summarize")
        return response["llm_response"]
    else:
        return "Invalid text"

def get_tags(text):
    if text is not None:
        slim_model = ModelCatalog().load_model("slim-tags-tool")
        response = slim_model.function_call(text, params=["tags"], function="classify")
        return response["llm_response"]
    else:
        return "Invalid text"

def get_topic(text):
    if text is not None:
        slim_model = ModelCatalog().load_model("slim-topics-tool")
        response = slim_model.function_call(text, params=["topics"], function="classify")
        return response["llm_response"]
    else:
        return "Invalid text"

def get_answer(text, question):
    if text is not None:
        questions='"'+ question+ "(explain)"+ '"'
        slim_model = ModelCatalog().load_model("slim-boolean-tool")
        response = slim_model.function_call(text, params=[questions], function="boolean")
        return response["llm_response"]
    else:
        return "Invalid text"

@app.post("/process_pdf/")
async def process_pdf(
    function_name: str = Form(...),
    page_no: int = Form(...),
    question: Optional[str] = Form(None),
    file: UploadFile = File(...)
):
    # Save the uploaded file
    file_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}.pdf")

    with open(file_path, "wb") as f:
        f.write(await file.read())

    # Extract text from the specified page
    text = extract_text_from_pdf(file_path, page_no)
    if text is None:
        os.remove(file_path)  # Clean up the file
        raise HTTPException(status_code=404, detail="PDF or page not found")

    # Process the function call
    if function_name == "get_summary":
        result = get_summary(text)
    elif function_name == "get_tags":
        result = get_tags(text)
    elif function_name == "get_topic":
        result = get_topic(text)
    elif function_name == "get_answer":
        if question is None:
            os.remove(file_path)  # Clean up the file
            raise HTTPException(status_code=400, detail="Question parameter is required for get_answer function")
        result = get_answer(text, question)
    else:
        os.remove(file_path)  # Clean up the file
        raise HTTPException(status_code=400, detail="Invalid function name")

    os.remove(file_path)  # Clean up the file
    return JSONResponse(content={"result": result})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
