import React from 'react';

const Footer = () => {
    return (
        <footer style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '20px', 
            position: 'relative', 
            bottom: '0', 
            width: '100%', 
            boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)', // Add a shadow for better separation
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            zIndex: 1 // Ensure it appears above other content
        }}>
            <div style={{ color: '#333', fontWeight: 'bold' }}></div>
            <div style={{ textAlign: 'right', color: '#555',color: '#333', fontWeight: 'bold' }}>2020 © Xeloro.Design & Develop by Myra
            </div>
        </footer>
    );
};

export default Footer;
