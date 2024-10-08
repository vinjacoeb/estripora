import React from 'react';

const Header = () => {
    return (
        <header id="page-topbar">
            <div className="navbar-header">
                <div className="d-flex align-items-left">
                    <button
                        type="button"
                        className="btn btn-sm mr-2 d-lg-none px-3 font-size-16 header-item waves-effect"
                        id="vertical-menu-btn"
                    >
                        <i className="fa fa-fw fa-bars"></i>
                    </button>

                    <div className="dropdown d-none d-sm-inline-block">
                        <button
                            type="button"
                            className="btn header-item waves-effect"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className="mdi mdi-plus"></i> Create New
                            <i className="mdi mdi-chevron-down d-none d-sm-inline-block"></i>
                        </button>
                        <div className="dropdown-menu">
                            <a href="javascript:void(0);" className="dropdown-item notify-item">
                                Application
                            </a>
                            <a href="javascript:void(0);" className="dropdown-item notify-item">
                                Software
                            </a>
                            <a href="javascript:void(0);" className="dropdown-item notify-item">
                                EMS System
                            </a>
                            <a href="javascript:void(0);" className="dropdown-item notify-item">
                                CRM App
                            </a>
                        </div>
                    </div>
                </div>

                <div className="d-flex align-items-center">
                    <div className="dropdown d-none d-sm-inline-block ml-2">
                        <button
                            type="button"
                            className="btn header-item noti-icon waves-effect"
                            id="page-header-search-dropdown"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className="mdi mdi-magnify"></i>
                        </button>
                        <div
                            className="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
                            aria-labelledby="page-header-search-dropdown"
                        >
                            <form className="p-3">
                                <div className="form-group m-0">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search ..."
                                            aria-label="Recipient's username"
                                        />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="submit">
                                                <i className="mdi mdi-magnify"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="dropdown d-inline-block">
                        <button
                            type="button"
                            className="btn header-item waves-effect"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <img className="" src="../../../assets/images/flags/us.jpg" alt="Header Language" height="16" />
                            <span className="d-none d-sm-inline-block ml-1">English</span>
                            <i className="mdi mdi-chevron-down d-none d-sm-inline-block"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                            <a href="javascript:void(0);" className="dropdown-item notify-item">
                                <img src="../../../assets/images/flags/spain.jpg" alt="user-image" className="mr-1" height="12" />
                                <span className="align-middle">Spanish</span>
                            </a>
                            <a href="javascript:void(0);" className="dropdown-item notify-item">
                                <img src="../../../assets/images/flags/germany.jpg" alt="user-image" className="mr-1" height="12" />
                                <span className="align-middle">German</span>
                            </a>
                            <a href="javascript:void(0);" className="dropdown-item notify-item">
                                <img src="../../../assets/images/flags/italy.jpg" alt="user-image" className="mr-1" height="12" />
                                <span className="align-middle">Italian</span>
                            </a>
                            <a href="javascript:void(0);" className="dropdown-item notify-item">
                                <img src="../../../assets/images/flags/russia.jpg" alt="user-image" className="mr-1" height="12" />
                                <span className="align-middle">Russian</span>
                            </a>
                        </div>
                    </div>

                    <div className="dropdown d-inline-block">
                        <button
                            type="button"
                            className="btn header-item noti-icon waves-effect"
                            id="page-header-notifications-dropdown"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className="mdi mdi-bell"></i>
                            <span className="badge badge-danger badge-pill">3</span>
                        </button>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0" aria-labelledby="page-header-notifications-dropdown">
                            <div className="p-3">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <h6 className="m-0"> Notifications </h6>
                                    </div>
                                    <div className="col-auto">
                                        <a href="#!" className="small"> View All</a>
                                    </div>
                                </div>
                            </div>
                            <div data-simplebar style={{ maxHeight: '230px' }}>
                                <a href="" className="text-reset notification-item">
                                    <div className="media">
                                        <img
                                            src="../../../assets/images/users/avatar-2.jpg"
                                            className="mr-3 rounded-circle avatar-xs"
                                            alt="user-pic"
                                        />
                                        <div className="media-body">
                                            <h6 className="mt-0 mb-1">Samuel Coverdale</h6>
                                            <p className="font-size-12 mb-1">You have a new follower on Instagram</p>
                                            <p className="font-size-12 mb-0 text-muted">
                                                <i className="mdi mdi-clock-outline"></i> 2 min ago
                                            </p>
                                        </div>
                                    </div>
                                </a>
                                <a href="" className="text-reset notification-item">
                                    <div className="media">
                                        <div className="avatar-xs mr-3">
                                            <span className="avatar-title bg-success rounded-circle">
                                                <i className="mdi mdi-cloud-download-outline"></i>
                                            </span>
                                        </div>
                                        <div className="media-body">
                                            <h6 className="mt-0 mb-1">Download Available!</h6>
                                            <p className="font-size-12 mb-1">Latest version of admin is now available. Please download here.</p>
                                            <p className="font-size-12 mb-0 text-muted">
                                                <i className="mdi mdi-clock-outline"></i> 4 hours ago
                                            </p>
                                        </div>
                                    </div>
                                </a>
                                <a href="" className="text-reset notification-item">
                                    <div className="media">
                                        <img
                                            src="assets/images/users/avatar-3.jpg"
                                            className="mr-3 rounded-circle avatar-xs"
                                            alt="user-pic"
                                        />
                                        <div className="media-body">
                                            <h6 className="mt-0 mb-1">Victoria Mendis</h6>
                                            <p className="font-size-12 mb-1">Just upgraded to premium account.</p>
                                            <p className="font-size-12 mb-0 text-muted">
                                                <i className="mdi mdi-clock-outline"></i> 1 day ago
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="p-2 border-top">
                                <a className="btn btn-sm btn-light btn-block text-center" href="javascript:void(0)">
                                    <i className="mdi mdi-arrow-down-circle mr-1"></i> Load More..
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="dropdown d-inline-block ml-2">
                        <button
                            type="button"
                            className="btn header-item waves-effect"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <img
                                className="rounded-circle header-profile-user"
                                src="../../../assets/images/users/avatar-2.jpg"
                                alt="Header Avatar"
                            />
                            <span className="d-none d-sm-inline-block ml-1">Donald M.</span>
                            <i className="mdi mdi-chevron-down d-none d-sm-inline-block"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item d-flex align-items-center justify-content-between" href="javascript:void(0)">
                                <span>Inbox</span>
                                <span>
                                    <span className="badge badge-pill badge-info">3</span>
                                </span>
                            </a>
                            <a className="dropdown-item d-flex align-items-center justify-content-between" href="javascript:void(0)">
                                <span>Profile</span>
                                <span>
                                    <span className="badge badge-pill badge-warning">1</span>
                                </span>
                            </a>
                            <a className="dropdown-item d-flex align-items-center justify-content-between" href="javascript:void(0)">
                                Settings
                            </a>
                            <a className="dropdown-item d-flex align-items-center justify-content-between" href="javascript:void(0)">
                                <span>Lock Account</span>
                            </a>
                            <a className="dropdown-item d-flex align-items-center justify-content-between" href="javascript:void(0)">
                                <span>Log Out</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
