
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

type EmissionChartData = {
  name: string;
  value: number;
};

interface EmissionDistributionChartProps {
  chartData: EmissionChartData[];
}

const EmissionDistributionChart: React.FC<EmissionDistributionChartProps> = ({ chartData }) => {
  // Colors for pie chart - using a more distinguishable color palette
  const COLORS = ['#1e88e5', '#43a047', '#ffb300', '#e53935', '#5e35b1', '#00acc1', '#f4511e', '#6d4c41'];
  
  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={true}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => 
              percent > 0.05 ? `${name}: ${(percent * 100).toFixed(0)}%` : ""
            }
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value.toFixed(2)} kg CO₂e`} />
          <Legend layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmissionDistributionChart;
