import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const SaranaEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama_sarana: '',
    harga: '',
    deskripsi: '',
    gambar: null
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [existingImage, setExistingImage] = useState('');

  // Fetch existing data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/backend/${id}`);
        setFormData(response.data);
        if (response.data.gambar) {
          setExistingImage(response.data.gambar);
          setPreviewImage(response.data.gambar);
        }
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        gambar: file
      }));
      setPreviewImage(URL.createObjectURL(file));
      setExistingImage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('nama_sarana', formData.nama_sarana);
    formDataToSend.append('harga', formData.harga);
    formDataToSend.append('deskripsi', formData.deskripsi);

    if (formData.gambar instanceof File) {
      formDataToSend.append('gambar', formData.gambar);
    } else {
      formDataToSend.append('gambar', existingImage);
    }

    try {
      await axios.put(`http://localhost:3001/backend/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Data berhasil diperbarui!',
        timer: 2000,
        showConfirmButton: false
      });
      navigate('/admin-sarana');
    } catch (error) {
      console.error('Error updating data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Gagal memperbarui data. Silakan coba lagi.',
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
                  Edit Data Sarana
                </h2>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><Link to="/">Xeloro</Link></li>
                    <li className="breadcrumb-item"><Link to="/admin-sarana">Data Sarana</Link></li>
                    <li className="breadcrumb-item active">Edit Data</li>
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
                        <label className="form-label">Nama Sarana</label>
                        <input
                          type="text"
                          className="form-control"
                          name="nama_sarana"
                          value={formData.nama_sarana}
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
                        <label className="form-label">Deskripsi</label>
                        <textarea
                          className="form-control"
                          name="deskripsi"
                          value={formData.deskripsi}
                          onChange={handleInputChange}
                          rows="4"
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
                            <p className="text-muted mb-2">
                              {existingImage ? 'Gambar Saat Ini:' : 'Preview Gambar Baru:'}
                            </p>
                            <img
                              src={previewImage}
                              alt="Preview"
                              style={{ width: '100%', maxWidth: '300px' }}
                              className="border rounded"
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

export default SaranaEdit;
