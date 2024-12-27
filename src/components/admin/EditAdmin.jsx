import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user: '',
    email: '',
    password: '',
    confirmPassword: '',
    nik: '',
    no_tlp: '',
    role: 'Admin'
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          Swal.fire({
            icon: 'error',
            title: 'Gagal!',
            text: 'Anda belum login. Silakan login terlebih dahulu.',
            timer: 2000,
            showConfirmButton: false
          });
          navigate('/login');
          return;
        }

        // Fixed API endpoint
        const response = await axios.get(`http://localhost:3001/api/akun/akun/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data) {
          setFormData(prev => ({
            ...prev,
            user: response.data.user || '',
            email: response.data.email || '',
            nik: response.data.nik || '',
            no_tlp: response.data.no_tlp || '',
            role: response.data.role || 'Admin',
            password: '',
            confirmPassword: ''
          }));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        const errorMessage = error.response?.data?.message || 'Gagal mengambil data. Silakan coba lagi.';
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: errorMessage,
          timer: 2000,
          showConfirmButton: false
        });
        navigate('/admin-admin');
      }
    };

    fetchAdminData();
  }, [id, navigate]);

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

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
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
      password: formData.password || undefined, // Tidak kirim password jika kosong
      role: formData.role,
      nik: formData.nik,
      no_tlp: formData.no_tlp
    };

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3001/api/akun/akun/${id}`, dataToSend, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Data admin berhasil diperbarui.',
        timer: 2000,
        showConfirmButton: false
      });

      navigate('/admin-admin');
    } catch (error) {
      console.error('Error updating data:', error);
      const errorMessage = error.response?.data?.message || 'Gagal memperbarui data. Silakan coba lagi.';
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
                  Edit Admin
                </h2>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                    <li className="breadcrumb-item"><Link to="/admin-admin">Daftar Admin</Link></li>
                    <li className="breadcrumb-item active">Edit Admin</li>
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
                        <label className="form-label">Password (Kosongkan jika tidak ingin diubah)</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
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
                          maxLength={16}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">No Telepon</label>
                        <input
                          type="text"
                          className="form-control"
                          name="no_tlp"
                          value={formData.no_tlp}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                      <Link to="/admin-admin" className="btn btn-secondary">
                        Batal
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

export default EditAdmin;
