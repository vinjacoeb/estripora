// src/components/layout/DashboardLayout.jsx
import React from 'react';
import Header from '../admin/Header'; // Ensure this path is correct
import Sidebar from '../admin/Sidebar'; // Ensure this path is correct
import Footer from '../admin/Footer'; // Ensure this path is correct
import Dashboard from '../../page/admin/Dashboard';

const DashboardLayout = ({ children }) => {
    return (
        <div id="layout-wrapper">
            <Header />
            <Sidebar />
            <div className="main-content">
                {children}
            </div>
            <Dashboard />
            <Footer />
        </div>
    );
};

export default DashboardLayout;
