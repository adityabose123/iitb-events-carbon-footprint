
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEmission } from "@/context/EmissionContext";

const AccommodationFactor: React.FC = () => {
  const { emissionFactors, updateAccommodation } = useEmission();
  const { accommodation } = emissionFactors;

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-iitb-primary text-white">
        <CardTitle>8. Accommodation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="peopleCount">Number of people having accommodation</Label>
          <Input
            id="peopleCount"
            type="number"
            min="0"
            value={accommodation.peopleCount || ''}
            onChange={(e) => updateAccommodation({ peopleCount: parseFloat(e.target.value) || 0 })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="nightsPerRoom">Number of nights per room</Label>
          <Input
            id="nightsPerRoom"
            type="number"
            min="0"
            value={accommodation.nightsPerRoom || ''}
            onChange={(e) => updateAccommodation({ nightsPerRoom: parseFloat(e.target.value) || 0 })}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AccommodationFactor;
