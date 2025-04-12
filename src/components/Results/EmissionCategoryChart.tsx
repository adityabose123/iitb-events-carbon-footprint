
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type EmissionChartData = {
  name: string;
  value: number;
};

interface EmissionCategoryChartProps {
  chartData: EmissionChartData[];
}

const EmissionCategoryChart: React.FC<EmissionCategoryChartProps> = ({ chartData }) => {
  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{
            top: 5,
            right: 30,
            left: 100, // Increased left margin to accommodate longer category names
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            type="category" 
            dataKey="name" 
            tick={{ fontSize: 12 }}
            width={90} // Fixed width for the Y-axis
          />
          <Tooltip formatter={(value: number) => `${value.toFixed(2)} kg CO₂e`} />
          <Bar dataKey="value" fill="#1e6091" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmissionCategoryChart;
