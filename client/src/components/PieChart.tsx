import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface PieChartProps {
  completed: number;
  pending: number;
  progress: number;
}

const COLORS = ["#22c55e", "#ef4444", "#0000FF"]; // Tailwind green-500 and red-500

const PieChartComponent: React.FC<PieChartProps> = ({
  completed,
  pending,
  progress,
}) => {
  const data = [
    { name: "Completed", value: completed },
    { name: "pending", value: pending },
    { name: "in progress", value: progress },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        Task Completion Chart
      </h2>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
