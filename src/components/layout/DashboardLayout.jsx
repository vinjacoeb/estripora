import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useScrollTop from "../../hooks/useScrollTop";
import Header from "../admin/Header"; // Pastikan path ini sesuai
import Sidebar from "../admin/Sidebar"; // Pastikan path ini sesuai
import Footer from "../admin/Footer"; // Pastikan path ini sesuai

function DashboardLayout() {
  useScrollTop();

  const [isLoading, setIsLoading] = useState(true); // Untuk memuat status pengguna
  const [isAuthorized, setIsAuthorized] = useState(false); // Untuk validasi akses

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/auth/status", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`, // Kirim token
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          const allowedRoles = ["Admin"]; // Peran yang diizinkan
          setIsAuthorized(allowedRoles.includes(data.role));
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false); // Hentikan loading
      }
    };

    fetchUserRole();
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    ); // Tampilkan loader saat peran pengguna diverifikasi
  }

  if (!isAuthorized) {
    return <Navigate to="/sign-in" />; // Arahkan ke login jika tidak diizinkan
  }

  return (
    <>
      <Header />
      <Sidebar />
      <main>
        <Outlet /> {/* Ini akan menampilkan konten anak */}
      </main>
      <Footer />
    </>
  );
}

export default DashboardLayout;
