import React from 'react';

const Dashboard = () => {
    return (
        <div className="main-content">

            <div className="page-content">
                <div className="container-fluid">

                    {/* start page title */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h4 className="mb-0 font-size-18">Dashboard</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="javascript:void(0);">Xeloro</a></li>
                                        <li className="breadcrumb-item active">Dashboard</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* end page title */}

                    <div className="row">
                        <div className="col-md-6 col-xl-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-4">
                                        <span className="badge badge-soft-primary float-right">Daily</span>
                                        <h5 className="card-title mb-0">Cost per Unit</h5>
                                    </div>
                                    <div className="row d-flex align-items-center mb-4">
                                        <div className="col-8">
                                            <h2 className="d-flex align-items-center mb-0">
                                                $17.21
                                            </h2>
                                        </div>
                                        <div className="col-4 text-right">
                                            <span className="text-muted">12.5% <i
                                                className="mdi mdi-arrow-up text-success"></i></span>
                                        </div>
                                    </div>

                                    <div className="progress shadow-sm" style={{ height: '5px' }}>
                                        <div className="progress-bar bg-success" role="progressbar" style={{ width: '57%' }}>
                                        </div>
                                    </div>
                                </div>
                                {/*end card body*/}
                            </div>{/* end card*/}
                        </div> {/* end col*/}

                        <div className="col-md-6 col-xl-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-4">
                                        <span className="badge badge-soft-primary float-right">Per Week</span>
                                        <h5 className="card-title mb-0">Market Revenue</h5>
                                    </div>
                                    <div className="row d-flex align-items-center mb-4">
                                        <div className="col-8">
                                            <h2 className="d-flex align-items-center mb-0">
                                                $1875.54
                                            </h2>
                                        </div>
                                        <div className="col-4 text-right">
                                            <span className="text-muted">18.71% <i
                                                className="mdi mdi-arrow-down text-danger"></i></span>
                                        </div>
                                    </div>

                                    <div className="progress shadow-sm" style={{ height: '5px' }}>
                                        <div className="progress-bar bg-danger" role="progressbar" style={{ width: '57%' }}>
                                        </div>
                                    </div>
                                </div>
                                {/*end card body*/}
                            </div>{/* end card*/}
                        </div> {/* end col*/}

                        <div className="col-md-6 col-xl-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-4">
                                        <span className="badge badge-soft-primary float-right">Per Month</span>
                                        <h5 className="card-title mb-0">Expenses</h5>
                                    </div>
                                    <div className="row d-flex align-items-center mb-4">
                                        <div className="col-8">
                                            <h2 className="d-flex align-items-center mb-0">
                                                $784.62
                                            </h2>
                                        </div>
                                        <div className="col-4 text-right">
                                            <span className="text-muted">57% <i
                                                className="mdi mdi-arrow-up text-success"></i></span>
                                        </div>
                                    </div>

                                    <div className="progress shadow-sm" style={{ height: '5px' }}>
                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: '57%' }}>
                                        </div>
                                    </div>
                                </div>
                                {/*end card body*/}
                            </div>
                            {/*end card*/}
                        </div> {/* end col*/}

                        <div className="col-md-6 col-xl-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-4">
                                        <span className="badge badge-soft-primary float-right">All Time</span>
                                        <h5 className="card-title mb-0">Daily Visits</h5>
                                    </div>
                                    <div className="row d-flex align-items-center mb-4">
                                        <div className="col-8">
                                            <h2 className="d-flex align-items-center mb-0">
                                                1,15,187
                                            </h2>
                                        </div>
                                        <div className="col-4 text-right">
                                            <span className="text-muted">17.8% <i
                                                className="mdi mdi-arrow-down text-danger"></i></span>
                                        </div>
                                    </div>

                                    <div className="progress shadow-sm" style={{ height: '5px' }}>
                                        <div className="progress-bar bg-info" role="progressbar" style={{ width: '57%' }}></div>
                                    </div>
                                </div>
                                {/*end card body*/}
                            </div>{/* end card*/}
                        </div> {/* end col*/}
                    </div>
                    {/* end row*/}

                    <div className="row">
                        <div className="col-lg-9">

                            <div className="card">
                                <div className="card-body">

                                    <div className="row">
                                        <div className="col-lg-8">
                                            <h4 className="card-title">Sales Analytics</h4>
                                            <p className="card-subtitle mb-4">From date of 1st Jan 2020 to continue</p>
                                            <div id="morris-bar-example" className="morris-chart"></div>
                                        </div>

                                        <div className="col-lg-4">

                                            <h4 className="card-title">Stock</h4>
                                            <p className="card-subtitle mb-4">Recent Stock</p>

                                            <div className="text-center">
                                                <input data-plugin="knob" data-width="165" data-height="165"
                                                    data-linecap="round" data-fgColor="#7a08c2" value="95"
                                                    data-skin="tron" data-angleOffset="180" data-readOnly="true"
                                                    data-thickness=".15" />
                                                <h5 className="text-muted mt-3">Total sales made today</h5>

                                                <p className="text-muted w-75 mx-auto sp-line-2">Traditional heading
                                                    elements are
                                                    designed to work best in the meat of your page content.</p>

                                                <div className="row mt-3">
                                                    <div className="col-6">
                                                        <p className="text-muted font-15 mb-1 text-truncate">Target</p>
                                                        <h4><i className="fas fa-arrow-up text-success mr-1"></i>$7.8k</h4>
                                                    </div>
                                                    <div className="col-6">
                                                        <p className="text-muted font-15 mb-1 text-truncate">Last week</p>
                                                        <h4><i className="fas fa-arrow-down text-danger mr-1"></i>$1.4k</h4>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                {/*end card body*/}
                            </div> {/* end card*/}
                        </div> {/* end col */}

                        <div className="col-lg-3">

                            <div className="card">
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h4 className="card-title">Account Transactions</h4>
                                            <p className="card-subtitle mb-4">Transaction period from 21 July to
                                                25 Aug</p>
                                            <h3>$7841.12 <span className="badge badge-soft-success float-right">+7.5%</span></h3>
                                        </div>
                                    </div> {/* end row */}

                                    <div id="sparkline1" className="mt-3"></div>
                                </div>
                                {/*end card body*/}
                            </div>
                            {/*end card*/}

                        </div>{/* end col */}

                    </div>
                    {/*end row*/}

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="dropdown float-right position-relative">
                                        <a href="#" className="dropdown-toggle arrow-none card-drop"
                                            data-toggle="dropdown" aria-expanded="false">
                                            <i className="mdi mdi-dots-horizontal"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a className="dropdown-item" href="#">Action</a>
                                            <a className="dropdown-item" href="#">Another action</a>
                                            <a className="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </div>

                                    <h4 className="card-title">Recent Activities</h4>
                                    <div className="activity">
                                        <div className="activity-item">
                                            <div className="activity-timeline">
                                                <div className="activity-icon">
                                                    <i className="fas fa-plus-circle text-success"></i>
                                                </div>
                                                <div className="activity-detail">
                                                    <h5 className="mb-1">You added a new task</h5>
                                                    <p className="mb-1 text-muted">3 minutes ago</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="activity-item">
                                            <div className="activity-timeline">
                                                <div className="activity-icon">
                                                    <i className="fas fa-edit text-warning"></i>
                                                </div>
                                                <div className="activity-detail">
                                                    <h5 className="mb-1">You edited a task</h5>
                                                    <p className="mb-1 text-muted">5 minutes ago</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="activity-item">
                                            <div className="activity-timeline">
                                                <div className="activity-icon">
                                                    <i className="fas fa-trash-alt text-danger"></i>
                                                </div>
                                                <div className="activity-detail">
                                                    <h5 className="mb-1">You deleted a task</h5>
                                                    <p className="mb-1 text-muted">10 minutes ago</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="activity-item">
                                            <div className="activity-timeline">
                                                <div className="activity-icon">
                                                    <i className="fas fa-check-circle text-primary"></i>
                                                </div>
                                                <div className="activity-detail">
                                                    <h5 className="mb-1">You completed a task</h5>
                                                    <p className="mb-1 text-muted">30 minutes ago</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*end card body*/}
                            </div>
                            {/*end card*/}
                        </div> {/* end col */}

                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Activity Log</h4>
                                    <div className="table-responsive">
                                        <table className="table table-nowrap table-hover mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Timestamp</th>
                                                    <th>Activity</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>01 Jan 2023</td>
                                                    <td>Account Created</td>
                                                    <td><span className="badge badge-soft-success">Success</span></td>
                                                </tr>
                                                <tr>
                                                    <td>02 Jan 2023</td>
                                                    <td>Password Changed</td>
                                                    <td><span className="badge badge-soft-success">Success</span></td>
                                                </tr>
                                                <tr>
                                                    <td>03 Jan 2023</td>
                                                    <td>Login Attempt</td>
                                                    <td><span className="badge badge-soft-danger">Failed</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/*end card body*/}
                            </div>
                            {/*end card*/}
                        </div> {/* end col */}

                    </div>
                    {/* end row */}

                </div> {/* container-fluid */}
            </div>
            {/* page-content */}
        </div>
    );
};

export default Dashboard;
