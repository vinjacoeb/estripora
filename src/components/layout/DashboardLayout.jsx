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
        const fetchUserStatus = async () => {
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
                    const allowedStatus = [2]; // Status yang diizinkan
                    setIsAuthorized(allowedStatus.includes(data.status));
                } else {
                    setIsAuthorized(false);
                }
            } catch (error) {
                console.error("Error fetching user status:", error);
                setIsAuthorized(false);
            } finally {
                setIsLoading(false); // Hentikan loading
            }
        };

        fetchUserStatus();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // Tampilkan loader saat status pengguna diverifikasi
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
