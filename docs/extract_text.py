import os
import sys

def extract_pdf_text(pdf_path, txt_path):
    print(f"Extracting text from {pdf_path}...")
    try:
        # Try using pypdf
        import pypdf
        reader = pypdf.PdfReader(pdf_path)
        text = ""
        for i, page in enumerate(reader.pages):
            text += f"--- Page {i+1} ---\n"
            text += page.extract_text() or ""
            text += "\n"
        with open(txt_path, "w", encoding="utf-8") as f:
            f.write(text)
        print("Success using pypdf!")
        return True
    except ImportError:
        print("pypdf not installed.")
    
    try:
        # Try using PyPDF2
        import PyPDF2
        reader = PyPDF2.PdfReader(pdf_path)
        text = ""
        for i, page in enumerate(reader.pages):
            text += f"--- Page {i+1} ---\n"
            text += page.extract_text() or ""
            text += "\n"
        with open(txt_path, "w", encoding="utf-8") as f:
            f.write(text)
        print("Success using PyPDF2!")
        return True
    except ImportError:
        print("PyPDF2 not installed.")

    try:
        # Try using pdfminer
        from pdfminer.high_level import extract_text
        text = extract_text(pdf_path)
        with open(txt_path, "w", encoding="utf-8") as f:
            f.write(text)
        print("Success using pdfminer!")
        return True
    except ImportError:
        print("pdfminer not installed.")

    # Fallback to basic string extraction
    print("No PDF library found. Running fallback extraction of text blocks...")
    try:
        with open(pdf_path, "rb") as f:
            content = f.read()
        import re
        # Find all PDF text blocks
        matches = re.findall(b'\((.*?)\)', content)
        text_lines = []
        for m in matches:
            try:
                line = m.decode('utf-8', errors='ignore')
                # Ignore non-text/short strings
                if len(line.strip()) > 1:
                    text_lines.append(line.strip())
            except Exception:
                pass
        with open(txt_path, "w", encoding="utf-8") as f:
            f.write("\n".join(text_lines))
        print("Success using regex fallback!")
        return True
    except Exception as e:
        print(f"Error in fallback: {e}")
        return False

# Extract both files
extract_pdf_text("docs/Oganizational Profile_Stellar Associates.pdf", "docs/org_profile.txt")
extract_pdf_text("docs/Website Layout_Draft.pdf", "docs/website_layout.txt")
print("Done!")
