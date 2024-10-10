import React from 'react';
import FooterBottom from "./FooterBottom";
import FooterContent from "./FooterContent";

const Footer = () => {
  return (
    <footer className="aximo-footer-section dark-bg" style={{ padding: '20px 0' }}>
      <div className="container">
        <div className="aximo-footer-top aximo-section-padding" style={{ padding: '50px 0' }}>
          
          <div className="col-lg-20" style={{ marginBottom: '1px' }}>
            <FooterContent />
          </div>

          {/* Menggunakan Flexbox untuk meratakan konten */}
          <div className="row footer-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}> 
            
            {/* Alamat Kami */}
            <div className="col-lg-4 footer-item" style={{ flex: '1', paddingRight: '20px', minWidth: '250px', marginBottom: '20px' }}>
              <div className="aximo-form-wrap">
                <div className="aximo-default-content light position-relative">
                  <h2 style={{ fontSize: '35px', fontWeight: 'normal', lineHeight: '1.2', marginBottom: '10px' }}>
                    Alamat Kami:
                  </h2>
                  <div className="aximo-info">
                    <p>
                      Jalan Pamularsih Raya No.20, Bongsari, Kec. Semarang Barat, Kota Semarang, Jawa Tengah, Indonesia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Kontak Kami */}
            <div className="col-lg-4 footer-item" style={{ flex: '1', paddingLeft: '20px', paddingRight: '20px', minWidth: '250px', marginBottom: '20px' }}>
              <div className="aximo-form-wrap">
                <div className="aximo-default-content light position-relative">
                  <h2 style={{ fontSize: '35px', fontWeight: 'normal', lineHeight: '1.2', marginBottom: '10px' }}>
                    Kontak Kami:
                  </h2>
                  <div className="aximo-info">
                    <ul style={{ padding: 0, listStyleType: 'none', marginBottom: '10px' }}>
                      <li>Give us a call:</li>
                      <li>
                        <a href="tel:(123) 456-7890">(123) 456-7890</a>
                      </li>
                    </ul>
                    <ul style={{ padding: 0, listStyleType: 'none' }}>
                      <li>Send us an email:</li>
                      <li>
                        <a href="mailto:info@mthemeus.com">info@mthemeus.com</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="col-lg-4 footer-item" style={{ flex: '1', paddingLeft: '20px', minWidth: '250px', marginBottom: '20px' }}>
              <div className="aximo-form-wrap">
                <div className="aximo-default-content light position-relative">
                  <h2 style={{ fontSize: '35px', fontWeight: 'normal', lineHeight: '1.2', marginBottom: '10px' }}>
                    Social Media:
                  </h2>
                  <div className="aximo-info">
                    <div className="aximo-social-icon social-large">
                      <ul className="social-icons-list" style={{ padding: 0, listStyleType: 'none', display: 'flex', justifyContent: 'flex-start' }}>
                        <li style={{ marginRight: '10px' }}>
                          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                            <i className="icon-twitter"></i>
                          </a>
                        </li>
                        <li style={{ marginRight: '10px' }}>
                          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
                            <i className="icon-facebook"></i>
                          </a>
                        </li>
                        <li style={{ marginRight: '10px' }}>
                          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                            <i className="icon-instagram"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                            <i className="icon-linkedin"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="aximo-footer-bottom" style={{ paddingTop: '15px', paddingBottom: '15px' }}>
          <div className="row">
            <FooterBottom />
          </div>
        </div>
      </div>

      {/* Media Queries for Responsive Design */}
      <style jsx>{`
        @media (max-width: 768px) {
          .footer-flex {
            flex-direction: column; /* Menumpuk elemen di layar kecil */
          }
          .social-icons-list {
            justify-content: center; /* Menengahkan ikon media sosial di mobile */
          }
        }
        @media (min-width: 769px) {
          .footer-flex {
            flex-direction: row; /* Tampilan row di layar lebih besar */
          }
        }
        .footer-item {
          margin-bottom: 20px; /* Ruang antar elemen */
        }
      `}</style>
    </footer>
  );
};

export default Footer;
