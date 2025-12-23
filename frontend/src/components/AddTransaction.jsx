import { useState } from 'react';
import api from '../api/axios';

const AddTransaction = ({ onSuccess }) => {
  const [form, setForm] = useState({
    type: 'expense',
    amount: '',
    category: '',
    date: '',
  });

  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      await api.post('/transactions', {
        ...form,
        amount: Number(form.amount),
      });

      // Reset form
      setForm({
        type: 'expense',
        amount: '',
        category: '',
        date: '',
      });

      // Notify parent to refresh list
      onSuccess();
    } catch (err) {
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

      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />
      <br /><br />

      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <br /><br />

      <button>Add</button>
    </form>
  );
};

export default AddTransaction;
