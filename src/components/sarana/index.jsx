import { useState, useEffect } from "react";
import Search from "./Search";
import GridBlogCard from "./GridBlogCard";

function GridBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching data from the backend
  useEffect(() => {
    fetch("http://localhost:3001/backend") // Replace with your API URL
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Log the fetched data to check its structure
        const formattedData = data.map(item => ({
          id: item.id || crypto.randomUUID(), // Use item's ID if available, otherwise generate one
          nama: item.nama,
          kecamatan: item.kecamatan || "Unknown",
          harga: item.harga || "Harga tidak tersedia",
          gambar: item.gambar || "default-image-url",
          sarana: item.sarana || "Uncategorized", // Default to "Uncategorized" if not specified
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

  // Group blogs by sarana
  const groupedBlogs = blogs.reduce((acc, blog) => {
    if (!acc[blog.sarana]) {
      acc[blog.sarana] = [];
    }
    acc[blog.sarana].push(blog);
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
            Object.keys(groupedBlogs).map(sarana => (
              <div key={sarana}>
                <h3 style={{ paddingBottom: "20px" }}>{sarana}</h3> {/* Title for each sarana category */}
                <div className="row" style={{ marginTop: "20px" }}>
                  {groupedBlogs[sarana].slice(0, 4).map(blog => ( // Display up to 4 blogs per category
                    <GridBlogCard key={blog.id} blog={blog} />
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
