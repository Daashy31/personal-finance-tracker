import { useEffect, useState } from 'react';
import api from '../api/axios';
import AddTransaction from '../components/AddTransaction';
import MonthlyTrendsChart from '../components/MonthlyTrendsChart';
import CategoryPieChart from '../components/CategoryPieChart';
import ExpensePieChart from '../components/ExpensePieChart';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [trendsData, setTrendsData] = useState([]); // ✅ Add state for trends

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const refreshSummary = () => {
    api.get('/summary')
      .then(res => setSummary(res.data))
      .catch(() => logout());
  };

  const refreshTransactions = () => {
    api.get('/transactions')
      .then(res => setTransactions(res.data))
      .catch(() => logout());

    refreshSummary();
    refreshTrends(); // ✅ Also refresh trends when transactions change
  };

  // ✅ New function to fetch trends
  const refreshTrends = () => {
    api.get('/trends')
      .then(res => {
        const formatted = res.data.map(row => ({
          month: row.month.slice(0, 7), // YYYY-MM
          income: Number(row.income),
          expense: Number(row.expense),
        }));
        setTrendsData(formatted);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    refreshSummary();
    refreshTransactions();
    refreshTrends();
  }, []);

  if (!summary) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>

      <h3>Summary</h3>
      <p>Total Income: ₹{summary.totalIncome}</p>
      <p>Total Expense: ₹{summary.totalExpense}</p>
      <p>Balance: ₹{summary.balance}</p>

      <hr />

      <h3>Category Breakdown</h3>
      <div style={{ width: 400, height: 370, marginTop: 20 }}>
        <ExpensePieChart data={summary.expenseByCategory} />
      </div>

      <hr />

      {/* ✅ Pass trends data as prop */}
      <MonthlyTrendsChart data={trendsData} />

      <hr />

      <CategoryPieChart />

      <hr />

      {/* ✅ AddTransaction triggers refreshTransactions on success */}
      <AddTransaction onSuccess={refreshTransactions} />

      <hr />

      <h3>Transactions</h3>
      {transactions.length === 0 ? (
        <p>No transactions found</p>
      ) : (
        <table border="1" cellPadding="6">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id}>
                <td>{tx.date}</td>
                <td>{tx.type}</td>
                <td>{tx.category}</td>
                <td>₹{tx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
