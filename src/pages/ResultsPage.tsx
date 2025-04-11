
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEmission } from "@/context/EmissionContext";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Leaf, Award } from "lucide-react";

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { calculateTotalEmission, saveEventData, selectedClub } = useEmission();

  // Calculate emissions
  const totalEmission = calculateTotalEmission();

  // Prepare data for pie chart
  const getChartData = () => {
    const transportationEmission = 
      Object.values({ 
        ...Object.values({ ...useEmission().emissionFactors.transportation.road }).reduce((a, b) => a + b * 0.2, 0),
        ...Object.values({ ...useEmission().emissionFactors.transportation.track }).reduce((a, b) => a + b * 0.1, 0),
        ...Object.values({ ...useEmission().emissionFactors.transportation.carpooling }).reduce((a, b) => a + b * 0.05, 0)
      }).reduce((a, b) => a + b, 0);

    const hvacEmission = useEmission().emissionFactors.hvac.durationHours * 
      (useEmission().emissionFactors.hvac.venue === "Convocation hall" ? 10 : 
       useEmission().emissionFactors.hvac.venue === "FC Kohli" ? 8 : 5) * 
      (1 + useEmission().emissionFactors.hvac.extraCapacity / 100);

    const electricityEmission = useEmission().emissionFactors.electricity.durationHours * 
      (useEmission().emissionFactors.electricity.venue === "Convocation hall" ? 15 : 
       useEmission().emissionFactors.electricity.venue === "FC Kohli" ? 12 : 7) * 
      (1 + useEmission().emissionFactors.electricity.extraCapacity / 100);

    const materialsEmission = 
      useEmission().emissionFactors.materials.trophies * 5 +
      useEmission().emissionFactors.materials.momentoes * 3 +
      useEmission().emissionFactors.materials.banners * 7 +
      useEmission().emissionFactors.materials.bottledWater * 0.5 +
      useEmission().emissionFactors.materials.kits * 2 +
      useEmission().emissionFactors.materials.premiumKits * 4 +
      useEmission().emissionFactors.materials.transportation * 1 +
      useEmission().emissionFactors.materials.printing * 0.1 +
      useEmission().emissionFactors.materials.merchandise * 3;

    const foodEmission = 
      useEmission().emissionFactors.food.vegOptions * 1.5 +
      useEmission().emissionFactors.food.nonVegOptions * 3.5;

    const waterEmission = useEmission().emissionFactors.water.literUsed * 0.001;

    const foodWasteEmission = useEmission().emissionFactors.foodWaste.kgWasted * 2.5;

    const accommodationEmission = useEmission().emissionFactors.accommodation.peopleCount * 
                                 useEmission().emissionFactors.accommodation.nightsPerRoom * 5;

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
                  <Tooltip formatter={(value) => `${value.toFixed(2)} kg CO₂e`} />
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
                  <Tooltip formatter={(value) => `${value.toFixed(2)} kg CO₂e`} />
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
