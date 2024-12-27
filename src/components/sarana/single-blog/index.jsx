import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogDetails from "./BlogDetails";

function SingleBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/sarana/detail/${id}`) // Menggunakan ID dari URL
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil detail sarana");
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
              <p>Memuat detail sarana...</p>
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
              nama={blog && blog.nama_sarana ? blog.nama_sarana : "Nama tidak tersedia"}
              gambar={blog && blog.gambar ? blog.gambar : "default-image.jpg"}
              harga={blog && blog.harga ? blog.harga : "Harga tidak tersedia"}
              deskripsi={blog && blog.deskripsi ? blog.deskripsi : "Deskripsi tidak tersedia"}
              kategori={blog && blog.kategori ? blog.kategori : {}}
              fasilitas={blog && blog.fasilitas ? blog.fasilitas : []}
              jam_operasional={blog && blog.jam_operasional ? blog.jam_operasional : []}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleBlog;
