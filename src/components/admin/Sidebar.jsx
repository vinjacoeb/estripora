import React from 'react';

const Sidebar = () => {
    return (
        // ========== Left Sidebar Start ========== 
        <div className="vertical-menu">

            <div data-simplebar className="h-100">

                <div className="navbar-brand-box">
                    <a href="index.html" className="logo">
                        <i className="mdi mdi-album"></i>
                        <span>
                            Xeloro
                        </span>
                    </a>
                </div>

                {/* Sidemenu */}
                <div id="sidebar-menu">
                    {/* Left Menu Start */}
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li className="menu-title">Menu</li>

                        <li>
                            <a href="index.html" className="waves-effect">
                                <i className="mdi mdi-home-analytics"></i>
                                <span className="badge badge-pill badge-primary float-right">7</span>
                                <span>Dashboard</span>
                            </a>
                        </li>

                        <li>
                            <a href="javascript:void(0);" className="has-arrow waves-effect">
                                <i className="mdi mdi-diamond-stone"></i>
                                <span>UI Elements</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><a href="ui-buttons.html">Buttons</a></li>
                                <li><a href="ui-cards.html">Cards</a></li>
                                <li><a href="ui-carousel.html">Carousel</a></li>
                                <li><a href="ui-embeds.html">Embeds</a></li>
                                <li><a href="ui-general.html">General</a></li>
                                <li><a href="ui-grid.html">Grid</a></li>
                                <li><a href="ui-media-objects.html">Media Objects</a></li>
                                <li><a href="ui-modals.html">Modals</a></li>
                                <li><a href="ui-progressbars.html">Progress Bars</a></li>
                                <li><a href="ui-tabs.html">Tabs</a></li>
                                <li><a href="ui-typography.html">Typography</a></li>
                                <li><a href="ui-toasts.html">Toasts</a></li>
                                <li><a href="ui-tooltips-popovers.html">Tooltips & Popovers</a></li>
                                <li><a href="ui-scrollspy.html">Scrollspy</a></li>
                                <li><a href="ui-spinners.html">Spinners</a></li>
                                <li><a href="ui-sweetalerts.html">Sweet Alerts</a></li>
                            </ul>
                        </li>

                        <li>
                            <a href="javascript:void(0);" className="has-arrow waves-effect">
                                <i className="mdi mdi-table-merge-cells"></i>
                                <span>Tables</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><a href="tables-basic.html">Basic Tables</a></li>
                                <li><a href="tables-datatables.html">Data Tables</a></li>
                            </ul>
                        </li>

                        <li>
                            <a href="javascript:void(0);" className="has-arrow waves-effect">
                                <i className="mdi mdi-poll"></i>
                                <span>Charts</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><a href="charts-morris.html">Morris</a></li>
                                <li><a href="charts-google.html">Google</a></li>
                                <li><a href="charts-chartjs.html">Chartjs</a></li>
                                <li><a href="charts-sparkline.html">Sparkline</a></li>
                                <li><a href="charts-knob.html">Jquery Knob</a></li>
                            </ul>
                        </li>

                        <li>
                            <a href="javascript:void(0);" className="waves-effect">
                                <i className="mdi mdi-format-list-bulleted-type"></i>
                                <span className="badge badge-pill badge-danger float-right">6</span>
                                <span>Forms</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><a href="forms-elements.html">Elements</a></li>
                                <li><a href="forms-plugins.html">Plugins</a></li>
                                <li><a href="forms-validation.html">Validation</a></li>
                                <li><a href="forms-mask.html">Masks</a></li>
                                <li><a href="forms-quilljs.html">Quilljs</a></li>
                                <li><a href="forms-uploads.html">File Uploads</a></li>
                            </ul>
                        </li>

                        <li>
                            <a href="javascript:void(0);" className="has-arrow waves-effect">
                                <i className="mdi mdi-black-mesa"></i>
                                <span>Icons</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><a href="icons-materialdesign.html">Material Design</a></li>
                                <li><a href="icons-fontawesome.html">Font awesome</a></li>
                                <li><a href="icons-dripicons.html">Dripicons</a></li>
                                <li><a href="icons-feather.html">Feather Icons</a></li>
                            </ul>
                        </li>

                        <li className="menu-title">More</li>

                        <li>
                            <a href="javascript:void(0);" className="has-arrow waves-effect">
                                <i className="mdi mdi-format-page-break"></i>
                                <span>Pages</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><a href="pages-invoice.html">Invoice</a></li>
                                <li><a href="pages-starter.html">Starter Page</a></li>
                                <li><a href="pages-maintenance.html">Maintenance</a></li>
                                <li><a href="pages-faqs.html">FAQs</a></li>
                                <li><a href="pages-pricing.html">Pricing</a></li>
                                <li><a href="pages-login.html">Login</a></li>
                                <li><a href="pages-register.html">Register</a></li>
                                <li><a href="pages-recoverpw.html">Recover Password</a></li>
                                <li><a href="pages-lock-screen.html">Lock Screen</a></li>
                                <li><a href="pages-404.html">Error 404</a></li>
                                <li><a href="pages-500.html">Error 500</a></li>
                            </ul>
                        </li>

                        <li><a href="calendar.html" className="waves-effect"><i className="mdi mdi-calendar-range-outline"></i><span>Calendar</span></a></li>

                        <li>
                            <a href="javascript:void(0);" className="has-arrow waves-effect">
                                <i className="mdi mdi-map-marker-radius"></i>
                                <span>Maps</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><a href="maps-google.html">Google Maps</a></li>
                                <li><a href="maps-vector.html">Vector Maps</a></li>
                            </ul>
                        </li>

                        <li>
                            <a href="javascript:void(0);" className="has-arrow waves-effect">
                                <i className="mdi mdi-share-variant"></i>
                                <span>Multi Level</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="true">
                                <li><a href="javascript:void(0);">Level 1.1</a></li>
                                <li>
                                    <a href="javascript:void(0);" className="has-arrow">Level 1.2</a>
                                    <ul className="sub-menu" aria-expanded="true">
                                        <li><a href="javascript:void(0);">Level 2.1</a></li>
                                        <li><a href="javascript:void(0);">Level 2.2</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div>
                {/* Sidebar */}
            </div>
        </div>
        // Left Sidebar End 
    );
};

export default Sidebar;
