
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEmission } from "@/context/EmissionContext";

const WaterFactor: React.FC = () => {
  const { emissionFactors, updateWater } = useEmission();
  const { water } = emissionFactors;

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-iitb-primary text-white">
        <CardTitle>Water</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="literUsed">Liters of water used</Label>
          <Input
            id="literUsed"
            type="number"
            min="0"
            value={water.literUsed || ''}
            onChange={(e) => updateWater({ literUsed: parseFloat(e.target.value) || 0 })}
          />
          <p className="text-xs text-gray-500">
            Water usage is tracked for environmental monitoring but not included in the total emissions calculation
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterFactor;
