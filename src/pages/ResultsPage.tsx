
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEmission } from "@/context/EmissionContext";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Leaf, Award } from "lucide-react";

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { calculateTotalEmission, saveEventData, selectedClub, emissionFactors } = useEmission();

  // Calculate emissions
  const totalEmission = calculateTotalEmission();

  // Prepare data for pie chart
  const getChartData = () => {
    // Transportation emission calculation
    const transportationRoadEmissions = 
      (emissionFactors.transportation.road.threewheelerCNG || 0) * 0.107 +
      (emissionFactors.transportation.road.twoWheelerScooter || 0) * 0.142 +  // Using 4W Petrol factor as approximation
      (emissionFactors.transportation.road.fourWheelerDiesel || 0) * 0.221 +
      (emissionFactors.transportation.road.fourWheelerPetrol || 0) * 0.142 +
      (emissionFactors.transportation.road.fourWheelerCNG || 0) * 0.1 +
      (emissionFactors.transportation.road.fourWheelerEV || 0) * 0 +  // EV has 0 direct emissions
      (emissionFactors.transportation.road.twoWheelerEV || 0) * 0 +   // EV has 0 direct emissions
      (emissionFactors.transportation.road.intraCityBus || 0) * 0.015161;

    const transportationTrackEmissions = 
      (emissionFactors.transportation.track.localTrain || 0) * 0.007976 +
      (emissionFactors.transportation.track.longDistance || 0) * 0.007837 +
      (emissionFactors.transportation.track.metro || 0) * 0.007976 +  // Using local train factor as approximation
      (emissionFactors.transportation.track.airplane || 0) * 0.246;

    const transportationCarpoolingEmissions = 
      (emissionFactors.transportation.carpooling.sharedAuto || 0) * 0.107 +
      (emissionFactors.transportation.carpooling.fourWheelerPetrol || 0) * 0.142 +
      (emissionFactors.transportation.carpooling.fourWheelerCNG || 0) * 0.1;

    const transportationEmission = transportationRoadEmissions + transportationTrackEmissions + transportationCarpoolingEmissions;

    // HVAC emission
    let hvacFactor = 12; // Default
    if (emissionFactors.hvac.venue === "Convocation hall") hvacFactor = 20.4;
    else if (emissionFactors.hvac.venue === "LT PCSA") hvacFactor = 20.4;
    else if (emissionFactors.hvac.venue === "FC Kohli") hvacFactor = 10;
    else if (emissionFactors.hvac.venue === "LH") hvacFactor = 12;
    else if (emissionFactors.hvac.venue === "LC") hvacFactor = 12;

    const hvacEmission = (emissionFactors.hvac.durationHours || 0) * hvacFactor * 
      (1 + (emissionFactors.hvac.extraCapacity || 0) / 100);

    // Electricity emission
    let electricityFactor = 6; // Default
    if (emissionFactors.electricity.venue === "Convocation hall") electricityFactor = 10;
    else if (emissionFactors.electricity.venue === "LT PCSA") electricityFactor = 10;
    else if (emissionFactors.electricity.venue === "FC Kohli") electricityFactor = 15;
    else if (emissionFactors.electricity.venue === "LH") electricityFactor = 6;
    else if (emissionFactors.electricity.venue === "LC") electricityFactor = 6;

    const electricityEmission = (emissionFactors.electricity.durationHours || 0) * electricityFactor * 
      (1 + (emissionFactors.electricity.extraCapacity || 0) / 100);

    // Materials emission
    const materialsEmission = 
      // Trophies (using medium size as default)
      (emissionFactors.materials.trophies || 0) * 3.58 * 1.1 +
      // Momentoes (using polystyrene as default)
      (emissionFactors.materials.momentoes || 0) * 3.076 * 0.7 +
      // Banners
      (emissionFactors.materials.banners || 0) * 0.278 * 5.17 +
      // Bottled water
      (emissionFactors.materials.bottledWater || 0) * 0.2135 +
      // Kits
      (emissionFactors.materials.kits || 0) * 0.02 +
      // Premium kits
      (emissionFactors.materials.premiumKits || 0) * 0.58 +
      // Transportation (using generic factor)
      (emissionFactors.materials.transportation || 0) * 0.15 +
      // Printing
      (emissionFactors.materials.printing || 0) * 0.005 +
      // Merchandise (using cotton t-shirt as default)
      (emissionFactors.materials.merchandise || 0) * 2.5 * 0.18;

    // Food emission
    const foodEmission = 
      (emissionFactors.food.vegOptions || 0) * 0.4 +
      (emissionFactors.food.nonVegOptions || 0) * 0.8;

    // Water emission - minimal environmental impact compared to others
    const waterEmission = (emissionFactors.water.literUsed || 0) * 0.0001;

    // Food waste emission
    const foodWasteEmission = (emissionFactors.foodWaste.kgWasted || 0) * 0.25;

    // Accommodation emission
    const accommodationEmission = (emissionFactors.accommodation.peopleCount || 0) * 
                                 (emissionFactors.accommodation.nightsPerRoom || 0) * 20;

    return [
      { name: "Transportation", value: transportationEmission },
      { name: "HVAC", value: hvacEmission },
      { name: "Electricity", value: electricityEmission },
      { name: "Materials", value: materialsEmission },
      { name: "Food", value: foodEmission },
      { name: "Water", value: waterEmission },
      { name: "Food Waste", value: foodWasteEmission },
      { name: "Accommodation", value: accommodationEmission }
    ].filter(item => item.value > 0);
  };

  const chartData = getChartData();

  // Colors for pie chart
  const COLORS = ['#1e6091', '#4caf50', '#81c784', '#e8f5e9', '#1b5e20', '#00796b', '#4db6ac', '#b2dfdb'];

  // Save event data when viewing results
  useEffect(() => {
    if (selectedClub) {
      saveEventData();
    }
  }, []);

  return (
    <div className="space-y-6 pb-10">
      <Card className="p-6 shadow-md bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-iitb-primary mb-2">
              Emission Results
            </h1>
            <p className="text-gray-600">
              {selectedClub ? `Club/Department: ${selectedClub}` : "No club selected"}
            </p>
          </div>
          <div className="flex items-center bg-iitb-light p-4 rounded-lg">
            <Leaf className="h-8 w-8 text-iitb-primary mr-2" />
            <div>
              <p className="text-sm text-gray-500">Total Emissions</p>
              <p className="text-2xl font-bold text-iitb-primary">{totalEmission.toFixed(2)} kg CO₂e</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md bg-white">
          <CardHeader>
            <CardTitle>Emission Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value.toFixed(2)} kg CO₂e`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md bg-white">
          <CardHeader>
            <CardTitle>Emission by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => `${value.toFixed(2)} kg CO₂e`} />
                  <Bar dataKey="value" fill="#1e6091" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => navigate("/emission-factors")}
        >
          Back to Factors
        </Button>
        <Button 
          onClick={() => navigate("/leaderboard")} 
          className="bg-iitb-primary hover:bg-iitb-dark"
        >
          <Award className="mr-2 h-4 w-4" />
          View Leaderboard
        </Button>
      </div>
    </div>
  );
};

export default ResultsPage;
