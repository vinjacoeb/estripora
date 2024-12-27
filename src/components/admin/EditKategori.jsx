import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditKategori = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id_kategori: '',
    nama_kategori: '',
    alamat: '',
    kecamatan: '',
    lokasi: ''
  });

  // Fetch existing data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/kategori/${id}`);
        setFormData(response.data);
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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // For id_kategori, convert to uppercase and enforce 2-3 letter format
    if (name === 'id_kategori') {
      const formattedValue = value
        .toUpperCase()
        .replace(/[^A-Z]/g, '')
        .slice(0, 3);
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3001/api/kategori/${id}`, formData);
      
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Kategori berhasil diperbarui!',
        timer: 2000,
        showConfirmButton: false
      });
      
      navigate('/admin-kategori');
    } catch (error) {
      console.error('Error updating category:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: error.response?.data?.error || 'Gagal memperbarui kategori. Silakan coba lagi.',
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* Page Title */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h2 className="font-weight-bold text-primary" style={{ fontSize: '2rem' }}>
                  Edit Kategori
                </h2>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/admin-kategori">Data Kategori</Link></li>
                    <li className="breadcrumb-item active">Edit Kategori</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">ID Kategori</label>
                        <input
                          type="text"
                          className="form-control"
                          name="id_kategori"
                          value={formData.id_kategori}
                          onChange={handleInputChange}
                          placeholder="TJ"
                          minLength={2}
                          maxLength={3}
                          pattern="[A-Z]{2,3}"
                          title="Masukkan 2-3 huruf kapital"
                          readOnly // Make ID field readonly in edit mode
                        />
                        <small className="text-muted">ID Kategori tidak dapat diubah</small>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Nama Kategori</label>
                        <input
                          type="text"
                          className="form-control"
                          name="nama_kategori"
                          value={formData.nama_kategori}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="col-md-12 mb-3">
                        <label className="form-label">Alamat</label>
                        <textarea
                          className="form-control"
                          name="alamat"
                          value={formData.alamat}
                          onChange={handleInputChange}
                          rows="3"
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Kecamatan</label>
                        <input
                          type="text"
                          className="form-control"
                          name="kecamatan"
                          value={formData.kecamatan}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Lokasi</label>
                        <textarea
                          className="form-control"
                          name="lokasi"
                          value={formData.lokasi}
                          onChange={handleInputChange}
                          rows="3"
                          required
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                      <Link to="/admin-kategori" className="btn btn-secondary">
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

export default EditKategori;