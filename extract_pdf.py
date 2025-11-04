#!/usr/bin/env python3
"""Extract text from PDF file"""

import sys
import os

try:
    import PyPDF2
    HAS_PYPDF2 = True
except ImportError:
    try:
        import pypdf
        HAS_PYPDF = True
    except ImportError:
        HAS_PYPDF2 = False
        HAS_PYPDF = False

def extract_text_pypdf2(pdf_path):
    """Extract text using PyPDF2"""
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text

def extract_text_pypdf(pdf_path):
    """Extract text using pypdf"""
    with open(pdf_path, 'rb') as file:
        reader = pypdf.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text

if __name__ == "__main__":
    pdf_path = "ANDHRA KRISTHAVA KEERTHANALU.pdf"
    
    if not os.path.exists(pdf_path):
        print(f"Error: {pdf_path} not found")
        sys.exit(1)
    
    try:
        if HAS_PYPDF2:
            text = extract_text_pypdf2(pdf_path)
        elif HAS_PYPDF:
            text = extract_text_pypdf(pdf_path)
        else:
            print("Error: No PDF library available. Installing PyPDF2...")
            os.system("pip3 install PyPDF2 --quiet")
            import PyPDF2
            text = extract_text_pypdf2(pdf_path)
        
        # Save to text file
        with open("extracted_songs.txt", "w", encoding="utf-8") as f:
            f.write(text)
        
        print(f"Extracted {len(text)} characters from PDF")
        print("First 1000 characters:")
        print(text[:1000])
        
    except Exception as e:
        print(f"Error extracting PDF: {e}")
        sys.exit(1)

