
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertCircle, TrendingUp, TrendingDown } from "lucide-react";

interface Insight {
  category: string;
  percentDiff: string;
  isHigher: boolean;
  message: string;
}

interface EmissionInsightsProps {
  insights: Insight[];
}

const EmissionInsights: React.FC<EmissionInsightsProps> = ({ insights }) => {
  if (insights.length === 0) return null;
  
  return (
    <Card className="shadow-md bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Key Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start p-4 rounded-lg border border-gray-100">
              {insight.isHigher ? (
                <TrendingUp className="h-6 w-6 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
              ) : (
                <TrendingDown className="h-6 w-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              )}
              <div>
                <h3 className="text-lg font-medium text-gray-900">{insight.category}</h3>
                <p className="text-gray-700">{insight.message}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmissionInsights;
