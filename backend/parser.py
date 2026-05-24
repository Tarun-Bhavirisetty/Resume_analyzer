import fitz  # PyMuPDF
import pdfplumber
import pytesseract
from PIL import Image
import io

def extract_text_from_pdf(file_bytes: bytes) -> str:
    text = ""
    # Try PyMuPDF first for native text extraction
    try:
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        for page in doc:
            page_text = page.get_text()
            text += page_text + "\n"
        
        # If very little text is extracted, it might be a scanned PDF
        if len(text.strip()) < 100:
            text = extract_text_with_ocr(file_bytes)
    except Exception as e:
        print(f"Error reading PDF with PyMuPDF: {e}")
        text = extract_text_with_ocr(file_bytes)
        
    return text

def extract_text_with_ocr(file_bytes: bytes) -> str:
    text = ""
    try:
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            for page in pdf.pages:
                # Get the image of the page
                img = page.to_image(resolution=300).original
                # Run OCR
                page_text = pytesseract.image_to_string(img)
                text += page_text + "\n"
    except Exception as e:
        print(f"OCR Error: {e}")
    return text

def check_resume_sections(resume_text: str):
    text = resume_text.lower()
    sections = {
        "Header (Name & Contact)": ["email", "phone", "linkedin"],
        "Summary": ["summary", "objective"],
        "Skills": ["skills"],
        "Experience": ["experience", "intern", "work"],
        "Projects": ["project"],
        "Education": ["education"],
        "Certifications": ["certification", "certificate"]
    }
    
    present = []
    missing = []
    
    for section, keywords in sections.items():
        if any(keyword in text for keyword in keywords):
            present.append(section)
        else:
            missing.append(section)
            
    return present, missing
