
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEmission } from "@/context/EmissionContext";
import TransportationFactor from "@/components/EmissionFactors/TransportationFactor";
import HVACFactor from "@/components/EmissionFactors/HVACFactor";
import ElectricityFactor from "@/components/EmissionFactors/ElectricityFactor";
import MaterialsFactor from "@/components/EmissionFactors/MaterialsFactor";
import FoodFactor from "@/components/EmissionFactors/FoodFactor";
import WaterFactor from "@/components/EmissionFactors/WaterFactor";
import FoodWasteFactor from "@/components/EmissionFactors/FoodWasteFactor";
import AccommodationFactor from "@/components/EmissionFactors/AccommodationFactor";

const EmissionFactorsPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedClub } = useEmission();

  const handleContinue = () => {
    navigate("/results");
  };

  return (
    <div className="space-y-6 pb-10">
      <Card className="p-6 shadow-md bg-white">
        <h1 className="text-2xl font-bold text-iitb-primary mb-4">
          Kindly enter the emission factors for your event
        </h1>
        <p className="text-gray-600 mb-4">
          {selectedClub ? `Club/Department: ${selectedClub}` : "No club selected"}
        </p>
      </Card>

      <div className="space-y-6">
        <TransportationFactor />
        <HVACFactor />
        <ElectricityFactor />
        <MaterialsFactor />
        <FoodFactor />
        <FoodWasteFactor />
        <AccommodationFactor />
        <WaterFactor />

        <div className="flex justify-end space-x-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
          >
            Back
          </Button>
          <Button 
            onClick={handleContinue} 
            className="bg-iitb-primary hover:bg-iitb-dark"
          >
            Calculate Emissions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmissionFactorsPage;
