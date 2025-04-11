
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LandingPage from "./LandingPage";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // This ensures that the Index route renders the LandingPage
    // You could alternatively redirect to a specific path
    // navigate("/");
  }, []);

  return <LandingPage />;
};

export default Index;
