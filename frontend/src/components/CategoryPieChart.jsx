import { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import api from '../api/axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A'];

const CategoryPieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get('/summary')
      .then(res => {
        const formatted = res.data.byCategory.map(row => ({
          name: row.category,
          value: Number(row.total),
        }));
        setData(formatted);
      })
      .catch(err => console.error(err));
  }, []);

  if (data.length === 0) return <p>No category data</p>;

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h3>Expenses by Category</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            label
          >
            {data.map((_, index) => (
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

export default CategoryPieChart;
