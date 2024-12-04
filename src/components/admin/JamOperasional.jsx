import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const JamOperasional = () => {
  const [jamList, setJamList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchJamList();
  }, []);

  const fetchJamList = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/adminJam/jam');
      setJamList(response.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Memuat Data',
        text: 'Terjadi kesalahan saat memuat data. Silakan coba lagi nanti.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: 'Data yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteJam(id);
      }
    });
  };

  const deleteJam = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/adminJam/jam/${id}`);
      Swal.fire('Berhasil!', 'Data telah dihapus.', 'success');
      fetchJamList();
    } catch (error) {
      console.error('Error deleting data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menghapus Data',
        text: 'Terjadi kesalahan saat menghapus data. Silakan coba lagi.',
      });
    }
  };

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jamList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(jamList.length / itemsPerPage);

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* Page Title */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h2 className="font-weight-bold text-primary" style={{ fontSize: '2rem' }}>
                  Jam Operasional
                </h2>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active">Jam Operasional</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  {isLoading ? (
                    <div className="text-center">
                      <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover mb-0">
                        <thead className="thead-light">
                          <tr>
                            <th className="text-center" style={{ width: '5%' }}>No</th>
                            <th style={{ width: '50%' }}>Sarana</th>
                            <th className="text-center" style={{ width: '20%' }}>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((jam, index) => (
                            <tr key={jam.id}>
                              <td className="text-center">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                              <td>{jam.sarana}</td>
                              <td className="text-center">
                                <div className="btn-group">
                                  <Link to={`/admin-JamOperasional/edit/${jam.id}`} className="btn btn-primary btn-sm">
                                    <i className="fas fa-edit"></i>
                                  </Link>
                                  <button onClick={() => handleDeleteClick(jam.id)} className="btn btn-danger btn-sm">
                                    <i className="fas fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Pagination */}
                  {!isLoading && (
                    <div className="d-flex justify-content-center mt-4">
                      <nav>
                        <ul className="pagination">
                          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                              Previous
                            </button>
                          </li>
                          {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                              <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                                {index + 1}
                              </button>
                            </li>
                          ))}
                          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                              Next
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JamOperasional;
