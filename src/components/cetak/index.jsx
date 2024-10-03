import React, { useState } from 'react';

function BillingTable() {
  const [showModal, setShowModal] = useState(false);
  const [selectedBilling, setSelectedBilling] = useState(null);

  const billingData = [
    { no: 1, idBilling: 'BL12345', tglMulai: '2024-09-01', tglSelesai: '2024-09-05', durasi: '4 hari', totalBiaya: 'Rp 5.000.000' },
    { no: 2, idBilling: 'BL12346', tglMulai: '2024-09-02', tglSelesai: '2024-09-06', durasi: '4 hari', totalBiaya: 'Rp 4.500.000' },
  ];

  const openModal = (billing) => {
    setSelectedBilling(billing);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBilling(null);
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
                <button style={{ marginRight: '8px' }} onClick={() => openModal(billing)}>Detail</button>
                <button>Cetak</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
          paddingTop: '20px', paddingBottom: '20px'
        }}>
          <div style={{
            backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '400px'
          }}>
            <h3>Detail Billing</h3>1
            {selectedBilling && (
              <>
                <p>ID Billing: {selectedBilling.idBilling}</p>
                <p>Tanggal Mulai: {selectedBilling.tglMulai}</p>
                <p>Tanggal Selesai: {selectedBilling.tglSelesai}</p>
                <p>Durasi Sewa: {selectedBilling.durasi}</p>
                <p>Total Biaya: {selectedBilling.totalBiaya}</p>
              </>
            )}
            <button onClick={closeModal} style={{ marginTop: '20px' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BillingTable;
