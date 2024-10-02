import { Link } from "react-router-dom";

function GridBlogCard({ blog: { nama, harga, gambar } }) {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
      <div className="single-post-item" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div className="post-thumbnail">
        <img
  src={`../../../public/${gambar}`} // Mengakses gambar dari public/images
  alt={nama}
  style={{ width: "100%", height: "auto", objectFit: "cover" }}
/>


        </div>
        <div className="post-content" style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px" }}>
          <div>
            <Link to="/single-blog">
              <h3 className="entry-title" style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
                {nama}
              </h3>
            </Link>
            {/* Display the price below the building name, without a box */}
            <p style={{ fontSize: "16px", fontWeight: "normal", color: "#333" }}>
              {harga ? `Rp ${harga}` : "Harga tidak tersedia"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GridBlogCard;
