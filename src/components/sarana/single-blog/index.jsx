import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogDetails from "./BlogDetails";

function SingleBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/sarana/detail/${id}`) // Using the ID from URL
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch blog details");
        }
        return response.json();
      })
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="section post-details-page aximo-section-padding2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p>Loading blog details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section post-details-page aximo-section-padding2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p>Error: {error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section post-details-page aximo-section-padding2">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-10 col-lg-8 mx-auto">
            <BlogDetails
              nama={blog.nama || "Untitled Blog"}
			  sarana={blog.sarana || "Untitled Blog"}
              gambar={blog.gambar || "default-image.jpg"}
              gambar1={blog.gambar1 || "default-image.jpg"}
              gambar2={blog.gambar2 || "default-image.jpg"}
              gambar3={blog.gambar3 || "default-image.jpg"}
              harga={blog.harga || "Price not available"}
              kecamatan={blog.kecamatan || "Location not available"}
              deskripsi={blog.deskripsi || "Description not available"}
              booking_time={blog.booking_time || "Not available"}
              jam_operasional={blog.jam_operasional || []}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleBlog;
