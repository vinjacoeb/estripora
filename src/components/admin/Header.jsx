import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Header = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        // Ambil token dari localStorage (atau tempat penyimpanan token lainnya)
        const token = localStorage.getItem('token');

        // Lakukan permintaan GET ke API dengan header Authorization
        const response = await axios.get('http://localhost:3001/api/adminheader/user', {
          headers: {
            Authorization: `Bearer ${token}`, // Sertakan token di header
          },
        });

        // Setel username dari respons
        setUsername(response.data.name);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, []);

  return (
    <header id="page-topbar">
      <div className="navbar-header">
        <div className="d-flex align-items-left">
          <button
            type="button"
            className="btn btn-sm mr-2 d-lg-none px-3 font-size-16 header-item waves-effect"
            id="vertical-menu-btn"
          >
            <i className="fa fa-fw fa-bars"></i>
          </button>
        </div>

        <div className="d-flex align-items-center">
          <div className="dropdown d-inline-block ml-2">
            <button
              type="button"
              className="btn header-item waves-effect"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                className="rounded-circle header-profile-user"
                src="../../../assets/images/users/avatar-2.jpg"
                alt="Header Avatar"
              />
              {/* Tambahkan kata Hallo di sini */}
              <span className="d-none d-sm-inline-block ml-1">Hallo, {username}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
