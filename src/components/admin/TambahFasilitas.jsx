import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const FasilitasTambah = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama_fasilitas: '',
    id_sarana: '',
    qty: '',
    kondisi: '',
  });
  const [sarpras, setSarpras] = useState([]); // Menyimpan data sarana prasarana
  const [loading, setLoading] = useState(false);

  // Fetch daftar sarana saat komponen dimuat
  useEffect(() => {
    const fetchSarpras = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3001/api/fasilitas/sarana'); // Ganti endpoint dengan sesuai
        setSarpras(response.data);
      } catch (error) {
        console.error('Error fetching sarpras:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSarpras();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/api/fasilitas/fasilitas-add', formData);
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Data fasilitas berhasil ditambahkan!',
        timer: 2000,
        showConfirmButton: false,
      });
      navigate('/admin-fasilitas');
    } catch (error) {
      console.error('Error adding fasilitas:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Gagal menambahkan data fasilitas. Silakan coba lagi.',
        timer: 2000,
        showConfirmButton: false,
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
                  Tambah Data Fasilitas
                </h2>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><Link to="/">Xeloro</Link></li>
                    <li className="breadcrumb-item"><Link to="/admin-fasilitas">Data Fasilitas</Link></li>
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
                        <label className="form-label">Nama Fasilitas</label>
                        <input
                          type="text"
                          className="form-control"
                          name="nama_fasilitas"
                          value={formData.nama_fasilitas}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Sarana</label>
                        <select
                          className="form-control"
                          name="id_sarana"
                          value={formData.id_sarana}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Pilih Sarana</option>
                          {loading ? (
                            <option value="">Loading...</option>
                          ) : (
                            sarpras.map((sarana) => (
                              <option key={sarana.id_sarana} value={sarana.id_sarana}>
                                {sarana.nama_sarana}
                              </option>
                            ))
                          )}
                        </select>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Kuantitas (Qty)</label>
                        <input
                          type="number"
                          className="form-control"
                          name="qty"
                          value={formData.qty}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Kondisi</label>
                        <select
                          className="form-control"
                          name="kondisi"
                          value={formData.kondisi}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Pilih Kondisi</option>
                          <option value="Baik">Baik</option>
                          <option value="Rusak">Rusak</option>
                        </select>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                      <Link to="/admin-fasilitas" className="btn btn-secondary">
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

export default FasilitasTambah;
