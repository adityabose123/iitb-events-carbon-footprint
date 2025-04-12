
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend
} from "@/components/ui/chart";

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
      <ChartContainer config={{
        "Your Event": { color: "#1e6091" },
        "Average": { color: "#43a047" }
      }}>
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
          <XAxis dataKey="category" />
          <YAxis label={{ value: 'Emissions (kg CO₂e)', angle: -90, position: 'insideLeft' }} />
          <ChartTooltip>
            <ChartTooltipContent />
          </ChartTooltip>
          <ChartLegend />
          <Bar dataKey="Your Event" fill="var(--color-Your Event)" />
          <Bar dataKey="Average" fill="var(--color-Average)" />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default EmissionComparisonChart;
