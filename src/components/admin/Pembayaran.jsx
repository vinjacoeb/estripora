import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Pembayaran = () => {
  const [transactionsList, setTransactionsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchTransactionsList();
  }, []);

  const fetchTransactionsList = () => {
    axios.get('http://localhost:3001/api/pembayaran/pembayaran')
      .then((response) => {
        if (response.data && Array.isArray(response.data.data)) {
          setTransactionsList(response.data.data); // Pastikan data adalah array
        } else {
          setTransactionsList([]); // Set state ke array kosong jika data tidak valid
          console.error('Invalid data format:', response.data);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  };
        

  // Handle delete confirmation
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

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/pembayaran/pembayaran/${id}`)
      .then(() => {
        Swal.fire({
          title: 'Terhapus!',
          text: 'Data berhasil dihapus.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
        fetchTransactionsList();
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

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactionsList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(transactionsList.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          
          {/* Page title */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h2 className="font-weight-bold text-primary" style={{ fontSize: '2rem' }}>
                  Data Pembayaran
                </h2>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th className="text-center align-middle">No</th>
                          <th className="align-middle">Order ID</th>
                          <th className="align-middle">Gross Amount</th>
                          <th className="align-middle">Customer Name</th>
                          <th className="align-middle">Customer Email</th>
                          <th className="align-middle">Sarana</th>
                          <th className="align-middle">Tanggal</th>
                          <th className="align-middle">Start Time</th>
                          <th className="align-middle">End Time</th>
                          <th className="align-middle">Status</th>
                          <th className="text-center align-middle">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.map((transaction, index) => (
                          <tr key={transaction.id}>
                            <td className="text-center align-middle">
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td className="align-middle">{transaction.order_id}</td>
                            <td className="align-middle">Rp {transaction.gross_amount}</td>
                            <td className="align-middle">{transaction.customer_name}</td>
                            <td className="align-middle">{transaction.customer_email}</td>
                            <td className="align-middle">{transaction.sarana}</td>
                            <td className="align-middle">{transaction.tanggal}</td>
                            <td className="align-middle">{transaction.start_time}</td>
                            <td className="align-middle">{transaction.end_time}</td>
                            <td className="align-middle">{transaction.status}</td>
                            <td className="text-center align-middle">
                            <div className="d-flex justify-content-center gap-2">
                                <Link 
                                  to={`/admin-pembayaran/edit/${transaction.id}`}
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
                                  onClick={() => handleDeleteClick(transaction.id)}
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

export default Pembayaran;
