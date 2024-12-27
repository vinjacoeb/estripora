import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Admin = () => {
  const [adminList, setAdminList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminList();
  }, []);

  const fetchAdminList = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/api/akun/akun', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Filter data hanya untuk role "Admin"
      const filteredData = response.data.filter(admin => admin.role === 'Admin');
      setAdminList(filteredData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response && error.response.data.message === 'Invalid token.') {
        Swal.fire({
          icon: 'error',
          title: 'Sesi Berakhir',
          text: 'Silakan login kembali.',
        });
        navigate('/login');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Gagal Memuat Data',
          text: 'Terjadi kesalahan saat memuat data. Silakan coba lagi nanti.',
        });
      }
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
        deleteAdmin(id);
      }
    });
  };

  const deleteAdmin = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/api/akun/admin/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      Swal.fire('Berhasil!', 'Data telah dihapus.', 'success');
      fetchAdminList();
    } catch (error) {
      console.error('Error deleting data:', error);
      if (error.response && error.response.data.message === 'Invalid token.') {
        Swal.fire({
          icon: 'error',
          title: 'Sesi Berakhir',
          text: 'Silakan login kembali.',
        });
        navigate('/login');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Gagal Menghapus Data',
          text: 'Terjadi kesalahan saat menghapus data. Silakan coba lagi.',
        });
      }
    }
  };

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = adminList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(adminList.length / itemsPerPage);

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* Page Title */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h2 className="font-weight-bold text-primary" style={{ fontSize: '2rem' }}>
                  Admin Management
                </h2>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active">Admin Management</li>
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
                  <div className="mb-3">
                    <Link to="/admin-admin/add" className="btn btn-success">
                      <i className="fas fa-plus mr-1"></i> Tambah Admin
                    </Link>
                  </div>
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
                            <th style={{ width: '35%' }}>Name</th>
                            <th style={{ width: '30%' }}>Email</th>
                            <th style={{ width: '30%' }}>NIK</th>
                            <th style={{ width: '25%' }}>No Telepon</th>
                            <th style={{ width: '10%' }}>Role</th>
                            <th className="text-center" style={{ width: '10%' }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((admin, index) => (
                            <tr key={admin.id}>
                              <td className="text-center">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                              <td>{admin.user}</td>
                              <td>{admin.email}</td>
                              <td>{admin.nik}</td>
                              <td>{admin.no_tlp}</td>
                              <td>{admin.role}</td>
                              <td className="text-center">
                                <div className="d-flex justify-content-center gap-2">
                                  <Link 
                                    to={`/admin-admin/edit/${admin.id_user}`}
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
                                  <button 
                                    onClick={() => handleDeleteClick(admin.id_user)}
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

export default Admin;
