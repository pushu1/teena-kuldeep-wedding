"""
Official Royal Wedding Invitation PDF Generator
Redirects / delegates to generate_perfect_single_page_pdf.py for strictly 1-page clean royal vector PDF
"""
from generate_perfect_single_page_pdf import generate_single_page_pdf

if __name__ == '__main__':
    generate_single_page_pdf()
