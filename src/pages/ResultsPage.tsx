
import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEmission } from "@/context/EmissionContext";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Leaf, Award, Car, TreeDeciduous, AlertCircle, TrendingUp, TrendingDown } from "lucide-react";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend
} from "@/components/ui/chart";

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
      // Printing
      (emissionFactors.materials.printing || 0) * 0.005 +
      // Merchandise (using cotton t-shirt as default)
      (emissionFactors.materials.merchandise || 0) * 2.5 * 0.18;

    // Food emission
    const foodEmission = 
      (emissionFactors.food.vegOptions || 0) * 0.4 +
      (emissionFactors.food.nonVegOptions || 0) * 0.8;

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
      { name: "Food Waste", value: foodWasteEmission },
      { name: "Accommodation", value: accommodationEmission }
    ].filter(item => item.value > 0);
  };

  const chartData = getChartData();

  // Mock average data for comparison
  // In a real application, this would come from an API
  const getAverageEmissions = () => {
    return {
      Transportation: 250,
      HVAC: 180,
      Electricity: 120,
      Materials: 90,
      Food: 150,
      "Food Waste": 30,
      Accommodation: 100
    };
  };

  const averageEmissions = getAverageEmissions();

  // Prepare comparison data
  const getComparisonData = () => {
    return chartData.map(item => ({
      category: item.name,
      "Your Event": item.value,
      "Average": averageEmissions[item.name as keyof typeof averageEmissions] || 0
    }));
  };

  const comparisonData = getComparisonData();

  // Generate insights based on comparison
  const getInsights = () => {
    const insights = [];
    
    chartData.forEach(item => {
      const avgValue = averageEmissions[item.name as keyof typeof averageEmissions] || 0;
      if (avgValue > 0) {
        const percentDiff = ((item.value - avgValue) / avgValue) * 100;
        
        if (Math.abs(percentDiff) >= 15) {
          const isHigher = percentDiff > 0;
          insights.push({
            category: item.name,
            percentDiff: Math.abs(percentDiff).toFixed(0),
            isHigher,
            message: `Your event is producing ${Math.abs(percentDiff).toFixed(0)}% ${isHigher ? 'more' : 'less'} emissions in ${item.name.toLowerCase()} compared to the average IIT Bombay event.`
          });
        }
      }
    });
    
    // Sort insights by percentage difference (highest first)
    return insights.sort((a, b) => parseFloat(b.percentDiff) - parseFloat(a.percentDiff));
  };

  const insights = useMemo(() => getInsights(), [chartData]);

  // Calculate equivalent emissions impact
  const calculateEmissionImpact = () => {
    // Driving impact: Average car emits ~0.2 kg CO2 per km
    const drivingKm = Math.round(totalEmission / 0.2);
    
    // Tree absorption impact: Average tree absorbs ~20kg CO2 per year (~0.055 kg per day)
    const treeDays = Math.round(totalEmission / 0.055);
    const treeCount = Math.ceil(treeDays / 30); // How many trees needed for a month

    return {
      drivingKm,
      treeDays,
      treeCount
    };
  };

  const emissionImpact = calculateEmissionImpact();

  // Colors for pie chart - using a more distinguishable color palette
  const COLORS = ['#1e88e5', '#43a047', '#ffb300', '#e53935', '#5e35b1', '#00acc1', '#f4511e', '#6d4c41'];

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
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => 
                      percent > 0.05 ? `${name}: ${(percent * 100).toFixed(0)}%` : ""
                    }
                    labelPosition={15}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value.toFixed(2)} kg CO₂e`} />
                  <Legend layout="vertical" verticalAlign="middle" align="right" />
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
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{
                    top: 5,
                    right: 30,
                    left: 80,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip formatter={(value: number) => `${value.toFixed(2)} kg CO₂e`} />
                  <Bar dataKey="value" fill="#1e6091" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md bg-white">
        <CardHeader>
          <CardTitle>Environmental Impact Equivalents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
              <Car className="h-12 w-12 text-blue-600 mr-4" />
              <div>
                <h3 className="text-xl font-semibold">Driving Equivalent</h3>
                <p className="text-gray-700">
                  These emissions are equivalent to driving a car for <span className="font-bold">{emissionImpact.drivingKm} kilometers</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <TreeDeciduous className="h-12 w-12 text-green-600 mr-4" />
              <div>
                <h3 className="text-xl font-semibold">Carbon Absorption</h3>
                <p className="text-gray-700">
                  It would take <span className="font-bold">{emissionImpact.treeCount} trees</span> about a month to absorb this much carbon
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New Comparison Chart Section */}
      <Card className="shadow-md bg-white">
        <CardHeader>
          <CardTitle>Comparison with Average IIT Bombay Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ChartContainer config={{
              "Your Event": { color: "#1e6091" },
              "Average": { color: "#43a047" }
            }}>
              <BarChart
                data={comparisonData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis label={{ value: 'Emissions (kg CO₂e)', angle: -90, position: 'insideLeft' }} />
                <ChartTooltip>
                  <ChartTooltipContent />
                </ChartTooltip>
                <ChartLegend />
                <Bar dataKey="Your Event" fill="var(--color-Your Event)" />
                <Bar dataKey="Average" fill="var(--color-Average)" />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* New Insights Section */}
      {insights.length > 0 && (
        <Card className="shadow-md bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Key Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className="flex items-start p-4 rounded-lg border border-gray-100">
                  {insight.isHigher ? (
                    <TrendingUp className="h-6 w-6 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  ) : (
                    <TrendingDown className="h-6 w-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  )}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{insight.category}</h3>
                    <p className="text-gray-700">{insight.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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
