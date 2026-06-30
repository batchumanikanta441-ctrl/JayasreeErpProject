from io import BytesIO

from reportlab.lib.units import inch
from reportlab.pdfgen import canvas


def generate_invoice_pdf(invoice):

    buffer = BytesIO()

    pdf = canvas.Canvas(buffer)

    pdf.setTitle("Jayasree ERP Invoice")

    pdf.setFont("Helvetica-Bold", 18)
    pdf.drawString(
        1 * inch,
        10.5 * inch,
        "Jayasree Enterprises"
    )

    pdf.setFont("Helvetica", 12)

    pdf.drawString(
        1 * inch,
        10.0 * inch,
        f"Invoice No : {invoice.invoice_number}"
    )

    pdf.drawString(
        1 * inch,
        9.7 * inch,
        f"Customer : {invoice.customer_name}"
    )

    pdf.drawString(
        1 * inch,
        9.4 * inch,
        f"Amount : ₹{invoice.total_amount}"
    )

    pdf.drawString(
        1 * inch,
        9.1 * inch,
        f"Payment Status : {invoice.payment_status}"
    )

    pdf.drawString(
        1 * inch,
        8.5 * inch,
        "Thank you for doing business with us."
    )

    pdf.save()

    buffer.seek(0)

    return buffer