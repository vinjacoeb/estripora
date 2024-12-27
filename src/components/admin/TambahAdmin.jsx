import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const TambahAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user: '',
    email: '',
    password: '',
    confirmPassword: '',
    nik: '',
    no_tlp: ''
  });

  // Reset form setiap kali halaman dirender
  useEffect(() => {
    setFormData({
      user: '',
      email: '',
      password: '',
      confirmPassword: '',
      nik: '',
      no_tlp: ''
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validasi input NIK hanya angka maksimal 16 digit
    if (name === 'nik' && (!/^[0-9]*$/.test(value) || value.length > 16)) {
      return;
    }

    // Validasi input nomor telepon hanya angka
    if (name === 'no_tlp' && !/^[0-9]*$/.test(value)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Password dan Konfirmasi Password tidak cocok.',
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }

    const dataToSend = {
      user: formData.user,
      email: formData.email,
      password: formData.password,
      role: 'Admin',
      nik: formData.nik,
      no_tlp: formData.no_tlp
    };

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/api/akun/tambahakun', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Akun admin berhasil ditambahkan.',
        timer: 2000,
        showConfirmButton: false
      });

      setFormData({
        user: '',
        email: '',
        password: '',
        confirmPassword: '',
        nik: '',
        no_tlp: ''
      });

    // Changed navigation path to admin-kategori
    navigate('/admin-admin');
    } catch (error) {
      console.error('Error menambah admin:', error);
      const errorMessage = error.response?.data?.message || 'Gagal menambah admin. Silakan coba lagi.';
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: errorMessage,
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
                  Tambah Admin Baru
                </h2>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                    <li className="breadcrumb-item"><Link to="/admin-list">Daftar Admin</Link></li>
                    <li className="breadcrumb-item active">Tambah Admin</li>
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
                        <label className="form-label">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          name="user"
                          value={formData.user}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Konfirmasi Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">NIK</label>
                        <input
                          type="text"
                          className="form-control"
                          name="nik"
                          value={formData.nik}
                          onChange={handleInputChange}
                          minLength={16}
                          maxLength={16}
                          required
                        />
                        <small className="form-text text-muted">
                          Masukkan 16 digit angka NIK Anda.
                        </small>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">No Telepon</label>
                        <input
                          type="text"
                          className="form-control"
                          name="no_tlp"
                          value={formData.no_tlp}
                          onChange={handleInputChange}
                          minLength={11}
                          maxLength={13}
                          required
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                      <Link to="/admin-admin" className="btn btn-secondary">
                        Kembali
                      </Link>
                      <button type="submit" className="btn btn-primary">
                        Tambah Admin
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

export default TambahAdmin;
