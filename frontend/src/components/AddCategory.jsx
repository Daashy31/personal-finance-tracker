import { useState } from 'react';
import api from '../api/axios';

const AddCategory = ({ onAdded }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleAdd = async () => {
    if (!name.trim()) return;
    try {
        const res = await api.post('/categories', { name });
        setName('');
        onAdded(res.data.id); // pass the UUID
    } catch {
        setError('Failed to add category');
    }
  };

  return (
    <div style={{ marginBottom: 10 }}>
      <input
        placeholder="New category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="button" onClick={handleAdd} style={{ marginLeft: 8 }}>
        Add
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AddCategory;
