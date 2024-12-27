import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditJamOperasional = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jamOperasional, setJamOperasional] = useState([]);
  const [modalData, setModalData] = useState({
    id_jam: '',
    hari: '',
    jam_mulai: '',
    jam_selesai: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchJamOperasional();
    } else {
      console.error('ID tidak ditemukan');
    }
  }, [id]);

  const fetchJamOperasional = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/adminJam/jam/${id}`);
      if (response.data.success) {
        setJamOperasional(response.data.data); // Mengatur seluruh data jam operasional
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Data Tidak Ditemukan',
          text: 'Jam operasional tidak ditemukan.'
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Memuat Data',
        text: 'Terjadi kesalahan saat memuat data. Silakan coba lagi nanti.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setModalData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAddOrUpdateJamOperasional = async () => {
    try {
      const endpoint = modalData.id_jam
        ? `http://localhost:3001/api/adminJam/jam/${modalData.id_jam}`
        : 'http://localhost:3001/api/adminJam/jam';
  
      const method = modalData.id_jam ? 'put' : 'post';
  
      const dataToSend = {
        hari: modalData.hari,
        jam_mulai: modalData.jam_mulai,
        jam_selesai: modalData.jam_selesai,
        id_sarana: id // Pastikan id_sarana disertakan
      };
  
      await axios[method](endpoint, dataToSend);
  
      Swal.fire(
        'Berhasil!',
        modalData.id_jam
          ? 'Jam operasional berhasil diperbarui.'
          : 'Jam operasional berhasil ditambahkan.',
        'success'
      );
  
      resetModal();
      fetchJamOperasional();
    } catch (error) {
      console.error('Error adding or updating data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menambahkan atau Memperbarui Data',
        text: 'Terjadi kesalahan saat memproses data. Silakan coba lagi.'
      });
    }
  };
  
  
  

  const handleDeleteJamOperasional = async (id_jam) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data ini akan dihapus secara permanen.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3001/api/adminJam/jam/${id_jam}`);
          Swal.fire('Dihapus!', 'Jam operasional berhasil dihapus.', 'success');
          fetchJamOperasional();
        } catch (error) {
          console.error('Error deleting data:', error);
          Swal.fire({
            icon: 'error',
            title: 'Gagal Menghapus Data',
            text: 'Terjadi kesalahan saat menghapus data. Silakan coba lagi.'
          });
        }
      }
    });
  };

  const handleEdit = (jam) => {
    setModalData({
      id_jam: jam.id_jam,
      hari: jam.hari,
      jam_mulai: jam.jam_mulai,
      jam_selesai: jam.jam_selesai
    });
    setIsModalOpen(true);
  };

  const resetModal = () => {
    setModalData({
      hari: '',
      jam_mulai: '',
      jam_selesai: ''
    });
    setIsModalOpen(false);
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row mb-4">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h2 className="font-weight-bold text-primary" style={{ fontSize: '2rem' }}>
                  Edit Jam Operasional
                </h2>
              </div>
            </div>
          </div>
<button className="btn btn-success mb-4" onClick={() => {
  setModalData({ hari: '', jam_mulai: '', jam_selesai: '' }); // Reset data
  setIsModalOpen(true);
}}>
  Tambah Jam Operasional
</button>

          {isModalOpen && (
            <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{modalData.id_jam ? 'Edit Jam Operasional' : 'Tambah Jam Operasional'}</h5>
                    <button type="button" className="close" onClick={resetModal}>
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label>Hari</label>
                      <input
                        type="text"
                        name="hari"
                        className="form-control"
                        value={modalData.hari}
                        onChange={handleModalChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Jam Mulai</label>
                      <input
                        type="time"
                        name="jam_mulai"
                        className="form-control"
                        value={modalData.jam_mulai}
                        onChange={handleModalChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Jam Selesai</label>
                      <input
                        type="time"
                        name="jam_selesai"
                        className="form-control"
                        value={modalData.jam_selesai}
                        onChange={handleModalChange}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={resetModal}>
                      Batal
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleAddOrUpdateJamOperasional}
                    >
                      {modalData.id_jam ? 'Perbarui' : 'Simpan'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isLoading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Hari</th>
                  <th>Jam Mulai</th>
                  <th>Jam Selesai</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {jamOperasional.map((jam, index) => (
                  <tr key={jam.id_jam}>
                    <td>{index + 1}</td>
                    <td>{jam.hari}</td>
                    <td>{jam.jam_mulai}</td>
                    <td>{jam.jam_selesai}</td>
                    <td>
                      <button className="btn btn-warning" onClick={() => handleEdit(jam)}>
                        Edit
                      </button>
                      <button className="btn btn-danger ml-2" onClick={() => handleDeleteJamOperasional(jam.id_jam)}>
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditJamOperasional;
