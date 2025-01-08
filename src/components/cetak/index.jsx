import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';

const Cetak = () => {
  const [transactionsList, setTransactionsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const id_user = localStorage.getItem('id'); // Ambil id_user dari localStorage
    if (id_user) {
      fetchTransactionsList(id_user); // Kirim id_user ke server
    } else {
      console.log('id_user tidak ditemukan di localStorage');
    }
  }, []);

  const fetchTransactionsList = (id_user) => {
    axios.get(`http://localhost:3001/api/transaksi/transaksi?id_user=${id_user}`)
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

  // Handle Print Button Click
  const handlePrint = (order_id) => {
    const doc = new jsPDF();
    // Menambahkan judul
    doc.setFontSize(18);
    doc.text('Laporan Transaksi', 14, 20);
    
    // Menambahkan detail transaksi
    const transaction = transactionsList.find(item => item.order_id === order_id);
    if (transaction) {
      doc.setFontSize(12);
      doc.text(`Order ID: ${transaction.order_id}`, 14, 30);
      doc.text(`Customer Name: ${transaction.customer_name}`, 14, 40);
      doc.text(`Customer Email: ${transaction.customer_email}`, 14, 50);
      doc.text(`Sarana: ${transaction.sarana}`, 14, 60);
      doc.text(`Tanggal: ${transaction.tanggal}`, 14, 70);
      doc.text(`Start Time: ${transaction.start_time}`, 14, 80);
      doc.text(`End Time: ${transaction.end_time}`, 14, 90);
      doc.text(`Gross Amount: Rp ${transaction.gross_amount}`, 14, 100);
      doc.text(`Status: ${transaction.status}`, 14, 110);
    }
    
    doc.save(`Transaksi_${order_id}.pdf`);
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
                                <button 
                                  onClick={() => handlePrint(transaction.order_id)}
                                  className="btn btn-info p-1"
                                  style={{ 
                                    width: '28px', 
                                    height: '28px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.7rem'
                                  }}
                                  title="Cetak"
                                >
                                  <i className="fas fa-print fa-sm"></i>
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

export default Cetak;
