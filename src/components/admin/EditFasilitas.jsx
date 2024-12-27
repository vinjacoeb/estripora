import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditFasilitas = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id_sarana: '',
    nama_fasilitas: '',
    qty: '',
    kondisi: 'baik',
  });
  const [saranaOptions, setSaranaOptions] = useState([]);


  // Fetch existing data and sarana options
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get fasilitas data
        const fasilitasResponse = await axios.get(`http://localhost:3001/api/fasilitas/fasilitas-edit/${id}`);
        setFormData(fasilitasResponse.data);

        // Get sarana options
        const saranaResponse = await axios.get('http://localhost:3001/api/fasilitas/sarana');
        setSaranaOptions(saranaResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: 'Gagal mengambil data. Silakan coba lagi.',
          timer: 2000,
          showConfirmButton: false,
        });
      }
    };
    fetchData();
  }, [id]);

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
      await axios.put(`http://localhost:3001/api/fasilitas/fasilitas-edit/${id}`, formData);
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Data fasilitas berhasil diperbarui!',
        timer: 2000,
        showConfirmButton: false,
      });
      navigate('/admin-fasilitas');
    } catch (error) {
      console.error('Error updating data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Gagal memperbarui data. Silakan coba lagi.',
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
              <h2 className="font-weight-bold text-primary" style={{ fontSize: '2rem' }}>
                Edit Fasilitas
              </h2>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      {/* Nama Sarana */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Nama Sarana</label>
                        <select
                          className="form-control"
                          name="id_sarana"
                          value={formData.id_sarana}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Pilih Sarana</option>
                          {saranaOptions.map((sarana) => (
                            <option key={sarana.id_sarana} value={sarana.id_sarana}>
                              {sarana.nama_sarana}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Nama Fasilitas */}
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

                      {/* Quantity */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Jumlah (Qty)</label>
                        <input
                          type="number"
                          className="form-control"
                          name="qty"
                          value={formData.qty}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      {/* Kondisi */}
                      <div className="col-md-6 mb-3">
                      <label className="form-label">Kondisi</label>
                      <select
                        className="form-control"
                        name="kondisi"
                        value={formData.kondisi} // Memastikan nilai yang dipilih sebelumnya ditampilkan
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Pilih Kondisi</option> {/* Menambahkan placeholder untuk kondisi */}
                        <option value="baik">Baik</option>
                        <option value="rusak">Rusak</option>
                      </select>

                      </div>


                    </div>

                    <div className="d-flex justify-content-end gap-2">
                      <Link to="/admin-fasilitas" className="btn btn-secondary">
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

export default EditFasilitas;
