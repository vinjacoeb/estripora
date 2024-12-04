import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditJamOperasional = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jamOperasional, setJamOperasional] = useState({
    sarana: '',
    hari1: '',
    jam1: '',
    jam11: '',
    hari2: '',
    jam2: '',
    jam22: '',
    hari3: '',
    jam3: '',
    jam33: '',
    hari4: '',
    jam4: '',
    jam44: '',
    hari5: '',
    jam5: '',
    jam55: '',
    hari6: '',
    jam6: '',
    jam66: '',
    hari7: '',
    jam7: '',
    jam77: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchJamOperasional();
  }, []);

  const fetchJamOperasional = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/adminJam/jam/${id}`);
      setJamOperasional(response.data.data || {});
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Memuat Data',
        text: 'Terjadi kesalahan saat memuat data. Silakan coba lagi nanti.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJamOperasional({
      ...jamOperasional,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Log the data to verify it
    console.log('Submitting data:', jamOperasional);
  
    try {
      await axios.put(`http://localhost:3001/api/adminJam/jam/${id}`, jamOperasional);
      Swal.fire('Berhasil!', 'Data telah diperbarui.', 'success');
      navigate('/admin-jamOperasional');
    } catch (error) {
      console.error('Error updating data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Memperbarui Data',
        text: 'Terjadi kesalahan saat memperbarui data. Silakan coba lagi.',
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
                  Edit Jam Operasional
                </h2>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a href="/admin-jamOperasional">Jam Operasional</a></li>
                    <li className="breadcrumb-item active">Edit Jam Operasional</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Form Edit */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  {isLoading ? (
                    <div className="text-center">
                      <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      {/* Nama Sarana ditampilkan, tidak perlu input */}
                      <div className="form-group">
                        <label>{jamOperasional.sarana}</label>
                      </div>

                      {/* Form untuk mengedit jam operasional setiap hari */}
                      {['hari1', 'hari2', 'hari3', 'hari4', 'hari5', 'hari6', 'hari7'].map((day, index) => (
                        <div className="form-group" key={index}>
                            <label>{jamOperasional[day]}</label>
                            <div className="d-flex">
                            {/* Jam Mulai */}
                            <input
                                type="time"
                                name={`jam${index + 1}`}
                                value={jamOperasional[`jam${index + 1}`] || ""}
                                onChange={handleChange}
                                className="form-control mr-2"
                                placeholder="Jam Mulai"
                                required
                            />
                            <span> - </span>
                            {/* Jam Selesai */}
                            <input
                                type="time"
                                name={`jam${index + 1}${index + 1}`} // Jam selesai menggunakan pola jam{index+1}{index+1}
                                value={jamOperasional[`jam${index + 1}${index + 1}`] || ""} // Akses nilai dengan pola yang sama
                                onChange={handleChange}
                                className="form-control ml-2"
                                placeholder="Jam Selesai"
                                required
                            />
                            </div>
                        </div>
                        ))}


                      <div className="form-group text-center">
                        <button type="submit" className="btn btn-primary">Simpan</button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditJamOperasional;
