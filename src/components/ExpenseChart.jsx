import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const ExpenseChart = ({ data }) => {
  const chartData = data.map(item => ({
    name: item.category,
    value: item.amount,
  }));

  const COLORS = ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0'];

  return (
    <ResponsiveContainer width="100%" height={800}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          outerRadius={150}
          fill="#8884d8"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          labelStyle={{ fontSize: '14px', fontWeight: 'bold' }}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpenseChart;
