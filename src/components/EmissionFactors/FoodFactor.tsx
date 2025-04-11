
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEmission } from "@/context/EmissionContext";

const FoodFactor: React.FC = () => {
  const { emissionFactors, updateFood } = useEmission();
  const { food } = emissionFactors;

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-iitb-primary text-white">
        <CardTitle>5. Food</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="vegOptions">Number of veg options selected</Label>
          <Input
            id="vegOptions"
            type="number"
            min="0"
            value={food.vegOptions || ''}
            onChange={(e) => updateFood({ vegOptions: parseFloat(e.target.value) || 0 })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="nonVegOptions">Number of non-veg options selected</Label>
          <Input
            id="nonVegOptions"
            type="number"
            min="0"
            value={food.nonVegOptions || ''}
            onChange={(e) => updateFood({ nonVegOptions: parseFloat(e.target.value) || 0 })}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodFactor;
