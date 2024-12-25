import { useState, useEffect } from "react";
import Search from "./Search";
import GridBlogCard from "./GridBlogCard";

function GridBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the backend
  useEffect(() => {
    fetch("http://localhost:3001/api/sarana/depan")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Log the fetched data to check its structure
        const formattedData = data.map((item) => ({
          id: item.id, // ID sarana
          nama: item.nama, // Nama sarana
          kategori: item.kategori, // Nama kategori
          harga: item.harga || "Harga tidak tersedia", // Harga dengan fallback
          gambar: item.gambar, // Path gambar
        }));
        setBlogs(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Group blogs by kategori
  const groupedBlogs = blogs.reduce((acc, blog) => {
    if (!acc[blog.kategori]) {
      acc[blog.kategori] = [];
    }
    acc[blog.kategori].push(blog);
    return acc;
  }, {});

  return (
    <div className="section aximo-section-padding2">
      <div className="container">
        <div className="row">
          <Search />
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : Object.keys(groupedBlogs).length > 0 ? (
            Object.keys(groupedBlogs).map((kategori) => (
              <div key={kategori}>
                <h3 style={{ paddingBottom: "20px" }}>{kategori}</h3> {/* Title for each category */}
                <div className="row" style={{ marginTop: "20px" }}>
                  {groupedBlogs[kategori].slice(0, 4).map((blog) => ( // Display up to 4 blogs per category
                    <GridBlogCard key={blog.id} blog={blog} /> // Pass blog object including id
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No blogs found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GridBlog;
