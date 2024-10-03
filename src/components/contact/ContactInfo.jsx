import Call2Img from "../../assets/images/icon/call2.svg";
import EmailImg from "../../assets/images/icon/email.svg";
import MapImg from "../../assets/images/icon/map.svg";
import Star2Img from "../../assets/images/v1/star2.png";

function ContactInfo() {
  return (
    <div className="aximo-contact-info-section py-5">
      <div className="container">
        <div className="aximo-contact-info-title text-center mb-5">
          <h2>
            <span className="aximo-title-animation">
              Contact Information
              <span className="aximo-title-icon">
                <img src={Star2Img} alt="Star" className="ms-2" />
              </span>
            </span>
          </h2>
        </div>

        <div className="row g-4">
          {/* Phone Section */}
          <div className="col-xl-4 col-md-6">
            <a href="tel:+62888999777" className="text-decoration-none">
              <div className="aximo-contact-info-box p-4 h-100 d-flex align-items-center">
                <div className="aximo-contact-info-icon me-3">
                  <img src={Call2Img} alt="Call Img" />
                </div>
                <div className="aximo-contact-info-data text-start">
                  <span className="fw-bold d-block">Call us</span>
                  <p className="mb-1">+62 888-999-777</p>
                  <p>+62 888-999-777</p>
                </div>
              </div>
            </a>
          </div>

          {/* Email Section */}
          <div className="col-xl-4 col-md-6">
            <a href="mailto:estriporasemarang@gmail.com" className="text-decoration-none">
              <div className="aximo-contact-info-box p-4 h-100 d-flex align-items-center">
                <div className="aximo-contact-info-icon me-3">
                  <img src={EmailImg} alt="Email" />
                </div>
                <div className="aximo-contact-info-data text-start">
                  <span className="fw-bold d-block">Email us</span>
                  <p className="mb-1">estriporasemarang@gmail.com</p>
                  <p>luthfinurjafar@gmail.com</p>
                </div>
              </div>
            </a>
          </div>

          {/* Address Section */}
          <div className="col-xl-4 col-md-6">
            <div className="aximo-contact-info-box p-4 h-100 d-flex align-items-center">
              <div className="aximo-contact-info-icon me-3">
                <img src={MapImg} alt="Map" />
              </div>
              <div className="aximo-contact-info-data text-start">
                <span className="fw-bold d-block">Office address</span>
                <p>Jl. Pamularsih Raya No.20, Bongsari, Kec. Semarang Barat, Kota Semarang, Jawa Tengah 50148.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;