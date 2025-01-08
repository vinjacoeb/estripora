import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditPembatalan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    status: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/pembayaran/pembayaran/${id}`);
        console.log('Fetched Data:', response.data.data); // Log the data to check its structure
        setFormData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: 'Gagal mengambil data. Silakan coba lagi.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    };
    fetchData();
  }, [id]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3001/api/pembayaran/pembayaran/${id}`, { status: formData.status });
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Status pembayaran berhasil diperbarui!',
        timer: 2000,
        showConfirmButton: false
      });
      navigate('/admin-pembayaran'); // Redirect to payment admin page
    } catch (error) {
      console.error('Error updating status:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Gagal memperbarui status. Silakan coba lagi.',
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row mb-4">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h2 className="font-weight-bold text-primary" style={{ fontSize: '2rem' }}>
                  Edit Pembayaran
                </h2>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><Link to="/">Xeloro</Link></li>
                    <li className="breadcrumb-item"><Link to="/">Pembayaran</Link></li>
                    <li className="breadcrumb-item active">Edit Pembayaran</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">

                      <div className="col-md-4 mb-3">
                        <label className="form-label">Status</label>
                        <select
                          className="form-control"
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="Pending">Pending</option>
                          <option value="Berhasil">Berhasil</option>
                          <option value="Dibatalkan">Dibatalkan</option>
                        </select>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                      <Link to="/admin-pembayaran" className="btn btn-secondary">
                        Kembali
                      </Link>
                      <button type="submit" className="btn btn-primary">
                        Simpan Perubahan
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPembatalan;
