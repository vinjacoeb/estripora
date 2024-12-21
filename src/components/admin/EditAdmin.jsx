import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    status: 2 // Default status for Admin
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
  
        const response = await axios.get(`http://localhost:3001/api/akun/akun/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        setFormData({
          name: response.data.name || '',
          email: response.data.email || '',
          password: '', // Password kosong untuk keamanan
          status: response.data.status || 2
        });
      } catch (error) {
        console.error('Error fetching data:', error.response || error.message);
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: 'Gagal mengambil data. Silakan coba lagi.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    };
  
    fetchAdminData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3001/api/akun/akun/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Data berhasil diperbarui!',
        timer: 2000,
        showConfirmButton: false
      });
      navigate('/admin-admin'); // Redirect to Admin Management page after successful edit
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
                  Edit Admin
                </h2>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/admin-admin">Admin Management</Link></li>
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
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name}
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
                    </div>

                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn btn-primary mr-2">
                        Simpan
                      </button>
                      <Link to="/admin-admin" className="btn btn-secondary">
                        Batal
                      </Link>
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
