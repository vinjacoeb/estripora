import LogoWhiteImg from "../../../assets/images/logo/Lambang_Kota_Semarang.png";

function FooterBottom() {
  return (
    <>
      <div className="col-lg-6">
        <div className="aximo-footer-logo" style={{ display: "flex", alignItems: "center" }}>
          <a href="">
            <img
              src={LogoWhiteImg}
              alt="Logo"
              className="light-version-logo"
              style={{ width: "40px", height: "50px", marginRight: "15px" }}
            />
          </a>
          <p style={{ fontSize: "medium", color: "white", margin: 0 }}>
            <b>Estripora Kota Semarang</b>
          </p>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="aximo-copywright one">
          <p>Copyright © 2024 Dinas Kepemudaan dan Olahraga Kota Semarang</p>
        </div>
      </div>
    </>
  );
}

export default FooterBottom;

