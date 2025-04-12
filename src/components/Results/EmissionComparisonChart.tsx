
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface ComparisonData {
  category: string;
  "Your Event": number;
  "Average": number;
}

interface EmissionComparisonChartProps {
  comparisonData: ComparisonData[];
}

const EmissionComparisonChart: React.FC<EmissionComparisonChartProps> = ({ comparisonData }) => {
  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={comparisonData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="category" 
            tick={{ fontSize: 12, angle: -45, textAnchor: 'end' }}
            height={60} // Increase the height to accommodate angled labels
          />
          <YAxis 
            label={{ 
              value: 'Emissions (kg CO₂e)', 
              angle: -90, 
              position: 'insideLeft', 
              style: { textAnchor: 'middle' } 
            }} 
          />
          <Tooltip formatter={(value: number) => `${value.toFixed(2)} kg CO₂e`} />
          <Legend 
            verticalAlign="top" 
            height={36} 
            wrapperStyle={{ paddingBottom: 10 }}
          />
          <Bar dataKey="Your Event" fill="#1e6091" />
          <Bar dataKey="Average" fill="#43a047" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmissionComparisonChart;
