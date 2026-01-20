import { useEffect, useState } from 'react';
import api from '../api/axios';
import AddCategory from './AddCategory';

const SetBudgetForm = ({ month, onSuccess }) => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  // ✅ Reusable loader
  const loadCategories = () => {
    api.get('/categories')
      .then(res => setCategories(res.data))
      .catch(() => setError('Failed to load categories'));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      await api.post('/budgets', {
        categoryId,
        amount: Number(amount),
        month,
      });

      setAmount('');
      setCategoryId('');
      onSuccess();
    } catch {
      setError('Failed to save budget');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3>Set Budget</h3>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* ✅ ADD CATEGORY INPUT */}
      <AddCategory onAdded={loadCategories} />

      {/* ✅ CATEGORY DROPDOWN */}
      <select
        value={categoryId}
        onChange={e => setCategoryId(e.target.value)}
        required
      >
        <option value="">Select category</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
        style={{ marginLeft: 10 }}
      />

      <button style={{ marginLeft: 10 }}>
        Save
      </button>
    </form>
  );
};

export default SetBudgetForm;
