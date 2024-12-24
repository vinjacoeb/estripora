import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Sarana = () => {
  const [saranaList, setSaranaList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchSaranaList();
  }, []);

  const fetchSaranaList = () => {
    axios.get('http://localhost:3001/backend')
      .then((response) => {
        setSaranaList(response.data);
      })
      .catch((error) => console.log(error));
  };

  // Function to handle delete confirmation
  const handleDeleteClick = (id) => {
    Swal.fire({
      title: 'Apakah anda yakin?',
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  // Function to execute delete
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/backend/${id}`)
      .then(() => {
        Swal.fire({
          title: 'Terhapus!',
          text: 'Data berhasil dihapus.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
        fetchSaranaList(); // Refresh the list after deletion
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Gagal menghapus data.',
          icon: 'error',
          timer: 1500,
          showConfirmButton: false
        });
      });
  };

  // Updated function to show last 5 characters and file extension
  const truncateImageName = (imageName) => {
    if (!imageName) return '-';
    
    // Find the last dot to separate extension
    const lastDotIndex = imageName.lastIndexOf('.');
    if (lastDotIndex === -1) return imageName; // No extension found
    
    const extension = imageName.substring(lastDotIndex); // Get the extension with dot
    const nameWithoutExtension = imageName.substring(0, lastDotIndex);
    
    // Get last 5 characters of the name (or whole name if less than 5)
    const last5Chars = nameWithoutExtension.slice(-5);
    
    // If name is longer than 5 characters, add ellipsis
    const prefix = nameWithoutExtension.length > 5 ? '...' : '';
    
    return prefix + last5Chars + extension;
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
          {/* Page Title */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h2 className="font-weight-bold text-primary" style={{ fontSize: '2rem' }}>
                  Data Sarana
                </h2>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active">Data Sarana</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="mb-3">
                    <Link to="/admin-kategori/add" className="btn btn-success">
                      <i className="fas fa-plus mr-1"></i> Tambah Sarana
                    </Link>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-bordered table-hover mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th className="text-center align-middle" style={{ width: '5%' }}>No</th>
                          <th className="align-middle" style={{ width: '20%' }}>Nama Sarana</th>
                          <th className="align-middle" style={{ width: '20%' }}>Kategori</th>
                          <th className="align-middle" style={{ width: '20%' }}>Deskripsi</th>
                          <th className="text-center align-middle" style={{ width: '15%' }}>Gambar</th>
                          <th className="text-center align-middle" style={{ width: '10%' }}>Harga</th>
                          <th className="text-center align-middle" style={{ width: '10%' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.map((sarana, index) => (
                          <tr key={sarana.id_sarana}>
                            <td className="text-center align-middle">
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td className="align-middle">{sarana.nama_sarana}</td>
                            <td className="align-middle">{sarana.nama_kategori}</td>
                            <td className="align-middle">{sarana.deskripsi}</td>
                            <td className="align-middle">{sarana.gambar}</td>

                            <td className="text-right align-middle">
                              Rp {sarana.harga.toLocaleString('id-ID')}
                            </td>
                            <td className="text-center align-middle">
                              <div className="d-flex justify-content-center gap-2">
                                <Link 
                                  to={`/admin-kategori/edit/${sarana.id_sarana}`}
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
                                  onClick={() => handleDeleteClick(sarana.id_sarana)}
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