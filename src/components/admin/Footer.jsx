import React from 'react';

const Footer = () => {
    return (
        <footer style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '20px', 
            position: 'fixed', // Ubah ke fixed agar selalu di bawah
            left: '0', 
            bottom: '0', 
            width: '100%', 
            boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            zIndex: 1000, // Naikkan z-index untuk memastikan tampil di atas konten lain
            boxSizing: 'border-box', // Pastikan padding tidak menambah lebar total
            maxWidth: '100vw', // Pastikan lebar penuh viewport
            margin: '0', // Hapus margin default
        }}>
            <div style={{ 
                color: '#333', 
                fontWeight: 'bold',
                flex: '1', // Biarkan elemen kiri mengambil ruang tersisa
                textAlign: 'left' 
            }}></div>
            <div style={{ 
                color: '#333', 
                fontWeight: 'bold',
                textAlign: 'right',
                fontSize: '1 rem', // Sedikit perkecil ukuran font untuk responsivitas
                whiteSpace: 'nowrap' // Cegah pemisahan teks
            }}>
                Copyright © 2024 Dinas Kepemudaan dan Olahraga Kota Semarang
            </div>
        </footer>
    );
};

export default Footer;