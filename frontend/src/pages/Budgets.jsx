import { useEffect, useState } from 'react';
import api from '../api/axios';
import ProgressBar from '../components/ProgressBar';
import SetBudgetForm from '../components/SetBudgetForm';

const Budgets = () => {
  const [month, setMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/budgets/status?month=${month}`)
      .then(res => setData(res.data))
      .catch(() => setError('Failed to load budgets'));
  }, [month]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Budgets</h2>

      <label>
        Month:{' '}
        <input
          type="month"
          value={month}
          onChange={e => setMonth(e.target.value)}
        />
      </label>

      <SetBudgetForm
        month={month}
        onSuccess={() => {
          api.get(`/budgets/status?month=${month}`)
            .then(res => setData(res.data));
        }}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {data.length === 0 ? (
        <p>No budgets set for this month</p>
      ) : (
        <table border="1" cellPadding="6" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Budget</th>
              <th>Spent</th>
              <th>Remaining</th>
              <th>Usage</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.category}>
                <td>{row.category}</td>
                <td>₹{row.budget}</td>
                <td>₹{row.spent}</td>
                <td>
                  <span
                    style={{
                      color: row.remaining < 0 ? 'red' : 'green',
                      fontWeight: 'bold',
                    }}
                  >
                    ₹{row.remaining}
                  </span>

                  {row.remaining < 0 && (
                    <div style={{ color: 'red', fontSize: 12 }}>
                      ⚠ Over budget
                    </div>
                  )}
                </td>

                <td style={{ minWidth: 180 }}>
                  <ProgressBar used={row.spent} total={row.budget} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Budgets;
