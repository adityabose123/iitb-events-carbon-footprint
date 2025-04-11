
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEmission } from "@/context/EmissionContext";

const FoodWasteFactor: React.FC = () => {
  const { emissionFactors, updateFoodWaste } = useEmission();
  const { foodWaste } = emissionFactors;

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-iitb-primary text-white">
        <CardTitle>7. Food Waste</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="kgWasted">Total Kgs of food wasted</Label>
          <Input
            id="kgWasted"
            type="number"
            min="0"
            value={foodWaste.kgWasted || ''}
            onChange={(e) => updateFoodWaste({ kgWasted: parseFloat(e.target.value) || 0 })}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodWasteFactor;
