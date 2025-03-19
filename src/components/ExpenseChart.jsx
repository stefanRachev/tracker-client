import { useState, useEffect } from "react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const ExpenseChart = ({ data }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const aspectRatio =
    windowWidth <= 740 ? 0.8 : windowWidth <= 1024 ? 1.2 : 1.5;

  const chartData = data?.length
    ? data.reduce((acc, item) => {
        const existingCategory = acc.find(
          (entry) => entry.name === item.category
        );
        if (existingCategory) {
          existingCategory.value += item.amount;
        } else {
          acc.push({ name: item.category, value: item.amount });
        }
        return acc;
      }, [])
    : [];

  const COLORS = ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"];
  const totalAmount = chartData.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <ResponsiveContainer width="100%" height="100%" aspect={aspectRatio}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          fill="#8884d8"
          labelLine={false}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          layout="horizontal" 
          align="center" 
          verticalAlign="bottom" 
          formatter={(value, entry, index) => {
            const percentage = (
              (chartData[index].value / totalAmount) *
              100
            ).toFixed(2);
            return `${value}: ${percentage}%`; 
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpenseChart;
