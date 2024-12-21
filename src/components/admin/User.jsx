import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const User = () => {
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/api/akun/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Mengubah status numerik menjadi teks "User"
      const formattedData = response.data.map(user => ({
        ...user,
        status: 'User'
      }));
      setUserList(formattedData || []);
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
        deleteUser(id);
      }
    });
  };

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/api/akun/user/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      Swal.fire('Berhasil!', 'Data telah dihapus.', 'success');
      fetchUserList();
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
  const currentItems = userList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(userList.length / itemsPerPage);

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* Page Title */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h2 className="font-weight-bold text-primary" style={{ fontSize: '2rem' }}>
                  User Management
                </h2>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active">User Management</li>
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
                            <th style={{ width: '35%' }}>Name</th>
                            <th style={{ width: '40%' }}>Email</th>
                            <th style={{ width: '10%' }}>Status</th>
                            <th className="text-center" style={{ width: '10%' }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((user, index) => (
                            <tr key={user.id}>
                              <td className="text-center">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                              <td>{user.user}</td>
                              <td>{user.email}</td>
                              <td>{user.status}</td>
                              <td className="text-center">
                                <button 
                                  onClick={() => handleDeleteClick(user.id)}
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

export default User;