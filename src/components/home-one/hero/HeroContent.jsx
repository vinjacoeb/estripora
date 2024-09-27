import { useEffect, useState } from "react";
import ShapeImg from "../../../assets/images/v1/shape1.png";

function HeroContent() {
  const [categories, setCategories] = useState([]);

  return (
    <div className="aximo-hero-content">
      <h1>
        <span className="aximo-title-animation">Estripora</span> Kota Semarang
      </h1>
      <p>
        {`ESTRIPORA adalah layanan Pemerintah Kota Semarang untuk pemesanan, pendataan, penetapan, dan pembayaran retribusi pada obyek tertentu. Layanan ini bertujuan memudahkan akses masyarakat, meningkatkan akuntabilitas, dan menciptakan pelayanan publik yang unggul dalam sektor pendapatan daerah.`}
      </p>
      <div className="dropdown">
      <button
        className="aximo-call-btn"
        type="button"
        onClick={() => (window.location.href = '/sarana')} // Tambahkan ini untuk direct ke halaman /sarana
        aria-expanded="false"
      >
        Pesan Sekarang <i className="icon-arrow-right"></i>
      </button>

      </div>
      <div className="aximo-hero-shape">
        <img src={ShapeImg} alt="ShapeImg" />
      </div>
    </div>
  );
}

export default HeroContent;
