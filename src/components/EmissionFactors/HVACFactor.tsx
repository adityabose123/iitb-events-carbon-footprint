
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEmission, Venue } from "@/context/EmissionContext";

const HVACFactor: React.FC = () => {
  const { emissionFactors, updateHVAC } = useEmission();
  const { hvac } = emissionFactors;

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
        <CardTitle>2. HVAC (Heating, Ventilation, and Air Conditioning)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="hvacVenue">Venue (in IITB)</Label>
          <Select
            value={hvac.venue}
            onValueChange={(value) => updateHVAC({ venue: value as Venue })}
          >
            <SelectTrigger id="hvacVenue">
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
          <Label htmlFor="hvacDuration">Duration of event (in hrs)</Label>
          <Input
            id="hvacDuration"
            type="number"
            min="0"
            value={hvac.durationHours || ''}
            onChange={(e) => updateHVAC({ durationHours: parseFloat(e.target.value) || 0 })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="hvacExtraCapacity">Extra EMD capacity (if any, in %)</Label>
          <Input
            id="hvacExtraCapacity"
            type="number"
            min="0"
            value={hvac.extraCapacity || ''}
            onChange={(e) => updateHVAC({ extraCapacity: parseFloat(e.target.value) || 0 })}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default HVACFactor;
