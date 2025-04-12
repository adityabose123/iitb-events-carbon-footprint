
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Car, TreeDeciduous } from "lucide-react";

interface EmissionImpact {
  drivingKm: number;
  treeDays: number;
  treeCount: number;
}

interface EnvironmentalImpactProps {
  emissionImpact: EmissionImpact;
}

const EnvironmentalImpact: React.FC<EnvironmentalImpactProps> = ({ emissionImpact }) => {
  return (
    <Card className="shadow-md bg-white">
      <CardHeader>
        <CardTitle>Environmental Impact Equivalents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center p-4 bg-blue-50 rounded-lg">
            <Car className="h-12 w-12 text-blue-600 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Driving Equivalent</h3>
              <p className="text-gray-700">
                These emissions are equivalent to driving a car for <span className="font-bold">{emissionImpact.drivingKm} kilometers</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center p-4 bg-green-50 rounded-lg">
            <TreeDeciduous className="h-12 w-12 text-green-600 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Carbon Absorption</h3>
              <p className="text-gray-700">
                It would take <span className="font-bold">{emissionImpact.treeCount} trees</span> about a month to absorb this much carbon
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnvironmentalImpact;
