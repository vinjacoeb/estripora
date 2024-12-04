import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Sidebar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true); // Controls sidebar visibility
    const [isSaranaPrasaranaOpen, setSaranaPrasaranaOpen] = useState(false);
    const [isPenggunaOpen, setPenggunaOpen] = useState(false);

    return (
        <div>
            {/* Burger Button */}
            <button 
                className="burger-btn"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
                <i className="mdi mdi-menu"></i>
            </button>

            {/* Sidebar */}
            {isSidebarOpen && (
                <div className="vertical-menu">
                    <div data-simplebar className="h-100">
                        <div className="navbar-brand-box">
                            <Link to="/" className="logo"> {/* Use Link for navigation */}
                                <i className="mdi mdi-album"></i>
                                <span>Xeloro</span>
                            </Link>
                        </div>

                        <div id="sidebar-menu">
                            <ul className="metismenu list-unstyled" id="side-menu">
                                <li className="menu-title">Menu</li>

                                <li>
                                    <Link to="/dashboard" className="waves-effect"> {/* Use Link for navigation */}
                                        <i className="mdi mdi-view-dashboard"></i>
                                        <span>Dashboard</span>
                                    </Link>
                                </li>

                                <li>
                                    <a
                                        href="javascript:void(0);"
                                        className="has-arrow waves-effect"
                                        onClick={() => setSaranaPrasaranaOpen(!isSaranaPrasaranaOpen)}
                                    >
                                        <i className="mdi mdi-tools"></i>
                                        <span>Sarana Prasarana</span>
                                    </a>
                                    {isSaranaPrasaranaOpen && (
                                        <ul className="sub-menu" aria-expanded="false">
                                            <li>
                                                <Link to="/admin-sarana">Sarana</Link> {/* Use Link for navigation */}
                                            </li>
                                            <li><Link to="/admin-jamOperasional">Jam Operasional</Link></li> {/* Placeholder */}
                                            <li><Link to="#">Harga</Link></li> {/* Placeholder */}
                                        </ul>
                                    )}
                                </li>

                                <li>
                                    <a
                                        href="javascript:void(0);"
                                        className="has-arrow waves-effect"
                                        onClick={() => setPenggunaOpen(!isPenggunaOpen)}
                                    >
                                        <i className="mdi mdi-account-group"></i>
                                        <span>Pengguna</span>
                                    </a>
                                    {isPenggunaOpen && (
                                        <ul className="sub-menu" aria-expanded="false">
                                            <li><Link to="#">Admin</Link></li> {/* Placeholder */}
                                            <li><Link to="#">User</Link></li> {/* Placeholder */}
                                        </ul>
                                    )}
                                </li>

                                <li>
                                    <Link to="/logout" className="waves-effect"> {/* Use Link for navigation */}
                                        <i className="mdi mdi-logout"></i>
                                        <span>Logout</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
