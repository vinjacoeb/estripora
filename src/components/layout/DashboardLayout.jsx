import { Outlet } from "react-router-dom";
import useScrollTop from "../../hooks/useScrollTop";
import Header from '../admin/Header'; // Pastikan path ini sesuai
import Sidebar from '../admin/Sidebar'; // Pastikan path ini sesuai
import Footer from '../admin/Footer'; // Pastikan path ini sesuai

function DashboardLayout() {
    useScrollTop();

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
