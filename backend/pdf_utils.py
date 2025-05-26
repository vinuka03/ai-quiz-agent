import fitz  # PyMuPDF

def extract_text_from_pdf(pdf_path: str) -> str:
    """
    Extracts text from all pages of a given PDF file.
    :param pdf_path: Path to the PDF file
    :return: Concatenated text from all pages
    """
    doc = fitz.open(pdf_path)
    return "\n".join([page.get_text() for page in doc])
