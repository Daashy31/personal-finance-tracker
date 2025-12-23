import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#4CAF50', '#66BB6A', '#81C784', '#A5D6A7'];

const IncomePieChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No income data</p>;
  }

  const formatted = data.map(row => ({
    name: row.category,
    value: Number(row.total),
  }));

  return (
    <div style={{ width: 400, height: 300 }}>
      <h4>Income by Category</h4>
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

export default IncomePieChart;
