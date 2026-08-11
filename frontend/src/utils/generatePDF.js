import jsPDF from 'jspdf';
import QRCode from 'qrcode';

export async function generatePDF(id, firstName, lastName, qrData) {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const qrImg = await QRCode.toDataURL(qrData, { width: 320, margin: 1 });

  pdf.setFillColor(15, 23, 42);
  pdf.rect(0, 0, 210, 297, 'F');
  pdf.addImage(qrImg, 'PNG', 45, 75, 120, 120);
  pdf.save(`invitation_${id}.pdf`);
}
