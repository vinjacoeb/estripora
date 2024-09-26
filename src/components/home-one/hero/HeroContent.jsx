import { useEffect, useState } from "react";
import ShapeImg from "../../../assets/images/v1/shape1.png";

function HeroContent() {
  const [categories, setCategories] = useState([]);

  // Fetch categories from the backend
  useEffect(() => {
    fetch("http://localhost:3001/backend")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="aximo-hero-content">
      <h1>
        <span className="aximo-title-animation">Estripora</span> Kota Semarang
      </h1>
      <p>
        {`ESTRIPORA adalah layanan Pemerintah Kota Semarang untuk pemesanan, pendataan, penetapan, dan pembayaran retribusi pada obyek tertentu. Layanan ini bertujuan memudahkan akses masyarakat, meningkatkan akuntabilitas, dan menciptakan pelayanan publik yang unggul dalam sektor pendapatan daerah.`}
      </p>
      <div className="dropdown">
        <button className="aximo-call-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Pilih Kategori <i className="icon-arrow-right"></i> 
        </button>
        <ul className="dropdown-menu">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <li key={index}>
                <a className="dropdown-item" href="#">
                  {category.nama}
                </a>
              </li>
            ))
          ) : (
            <li><span className="dropdown-item">No Categories Available</span></li>
          )}
        </ul>
      </div>
      <div className="aximo-hero-shape">
        <img src={ShapeImg} alt="ShapeImg" />
      </div>
    </div>
  );
}

export default HeroContent;
