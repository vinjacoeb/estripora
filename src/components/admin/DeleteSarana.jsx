import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function DeleteSarana() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.delete(`http://localhost:3001/backend/${id}`)
      .then(() => {
        navigate('/');
      })
      .catch((error) => console.log(error));
  }, [id, navigate]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Deleting Sarana...</h2>
    </div>
  );
}

export default DeleteSarana;
