import { Link } from "react-router-dom";

function GridBlogCard({ blog: { id, sarana, harga, gambar } }) {
  // Format the price as Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4">
      <div
        className="card-container"
        style={{
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 0.5px 1px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          backgroundColor: "#fff",
          position: "relative",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          cursor: "pointer",
          width: "100%",
          maxWidth: "100%",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)"; // Scale effect on hover
          e.currentTarget.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 0.5px 1px rgba(0, 0, 0, 0.1)";
        }}
      >
        <div
          style={{
            width: "100%",
            height: "400px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={`/${gambar}`} // Assuming gambar is in the public folder
            alt={sarana}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // Cover the entire area
              transition: "transform 0.3s ease",
            }}
            className="card-image"
          />
          <div
            style={{
              position: "absolute",
              bottom: "0",
              left: "0",
              right: "0",
              backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent background
              color: "white",
              padding: "20px",
              textAlign: "left",
              transition: "background-color 0.3s ease",
            }}
            className="card-text-overlay"
          >
            <Link to={`/sarana-detail/${id}`} style={{ textDecoration: "none" }}>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  margin: "0",
                  color: "white",
                }}
              >
                {sarana}
              </h3>
            </Link>
            <p
              style={{
                fontSize: "18px",
                marginTop: "5px",
                marginBottom: "0",
                color: "white",
              }}
            >
              {harga !== undefined
                ? formatRupiah(harga) // Display formatted price
                : "Harga tidak tersedia"}
            </p>
          </div>

          {/* Arrow icon for navigation */}
          <Link to={`/sarana-detail/${id}`} style={{ textDecoration: "none" }}>
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                borderRadius: "50%", // Circular button
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
                transition: "transform 0.3s ease", // Scale effect on hover
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)"; // Scale on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"; // Reset scale
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-arrow-right"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GridBlogCard;
