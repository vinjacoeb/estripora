import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function SaranaEdit() {
  const { id } = useParams();
  const [form, setForm] = useState({
    kecamatan: '',
    nama: '',
    sarana: '',
    gambar: '',
    harga: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/backend/${id}`)
      .then((response) => {
        setForm(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/backend/${id}`, form)
      .then(() => {
        navigate('/'); // Navigasi ke halaman utama atau daftar sarana setelah update
      })
      .catch((error) => console.log(error));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Edit Sarana</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Kecamatan: </label>
          <input type="text" name="kecamatan" value={form.kecamatan} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Nama: </label>
          <input type="text" name="nama" value={form.nama} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Sarana: </label>
          <input type="text" name="sarana" value={form.sarana} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Gambar: </label>
          <input type="text" name="gambar" value={form.gambar} onChange={handleChange} />
          {/* Anda bisa menggunakan <input type="file" /> jika ingin mengunggah file baru */}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Harga: </label>
          <input type="number" name="harga" value={form.harga} onChange={handleChange} required />
        </div>
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}

export default SaranaEdit;
