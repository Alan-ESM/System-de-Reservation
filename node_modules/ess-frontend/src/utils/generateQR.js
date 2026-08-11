import QRCode from 'qrcode';

export async function generateQRCode(data) {
  return await QRCode.toDataURL(JSON.stringify(data), {
    width: 200,
    margin: 1,
    color: { dark: '#000', light: '#fff' }
  });
}