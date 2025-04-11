
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEmission } from "@/context/EmissionContext";

const MaterialsFactor: React.FC = () => {
  const { emissionFactors, updateMaterials } = useEmission();
  const { materials } = emissionFactors;

  const handleChange = (key: keyof typeof materials, value: string) => {
    updateMaterials({
      [key]: parseFloat(value) || 0
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-iitb-primary text-white">
        <CardTitle>4. Materials</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="trophies">Trophies (quantity)</Label>
            <Input
              id="trophies"
              type="number"
              min="0"
              value={materials.trophies || ''}
              onChange={(e) => handleChange('trophies', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="momentoes">Momentoes (quantity)</Label>
            <Input
              id="momentoes"
              type="number"
              min="0"
              value={materials.momentoes || ''}
              onChange={(e) => handleChange('momentoes', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="banners">Banners (quantity)</Label>
            <Input
              id="banners"
              type="number"
              min="0"
              value={materials.banners || ''}
              onChange={(e) => handleChange('banners', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bottledWater">Bottled water (quantity)</Label>
            <Input
              id="bottledWater"
              type="number"
              min="0"
              value={materials.bottledWater || ''}
              onChange={(e) => handleChange('bottledWater', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="kits">Kits (quantity)</Label>
            <Input
              id="kits"
              type="number"
              min="0"
              value={materials.kits || ''}
              onChange={(e) => handleChange('kits', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="premiumKits">Premium Kits (quantity)</Label>
            <Input
              id="premiumKits"
              type="number"
              min="0"
              value={materials.premiumKits || ''}
              onChange={(e) => handleChange('premiumKits', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="transportation">Transportation (quantity)</Label>
            <Input
              id="transportation"
              type="number"
              min="0"
              value={materials.transportation || ''}
              onChange={(e) => handleChange('transportation', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="printing">Printing (A4 sheet quantity)</Label>
            <Input
              id="printing"
              type="number"
              min="0"
              value={materials.printing || ''}
              onChange={(e) => handleChange('printing', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="merchandise">Merchandise (quantity)</Label>
            <Input
              id="merchandise"
              type="number"
              min="0"
              value={materials.merchandise || ''}
              onChange={(e) => handleChange('merchandise', e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialsFactor;
