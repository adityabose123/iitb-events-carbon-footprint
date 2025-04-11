
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEmission, Venue } from "@/context/EmissionContext";

const ElectricityFactor: React.FC = () => {
  const { emissionFactors, updateElectricity } = useEmission();
  const { electricity } = emissionFactors;

  const venues: Venue[] = [
    "Convocation hall",
    "LT PCSA",
    "LH",
    "LC",
    "FC Kohli",
    "Other"
  ];

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-iitb-primary text-white">
        <CardTitle>3. Electricity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="electricityVenue">Venue (in IITB)</Label>
          <Select
            value={electricity.venue}
            onValueChange={(value) => updateElectricity({ venue: value as Venue })}
          >
            <SelectTrigger id="electricityVenue">
              <SelectValue placeholder="Select venue" />
            </SelectTrigger>
            <SelectContent>
              {venues.map((venue) => (
                <SelectItem key={venue} value={venue}>
                  {venue}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="electricityDuration">Duration of event (in hrs)</Label>
          <Input
            id="electricityDuration"
            type="number"
            min="0"
            value={electricity.durationHours || ''}
            onChange={(e) => updateElectricity({ durationHours: parseFloat(e.target.value) || 0 })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="electricityExtraCapacity">Extra EMD capacity (if any, in %)</Label>
          <Input
            id="electricityExtraCapacity"
            type="number"
            min="0"
            value={electricity.extraCapacity || ''}
            onChange={(e) => updateElectricity({ extraCapacity: parseFloat(e.target.value) || 0 })}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ElectricityFactor;
