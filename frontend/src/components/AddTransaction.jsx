import { useEffect, useState } from 'react';
import api from '../api/axios';
import AddCategory from './AddCategory';

const AddTransaction = ({ onSuccess }) => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    type: 'expense',
    amount: '',
    categoryId: '',
    transaction_date: '',
    note: ''
  });
  const [error, setError] = useState('');

  // Load categories
  const loadCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch {
      setError('Failed to load categories');
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    // Debug: check the form state
    console.log('Submitting transaction:', form);

    if (!form.categoryId) {
      setError('Please select a category');
      return;
    }

    try {
      await api.post('/transactions', {
        type: form.type,
        categoryId: form.categoryId, // ALWAYS UUID
        amount: Number(form.amount),
        transaction_date: form.transaction_date,
        note: form.note
      });

      // Reset form
      setForm({
        type: 'expense',
        amount: '',
        categoryId: '',
        transaction_date: '',
        note: ''
      });

      onSuccess();
    } catch {
      setError('Failed to add transaction');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3>Add Transaction</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <select name="type" value={form.type} onChange={handleChange}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <br /><br />

      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        required
      />
      <br /><br />

      {/* Add new category */}
      <AddCategory
        onAdded={(newId) => {
          loadCategories(); // reload categories
          setForm({ ...form, categoryId: newId }); // select newly added category automatically
        }}
      />

      {/* Category dropdown */}
      <select
        name="categoryId"
        value={form.categoryId}
        onChange={handleChange}
        required
      >
        <option value="">Select category</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <br /><br />

      <input
        name="transaction_date"
        type="date"
        value={form.transaction_date}
        onChange={handleChange}
        required
      />
      <br /><br />

      <input
        name="note"
        type="text"
        placeholder="Note (optional)"
        value={form.note}
        onChange={handleChange}
      />
      <br /><br />

      <button>Add</button>
    </form>
  );
};

export default AddTransaction;
