import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const SaranaTambah = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    kecamatan: '',
    nama: '',
    sarana: '',
    harga: '',
    gambar: null
  });
  
  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      gambar: file
    }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('kecamatan', formData.kecamatan);
    formDataToSend.append('nama', formData.nama);
    formDataToSend.append('sarana', formData.sarana);
    formDataToSend.append('harga', formData.harga);
    if (formData.gambar) {
      formDataToSend.append('gambar', formData.gambar);
    }

    try {
      await axios.post('http://localhost:3001/backend', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Data berhasil ditambahkan!',
        timer: 2000,
        showConfirmButton: false
      });
      // Ubah ke halaman /admin-sarana setelah berhasil menambahkan data
      navigate('/admin-sarana');
    } catch (error) {
      console.error('Error adding data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Gagal menambahkan data. Silakan coba lagi.',
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
                  Tambah Data Sarana
                </h2>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><Link to="/">Xeloro</Link></li>
                    <li className="breadcrumb-item"><Link to="/">Data Sarana</Link></li>
                    <li className="breadcrumb-item active">Tambah Data</li>
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
                        <label className="form-label">Nama</label>
                        <input
                          type="text"
                          className="form-control"
                          name="nama"
                          value={formData.nama}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Sarana</label>
                        <input
                          type="text"
                          className="form-control"
                          name="sarana"
                          value={formData.sarana}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Harga</label>
                        <input
                          type="number"
                          className="form-control"
                          name="harga"
                          value={formData.harga}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="col-md-12 mb-3">
                        <label className="form-label">Gambar</label>
                        <input
                          type="file"
                          className="form-control"
                          name="gambar"
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                        {previewImage && (
                          <div className="mt-3">
                            <img
                              src={previewImage}
                              alt="Preview"
                              style={{ width: '100%', maxWidth: '300px' }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                      <Link to="/admin-sarana" className="btn btn-secondary">
                        Kembali
                      </Link>
                      <button type="submit" className="btn btn-primary">
                        Simpan
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

export default SaranaTambah;
