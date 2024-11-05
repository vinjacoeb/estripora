import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Sarana = () => {
  const [saranaList, setSaranaList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios.get('http://localhost:3001/backend')
      .then((response) => {
        setSaranaList(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Function to truncate image name
  const truncateImageName = (imageName) => {
    if (!imageName) return '-';
    if (imageName.length <= 5) return imageName;
    return imageName.substring(0, 5) + '...';
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = saranaList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(saranaList.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          
          {/* start page title */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h2 className="font-weight-bold text-primary" style={{ fontSize: '2rem' }}>
                  Data Sarana
                </h2>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><Link to="/"></Link></li>
                    <li className="breadcrumb-item active">Data Sarana</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* end page title */}

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="mb-3">
                    <Link to="/admin-sarana/add" className="btn btn-success">
                      <i className="fas fa-plus mr-1"></i> Tambah Sarana
                    </Link>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-bordered table-hover mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th className="text-center align-middle" style={{ width: '5%' }}>No</th>
                          <th className="align-middle" style={{ width: '20%' }}>Kecamatan</th>
                          <th className="align-middle" style={{ width: '20%' }}>Nama</th>
                          <th className="align-middle" style={{ width: '20%' }}>Sarana</th>
                          <th className="text-center align-middle" style={{ width: '15%' }}>Gambar</th>
                          <th className="text-center align-middle" style={{ width: '10%' }}>Harga</th>
                          <th className="text-center align-middle" style={{ width: '10%' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.map((sarana, index) => (
                          <tr key={sarana.id}>
                            <td className="text-center align-middle">
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td className="align-middle">{sarana.kecamatan}</td>
                            <td className="align-middle">{sarana.nama}</td>
                            <td className="align-middle">{sarana.sarana}</td>
                            <td className="text-center align-middle">
                              <span className="text-muted">
                                {truncateImageName(sarana.gambar)}
                              </span>
                            </td>
                            <td className="text-right align-middle">
                              Rp {sarana.harga || '0'}
                            </td>
                            <td className="text-center align-middle">
                              <div className="d-flex justify-content-center gap-2">
                                <Link 
                                  to={`/admin-sarana/edit/${sarana.id}`}
                                  className="btn btn-primary p-1"
                                  style={{ 
                                    width: '28px', 
                                    height: '28px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '4px',
                                    fontSize: '0.7rem'
                                  }}
                                  title="Edit"
                                >
                                  <i className="fas fa-edit fa-sm"></i>
                                </Link>
                                <Link 
                                  to={`/delete/${sarana.id}`}
                                  className="btn btn-danger p-1"
                                  style={{ 
                                    width: '28px', 
                                    height: '28px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.7rem'
                                  }}
                                  title="Delete"
                                >
                                  <i className="fas fa-trash fa-sm"></i>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="d-flex justify-content-center mt-4">
                    <nav>
                      <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            Previous
                          </button>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (
                          <li 
                            key={index + 1} 
                            className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                          >
                            <button
                              className="page-link"
                              onClick={() => paginate(index + 1)}
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Sarana;