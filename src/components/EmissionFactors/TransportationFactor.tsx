
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEmission } from "@/context/EmissionContext";

const TransportationFactor: React.FC = () => {
  const { emissionFactors, updateTransportation } = useEmission();
  const { transportation } = emissionFactors;

  const handleRoadChange = (key: string, value: string) => {
    updateTransportation({
      road: {
        ...transportation.road,
        [key]: parseFloat(value) || 0
      }
    });
  };

  const handleTrackChange = (key: string, value: string) => {
    updateTransportation({
      track: {
        ...transportation.track,
        [key]: parseFloat(value) || 0
      }
    });
  };

  const handleCarpoolingChange = (key: string, value: string) => {
    updateTransportation({
      carpooling: {
        ...transportation.carpooling,
        [key]: parseFloat(value) || 0
      }
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-iitb-primary text-white">
        <CardTitle>1. Transportation</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="road">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="road">Road</TabsTrigger>
            <TabsTrigger value="track">Track</TabsTrigger>
            <TabsTrigger value="carpooling">Carpooling</TabsTrigger>
          </TabsList>
          
          <TabsContent value="road" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="threewheelerCNG">3-Wheeler CNG (km)</Label>
                <Input
                  id="threewheelerCNG"
                  type="number"
                  min="0"
                  value={transportation.road.threewheelerCNG || ''}
                  onChange={(e) => handleRoadChange('threewheelerCNG', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="twoWheelerScooter">2-Wheeler Scooter &lt;110 CC (km)</Label>
                <Input
                  id="twoWheelerScooter"
                  type="number"
                  min="0"
                  value={transportation.road.twoWheelerScooter || ''}
                  onChange={(e) => handleRoadChange('twoWheelerScooter', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fourWheelerDiesel">4W Diesel (km)</Label>
                <Input
                  id="fourWheelerDiesel"
                  type="number"
                  min="0"
                  value={transportation.road.fourWheelerDiesel || ''}
                  onChange={(e) => handleRoadChange('fourWheelerDiesel', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fourWheelerPetrol">4W Petrol (km)</Label>
                <Input
                  id="fourWheelerPetrol"
                  type="number"
                  min="0"
                  value={transportation.road.fourWheelerPetrol || ''}
                  onChange={(e) => handleRoadChange('fourWheelerPetrol', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fourWheelerCNG">4W CNG (km)</Label>
                <Input
                  id="fourWheelerCNG"
                  type="number"
                  min="0"
                  value={transportation.road.fourWheelerCNG || ''}
                  onChange={(e) => handleRoadChange('fourWheelerCNG', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fourWheelerEV">4W EV (km)</Label>
                <Input
                  id="fourWheelerEV"
                  type="number"
                  min="0"
                  value={transportation.road.fourWheelerEV || ''}
                  onChange={(e) => handleRoadChange('fourWheelerEV', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="twoWheelerEV">2-Wheeler EV (km)</Label>
                <Input
                  id="twoWheelerEV"
                  type="number"
                  min="0"
                  value={transportation.road.twoWheelerEV || ''}
                  onChange={(e) => handleRoadChange('twoWheelerEV', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="intraCityBus">Intra-city Bus (km)</Label>
                <Input
                  id="intraCityBus"
                  type="number"
                  min="0"
                  value={transportation.road.intraCityBus || ''}
                  onChange={(e) => handleRoadChange('intraCityBus', e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="track" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="localTrain">Local Train (km)</Label>
                <Input
                  id="localTrain"
                  type="number"
                  min="0"
                  value={transportation.track.localTrain || ''}
                  onChange={(e) => handleTrackChange('localTrain', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="longDistance">Long Distance (km)</Label>
                <Input
                  id="longDistance"
                  type="number"
                  min="0"
                  value={transportation.track.longDistance || ''}
                  onChange={(e) => handleTrackChange('longDistance', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="metro">Metro (km)</Label>
                <Input
                  id="metro"
                  type="number"
                  min="0"
                  value={transportation.track.metro || ''}
                  onChange={(e) => handleTrackChange('metro', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="airplane">Airplane (km)</Label>
                <Input
                  id="airplane"
                  type="number"
                  min="0"
                  value={transportation.track.airplane || ''}
                  onChange={(e) => handleTrackChange('airplane', e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="carpooling" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sharedAuto">Shared Auto (km)</Label>
                <Input
                  id="sharedAuto"
                  type="number"
                  min="0"
                  value={transportation.carpooling.sharedAuto || ''}
                  onChange={(e) => handleCarpoolingChange('sharedAuto', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="carpoolFourWheelerPetrol">4W Petrol (km)</Label>
                <Input
                  id="carpoolFourWheelerPetrol"
                  type="number"
                  min="0"
                  value={transportation.carpooling.fourWheelerPetrol || ''}
                  onChange={(e) => handleCarpoolingChange('fourWheelerPetrol', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="carpoolFourWheelerCNG">4W CNG (km)</Label>
                <Input
                  id="carpoolFourWheelerCNG"
                  type="number"
                  min="0"
                  value={transportation.carpooling.fourWheelerCNG || ''}
                  onChange={(e) => handleCarpoolingChange('fourWheelerCNG', e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TransportationFactor;
