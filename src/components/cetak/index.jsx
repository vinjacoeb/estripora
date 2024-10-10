import React, { useState } from 'react';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import LogoWhiteImg from "../../assets/images/logo/Lambang_Kota_Semarang.png"; // Impor logo dari folder

function BillingTable() {
  const [selectedBilling, setSelectedBilling] = useState(null);

  const billingData = [
    { no: 1, idBilling: 'BL12345', tglMulai: '2024-09-01', tglSelesai: '2024-09-05', durasi: '4 hari', totalBiaya: 'Rp 5.000.000' },
    { no: 2, idBilling: 'BL12346', tglMulai: '2024-09-02', tglSelesai: '2024-09-06', durasi: '4 hari', totalBiaya: 'Rp 4.500.000' },
  ];

  const generatePDF = (billing) => {
    const doc = new jsPDF();

    // Tambahkan Logo di pojok kiri atas
    const img = new Image();
    img.src = LogoWhiteImg; // Load gambar dari path yang diimpor

    // Setelah gambar dimuat, tambahkan ke PDF
    img.onload = function () {
      // Logo dan nama organisasi di sebelahnya
      doc.addImage(img, 'PNG', 10, 10, 20, 20); // Set posisi dan ukuran gambar (kiri, atas, lebar, tinggi)
      doc.setFontSize(14);
      doc.text('Estripora Kota Semarang', 35, 20); // Nama organisasi di sebelah logo

      // Tambah Judul di tengah halaman
      doc.setFontSize(25);
      doc.text('Hasil Cetak Billing', doc.internal.pageSize.getWidth() / 2, 40, { align: 'center' }); // Judul di tengah

      // Tambahkan Tanggal Pemesanan di kanan atas di atas tabel
      doc.setFontSize(12);
      doc.text(` ${billing.tglMulai} - ${billing.tglSelesai}`, doc.internal.pageSize.getWidth() - 70, 70); // Tanggal di kanan atas

      // Tambah Detail Billing
      doc.setFontSize(12);
      doc.text(`ID Billing: ${billing.idBilling}`, 14, 70);

      // Tambah Tabel Data Billing Menggunakan autoTable
      doc.autoTable({
        startY: 80,
        head: [['No', 'ID Billing', 'Tanggal Mulai', 'Tanggal Selesai', 'Durasi Sewa', 'Total Biaya']],
        body: [
          [
            billing.no,
            billing.idBilling,
            billing.tglMulai,
            billing.tglSelesai,
            billing.durasi,
            billing.totalBiaya
          ]
        ],
      });

      // Simpan PDF
      doc.save(`invoice_${billing.idBilling}.pdf`);
    };
  };

  return (
    <div className='container' style={{ paddingTop: '20px', paddingBottom: '20px' }}>
      <div className="aximo-justify-content-center" style={{ paddingBottom: '20px' }}>
        <h2 style={{ paddingBottom: '10px' }}>Cetak Bukti Pembayaran</h2>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', textAlign: 'left' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>No</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID Billing</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Tanggal Mulai</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Tanggal Selesai</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Durasi Sewa</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Total Biaya</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {billingData.map((billing) => (
            <tr key={billing.idBilling}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{billing.no}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{billing.idBilling}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{billing.tglMulai}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{billing.tglSelesai}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{billing.durasi}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{billing.totalBiaya}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <button 
                  onClick={() => generatePDF(billing)} 
                  style={{ 
                    backgroundColor: '#4CAF50', 
                    color: 'white', 
                    padding: '10px 20px', 
                    textAlign: 'center', 
                    textDecoration: 'none', 
                    display: 'inline-block', 
                    fontSize: '16px', 
                    borderRadius: '8px', 
                    border: 'none', 
                    cursor: 'pointer' 
                  }}
                >
                  Cetak
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BillingTable;
