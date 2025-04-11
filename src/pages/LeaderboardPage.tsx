
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEmission } from "@/context/EmissionContext";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Trophy, ArrowLeft, PlusCircle } from "lucide-react";

const LeaderboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { leaderboard, resetForm } = useEmission();

  const handleNewCalculation = () => {
    resetForm();
    navigate("/");
  };

  // Format date to readable string
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div className="space-y-6 pb-10">
      <Card className="p-6 shadow-md bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Trophy className="h-8 w-8 text-iitb-primary mr-3" />
            <h1 className="text-2xl font-bold text-iitb-primary">
              Emissions Leaderboard
            </h1>
          </div>
          <Button 
            onClick={handleNewCalculation}
            className="bg-iitb-primary hover:bg-iitb-dark"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Calculation
          </Button>
        </div>
      </Card>

      <Card className="shadow-md bg-white">
        <CardHeader>
          <CardTitle>Events Ranked by Carbon Emissions (Lowest First)</CardTitle>
        </CardHeader>
        <CardContent>
          {leaderboard.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No events have been added to the leaderboard yet.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Rank</TableHead>
                  <TableHead>Club/Department</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead className="text-right">Emissions (kg CO₂e)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((event, index) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{event.club}</TableCell>
                    <TableCell>{formatDate(event.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <span className={index === 0 ? "text-iitb-secondary font-bold" : ""}>
                        {event.totalEmission.toFixed(2)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-start">
        <Button 
          variant="outline" 
          onClick={() => navigate("/results")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Results
        </Button>
      </div>
    </div>
  );
};

export default LeaderboardPage;
