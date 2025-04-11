
import React, { createContext, useContext, useState, useEffect } from "react";

// Define types for our emission data
export type Club = 
  | "GESH" 
  | "Avenues" 
  | "Symphony" 
  | "Energy Day" 
  | "Insync" 
  | "Roots" 
  | "PG Cult" 
  | "Pixel" 
  | "Shunya" 
  | "Other";

export type Venue = 
  | "Convocation hall" 
  | "LT PCSA" 
  | "LH" 
  | "LC" 
  | "FC Kohli" 
  | "Other";

export type TransportationData = {
  road: {
    threewheelerCNG: number;
    twoWheelerScooter: number;
    fourWheelerDiesel: number;
    fourWheelerPetrol: number;
    fourWheelerCNG: number;
    fourWheelerEV: number;
    twoWheelerEV: number;
    intraCityBus: number;
  };
  track: {
    localTrain: number;
    longDistance: number;
    metro: number;
    airplane: number;
  };
  carpooling: {
    sharedAuto: number;
    fourWheelerPetrol: number;
    fourWheelerCNG: number;
  };
};

export type HVACData = {
  venue: Venue;
  durationHours: number;
  extraCapacity: number;
};

export type ElectricityData = {
  venue: Venue;
  durationHours: number;
  extraCapacity: number;
};

export type MaterialsData = {
  trophies: number;
  momentoes: number;
  banners: number;
  bottledWater: number;
  kits: number;
  premiumKits: number;
  transportation: number;
  printing: number;
  merchandise: number;
};

export type FoodData = {
  vegOptions: number;
  nonVegOptions: number;
};

export type WaterData = {
  literUsed: number;
};

export type FoodWasteData = {
  kgWasted: number;
};

export type AccommodationData = {
  peopleCount: number;
  nightsPerRoom: number;
};

export type EmissionFactors = {
  transportation: TransportationData;
  hvac: HVACData;
  electricity: ElectricityData;
  materials: MaterialsData;
  food: FoodData;
  water: WaterData;
  foodWaste: FoodWasteData;
  accommodation: AccommodationData;
};

export type EventEmission = {
  id: string;
  club: Club;
  totalEmission: number;
  factors: EmissionFactors;
  createdAt: Date;
};

// Default initial values
const defaultTransportation: TransportationData = {
  road: {
    threewheelerCNG: 0,
    twoWheelerScooter: 0,
    fourWheelerDiesel: 0,
    fourWheelerPetrol: 0,
    fourWheelerCNG: 0,
    fourWheelerEV: 0,
    twoWheelerEV: 0,
    intraCityBus: 0,
  },
  track: {
    localTrain: 0,
    longDistance: 0,
    metro: 0,
    airplane: 0,
  },
  carpooling: {
    sharedAuto: 0,
    fourWheelerPetrol: 0,
    fourWheelerCNG: 0,
  },
};

const defaultHVAC: HVACData = {
  venue: "Convocation hall",
  durationHours: 0,
  extraCapacity: 0,
};

const defaultElectricity: ElectricityData = {
  venue: "Convocation hall",
  durationHours: 0,
  extraCapacity: 0,
};

const defaultMaterials: MaterialsData = {
  trophies: 0,
  momentoes: 0,
  banners: 0,
  bottledWater: 0,
  kits: 0,
  premiumKits: 0,
  transportation: 0,
  printing: 0,
  merchandise: 0,
};

const defaultFood: FoodData = {
  vegOptions: 0,
  nonVegOptions: 0,
};

const defaultWater: WaterData = {
  literUsed: 0,
};

const defaultFoodWaste: FoodWasteData = {
  kgWasted: 0,
};

const defaultAccommodation: AccommodationData = {
  peopleCount: 0,
  nightsPerRoom: 0,
};

const defaultEmissionFactors: EmissionFactors = {
  transportation: defaultTransportation,
  hvac: defaultHVAC,
  electricity: defaultElectricity,
  materials: defaultMaterials,
  food: defaultFood,
  water: defaultWater,
  foodWaste: defaultFoodWaste,
  accommodation: defaultAccommodation,
};

// Create context type
type EmissionContextType = {
  selectedClub: Club | null;
  setSelectedClub: React.Dispatch<React.SetStateAction<Club | null>>;
  emissionFactors: EmissionFactors;
  updateTransportation: (data: Partial<TransportationData>) => void;
  updateHVAC: (data: Partial<HVACData>) => void;
  updateElectricity: (data: Partial<ElectricityData>) => void;
  updateMaterials: (data: Partial<MaterialsData>) => void;
  updateFood: (data: Partial<FoodData>) => void;
  updateWater: (data: Partial<WaterData>) => void;
  updateFoodWaste: (data: Partial<FoodWasteData>) => void;
  updateAccommodation: (data: Partial<AccommodationData>) => void;
  calculateTotalEmission: () => number;
  saveEventData: () => void;
  leaderboard: EventEmission[];
  resetForm: () => void;
};

// Create the context
const EmissionContext = createContext<EmissionContextType | undefined>(undefined);

// Create the provider component
export const EmissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [emissionFactors, setEmissionFactors] = useState<EmissionFactors>(defaultEmissionFactors);
  const [leaderboard, setLeaderboard] = useState<EventEmission[]>([]);

  // Load leaderboard from localStorage
  useEffect(() => {
    const savedLeaderboard = localStorage.getItem('emissionLeaderboard');
    if (savedLeaderboard) {
      try {
        const parsedLeaderboard = JSON.parse(savedLeaderboard);
        setLeaderboard(parsedLeaderboard.map((event: any) => ({
          ...event,
          createdAt: new Date(event.createdAt)
        })));
      } catch (error) {
        console.error('Error parsing leaderboard from localStorage:', error);
      }
    }
  }, []);

  // Update transportation data
  const updateTransportation = (data: Partial<TransportationData>) => {
    setEmissionFactors(prev => ({
      ...prev,
      transportation: {
        ...prev.transportation,
        ...data,
        road: {
          ...prev.transportation.road,
          ...(data.road || {})
        },
        track: {
          ...prev.transportation.track,
          ...(data.track || {})
        },
        carpooling: {
          ...prev.transportation.carpooling,
          ...(data.carpooling || {})
        }
      }
    }));
  };

  // Update HVAC data
  const updateHVAC = (data: Partial<HVACData>) => {
    setEmissionFactors(prev => ({
      ...prev,
      hvac: {
        ...prev.hvac,
        ...data
      }
    }));
  };

  // Update electricity data
  const updateElectricity = (data: Partial<ElectricityData>) => {
    setEmissionFactors(prev => ({
      ...prev,
      electricity: {
        ...prev.electricity,
        ...data
      }
    }));
  };

  // Update materials data
  const updateMaterials = (data: Partial<MaterialsData>) => {
    setEmissionFactors(prev => ({
      ...prev,
      materials: {
        ...prev.materials,
        ...data
      }
    }));
  };

  // Update food data
  const updateFood = (data: Partial<FoodData>) => {
    setEmissionFactors(prev => ({
      ...prev,
      food: {
        ...prev.food,
        ...data
      }
    }));
  };

  // Update water data
  const updateWater = (data: Partial<WaterData>) => {
    setEmissionFactors(prev => ({
      ...prev,
      water: {
        ...prev.water,
        ...data
      }
    }));
  };

  // Update food waste data
  const updateFoodWaste = (data: Partial<FoodWasteData>) => {
    setEmissionFactors(prev => ({
      ...prev,
      foodWaste: {
        ...prev.foodWaste,
        ...data
      }
    }));
  };

  // Update accommodation data
  const updateAccommodation = (data: Partial<AccommodationData>) => {
    setEmissionFactors(prev => ({
      ...prev,
      accommodation: {
        ...prev.accommodation,
        ...data
      }
    }));
  };

  // Calculate emissions (this is a simplified calculation - would need real emission factors)
  const calculateTotalEmission = (): number => {
    // Transportation emission (simplified calculation)
    const transportationEmission = 
      Object.values(emissionFactors.transportation.road).reduce((sum, val) => sum + val * 0.2, 0) +
      Object.values(emissionFactors.transportation.track).reduce((sum, val) => sum + val * 0.1, 0) +
      Object.values(emissionFactors.transportation.carpooling).reduce((sum, val) => sum + val * 0.05, 0);

    // HVAC emission
    const hvacEmission = emissionFactors.hvac.durationHours * 
      (emissionFactors.hvac.venue === "Convocation hall" ? 10 : 
       emissionFactors.hvac.venue === "FC Kohli" ? 8 : 5) * 
      (1 + emissionFactors.hvac.extraCapacity / 100);

    // Electricity emission
    const electricityEmission = emissionFactors.electricity.durationHours * 
      (emissionFactors.electricity.venue === "Convocation hall" ? 15 : 
       emissionFactors.electricity.venue === "FC Kohli" ? 12 : 7) * 
      (1 + emissionFactors.electricity.extraCapacity / 100);

    // Materials emission
    const materialsEmission = 
      emissionFactors.materials.trophies * 5 +
      emissionFactors.materials.momentoes * 3 +
      emissionFactors.materials.banners * 7 +
      emissionFactors.materials.bottledWater * 0.5 +
      emissionFactors.materials.kits * 2 +
      emissionFactors.materials.premiumKits * 4 +
      emissionFactors.materials.transportation * 1 +
      emissionFactors.materials.printing * 0.1 +
      emissionFactors.materials.merchandise * 3;

    // Food emission
    const foodEmission = 
      emissionFactors.food.vegOptions * 1.5 +
      emissionFactors.food.nonVegOptions * 3.5;

    // Water emission
    const waterEmission = emissionFactors.water.literUsed * 0.001;

    // Food waste emission
    const foodWasteEmission = emissionFactors.foodWaste.kgWasted * 2.5;

    // Accommodation emission
    const accommodationEmission = emissionFactors.accommodation.peopleCount * 
                                  emissionFactors.accommodation.nightsPerRoom * 5;

    // Total emission
    return (
      transportationEmission +
      hvacEmission +
      electricityEmission +
      materialsEmission +
      foodEmission +
      waterEmission +
      foodWasteEmission +
      accommodationEmission
    );
  };

  // Get emission breakdown by category
  const getEmissionBreakdown = () => {
    const transportationEmission = 
    Object.values(emissionFactors.transportation.road).reduce((sum, val) => sum + val * 0.2, 0) +
    Object.values(emissionFactors.transportation.track).reduce((sum, val) => sum + val * 0.1, 0) +
    Object.values(emissionFactors.transportation.carpooling).reduce((sum, val) => sum + val * 0.05, 0);

    // HVAC emission
    const hvacEmission = emissionFactors.hvac.durationHours * 
      (emissionFactors.hvac.venue === "Convocation hall" ? 10 : 
       emissionFactors.hvac.venue === "FC Kohli" ? 8 : 5) * 
      (1 + emissionFactors.hvac.extraCapacity / 100);

    // Electricity emission
    const electricityEmission = emissionFactors.electricity.durationHours * 
      (emissionFactors.electricity.venue === "Convocation hall" ? 15 : 
       emissionFactors.electricity.venue === "FC Kohli" ? 12 : 7) * 
      (1 + emissionFactors.electricity.extraCapacity / 100);

    // Materials emission
    const materialsEmission = 
      emissionFactors.materials.trophies * 5 +
      emissionFactors.materials.momentoes * 3 +
      emissionFactors.materials.banners * 7 +
      emissionFactors.materials.bottledWater * 0.5 +
      emissionFactors.materials.kits * 2 +
      emissionFactors.materials.premiumKits * 4 +
      emissionFactors.materials.transportation * 1 +
      emissionFactors.materials.printing * 0.1 +
      emissionFactors.materials.merchandise * 3;

    // Food emission
    const foodEmission = 
      emissionFactors.food.vegOptions * 1.5 +
      emissionFactors.food.nonVegOptions * 3.5;

    // Water emission
    const waterEmission = emissionFactors.water.literUsed * 0.001;

    // Food waste emission
    const foodWasteEmission = emissionFactors.foodWaste.kgWasted * 2.5;

    // Accommodation emission
    const accommodationEmission = emissionFactors.accommodation.peopleCount * 
                                emissionFactors.accommodation.nightsPerRoom * 5;

    return {
      transportation: transportationEmission,
      hvac: hvacEmission,
      electricity: electricityEmission,
      materials: materialsEmission,
      food: foodEmission,
      water: waterEmission,
      foodWaste: foodWasteEmission,
      accommodation: accommodationEmission
    };
  };

  // Save event data to leaderboard
  const saveEventData = () => {
    if (!selectedClub) return;

    const totalEmission = calculateTotalEmission();
    
    const newEvent: EventEmission = {
      id: Date.now().toString(),
      club: selectedClub,
      totalEmission,
      factors: { ...emissionFactors },
      createdAt: new Date()
    };

    const updatedLeaderboard = [...leaderboard, newEvent].sort((a, b) => a.totalEmission - b.totalEmission);
    setLeaderboard(updatedLeaderboard);
    
    // Save to localStorage
    localStorage.setItem('emissionLeaderboard', JSON.stringify(updatedLeaderboard));
  };

  // Reset form
  const resetForm = () => {
    setSelectedClub(null);
    setEmissionFactors(defaultEmissionFactors);
  };

  // Context value
  const value: EmissionContextType = {
    selectedClub,
    setSelectedClub,
    emissionFactors,
    updateTransportation,
    updateHVAC,
    updateElectricity,
    updateMaterials,
    updateFood,
    updateWater,
    updateFoodWaste,
    updateAccommodation,
    calculateTotalEmission,
    saveEventData,
    leaderboard,
    resetForm
  };

  return (
    <EmissionContext.Provider value={value}>
      {children}
    </EmissionContext.Provider>
  );
};

// Custom hook for using the emission context
export const useEmission = () => {
  const context = useContext(EmissionContext);
  if (context === undefined) {
    throw new Error('useEmission must be used within an EmissionProvider');
  }
  return context;
};
