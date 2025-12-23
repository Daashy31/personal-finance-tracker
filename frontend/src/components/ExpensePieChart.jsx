import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#FF6384', '#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB'];

const ExpensePieChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No expense data</p>;
  }

  const formatted = data.map(row => ({
    name: row.category,
    value: Number(row.total),
  }));

  return (
    <div style={{ width: 400, height: 300 }}>
      <h4>Expenses by Category</h4>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={formatted}
            dataKey="value"
            nameKey="name"
            label
          >
            {formatted.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensePieChart;
