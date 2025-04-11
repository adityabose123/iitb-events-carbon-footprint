
import React from "react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEmission } from "@/context/EmissionContext";
import { Club } from "@/context/EmissionContext";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedClub, setSelectedClub } = useEmission();

  const clubs: Club[] = [
    "GESH",
    "Avenues",
    "Symphony",
    "Energy Day",
    "Insync",
    "Roots",
    "PG Cult",
    "Pixel",
    "Shunya",
    "Other"
  ];

  const handleContinue = () => {
    if (selectedClub) {
      navigate("/emission-factors");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-lg p-8 shadow-lg bg-white">
        <h1 className="text-3xl font-bold text-center text-iitb-primary mb-8">
          Welcome to IITB Events Emissions Calculator
        </h1>
        
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Kindly Select your Club/Department</h2>
            
            <Select value={selectedClub || undefined} onValueChange={(value) => setSelectedClub(value as Club)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Club/Department" />
              </SelectTrigger>
              <SelectContent>
                {clubs.map((club) => (
                  <SelectItem key={club} value={club}>
                    {club}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={handleContinue} 
            disabled={!selectedClub} 
            className="w-full bg-iitb-primary hover:bg-iitb-dark"
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LandingPage;
