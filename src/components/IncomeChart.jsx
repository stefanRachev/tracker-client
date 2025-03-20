// import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// const IncomeChart = ({ data }) => {
//   if (!data?.incomes?.length) return <p>No income data available</p>;

//   const chartData = data.incomes.reduce((acc, item) => {
//     const existingType = acc.find((entry) => entry.name === item.type);
//     if (existingType) {
//       existingType.value += item.amount;
//     } else {
//       acc.push({ name: item.type, value: item.amount });
//     }
//     return acc;
//   }, []);

//   const COLORS = ["#4caf50", "#2196f3", "#ff9800", "#9c27b0", "#ff5722", "#00bcd4"];
//   const totalAmount = chartData.reduce((sum, entry) => sum + entry.value, 0);

//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <PieChart>
//         <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100}>
//           {chartData.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend
//           layout="horizontal"
//           align="center"
//           verticalAlign="bottom"
//           formatter={(value, entry, index) => {
//             const percentage = ((chartData[index].value / totalAmount) * 100).toFixed(2);
//             return `${value}: ${percentage}%`;
//           }}
//         />
//       </PieChart>
//     </ResponsiveContainer>
//   );
// };

// export default IncomeChart;

import { useState, useEffect } from "react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const IncomeChart = ({ data }) => {
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
        const existingType = acc.find(
          (entry) => entry.name === item.type
        );
        if (existingType) {
          existingType.value += item.amount;
        } else {
          acc.push({ name: item.type, value: item.amount });
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

export default IncomeChart;

