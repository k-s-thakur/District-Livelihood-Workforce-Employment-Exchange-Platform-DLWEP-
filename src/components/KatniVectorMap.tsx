"use client";

import React, { useState } from "react";
import { MapPin } from "lucide-react";

// Block layout details with relative coordinates for SVG rendering
const BLOCKS = [
  {
    id: "Murwara (Katni)",
    name: "Murwara (Katni)",
    path: "M 170 180 L 250 160 L 290 220 L 240 280 L 160 260 Z",
    labelX: 215,
    labelY: 215,
    lat: 23.834,
    lng: 80.399,
    color: "fill-blue-50 hover:fill-blue-100 stroke-blue-200"
  },
  {
    id: "Bahoriband",
    name: "Bahoriband",
    path: "M 100 250 L 160 260 L 240 280 L 210 370 L 120 360 Z",
    labelX: 165,
    labelY: 315,
    lat: 23.593,
    lng: 80.128,
    color: "fill-emerald-50 hover:fill-emerald-100 stroke-emerald-200"
  },
  {
    id: "Rithi",
    name: "Rithi",
    path: "M 90 90 L 180 80 L 170 180 L 160 260 L 100 250 Z",
    labelX: 135,
    labelY: 160,
    lat: 23.993,
    lng: 80.208,
    color: "fill-purple-50 hover:fill-purple-100 stroke-purple-200"
  },
  {
    id: "Barwara",
    name: "Barwara",
    path: "M 290 220 L 370 180 L 410 260 L 380 300 L 240 280 Z",
    labelX: 335,
    labelY: 250,
    lat: 23.791,
    lng: 80.609,
    color: "fill-amber-50 hover:fill-amber-100 stroke-amber-200"
  },
  {
    id: "Vijayraghavgarh",
    name: "Vijayraghavgarh",
    path: "M 180 80 L 320 60 L 400 130 L 370 180 L 250 160 Z",
    labelX: 285,
    labelY: 115,
    lat: 24.085,
    lng: 80.595,
    color: "fill-rose-50 hover:fill-rose-100 stroke-rose-200"
  },
  {
    id: "Badwara",
    name: "Badwara",
    path: "M 240 280 L 380 300 L 360 380 L 210 370 Z",
    labelX: 295,
    labelY: 335,
    lat: 23.633,
    lng: 80.702,
    color: "fill-teal-50 hover:fill-teal-100 stroke-teal-200"
  }
];

const VILLAGES_COORD = {
  "Kuthla": { offsetLat: 0.015, offsetLng: -0.012, x: 200, y: 195 },
  "Pipariya": { offsetLat: -0.02, offsetLng: 0.02, x: 230, y: 240 },
  "Jhanjhari": { offsetLat: 0.005, offsetLng: 0.015, x: 225, y: 205 },
  "Madhayn": { offsetLat: -0.01, offsetLng: -0.02, x: 190, y: 230 },
  "Sleemanabad": { offsetLat: 0.018, offsetLng: 0.018, x: 190, y: 300 },
  "Bahoriband": { offsetLat: -0.015, offsetLng: -0.015, x: 155, y: 330 },
  "Khamtara": { offsetLat: 0.025, offsetLng: -0.02, x: 135, y: 290 },
  "Chhapra": { offsetLat: -0.03, offsetLng: 0.03, x: 180, y: 350 },
  "Rithi": { offsetLat: 0.01, offsetLng: 0.01, x: 145, y: 150 },
  "Hardua": { offsetLat: -0.015, offsetLng: -0.01, x: 125, y: 200 },
  "Bari": { offsetLat: 0.02, offsetLng: -0.015, x: 120, y: 120 },
  "Bakhra": { offsetLat: -0.025, offsetLng: 0.025, x: 155, y: 180 },
  "Barwara": { offsetLat: 0.005, offsetLng: 0.01, x: 330, y: 245 },
  "Rupaund": { offsetLat: -0.015, offsetLng: 0.02, x: 360, y: 260 },
  "Nanhwara": { offsetLat: 0.02, offsetLng: -0.02, x: 315, y: 230 },
  "Banjari": { offsetLat: -0.03, offsetLng: -0.01, x: 345, y: 275 },
  "Bijeraghogarh": { offsetLat: 0.012, offsetLng: 0.015, x: 310, y: 120 },
  "Vijayraghavgarh": { offsetLat: -0.008, offsetLng: -0.01, x: 280, y: 140 },
  "Khalwara": { offsetLat: 0.025, offsetLng: -0.025, x: 260, y: 100 },
  "Kharhari": { offsetLat: -0.03, offsetLng: 0.03, x: 345, y: 155 },
  "Badwara": { offsetLat: 0.01, offsetLng: 0.01, x: 295, y: 320 },
  "Lakhakhera": { offsetLat: -0.015, offsetLng: 0.02, x: 320, y: 350 },
  "Kailwara": { offsetLat: 0.02, offsetLng: -0.02, x: 270, y: 310 },
  "Bujbuja": { offsetLat: -0.025, offsetLng: -0.01, x: 285, y: 360 }
};

interface KatniVectorMapProps {
  selectedBlock: string;
  selectedVillage: string;
  onSelectCoordinate: (block: string, village: string, lat: number, lng: number) => void;
}

export default function KatniVectorMap({
  selectedBlock,
  selectedVillage,
  onSelectCoordinate
}: KatniVectorMapProps) {
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);

  // Determine current active pin location on SVG canvas
  const currentPin = selectedVillage ? VILLAGES_COORD[selectedVillage as keyof typeof VILLAGES_COORD] : null;

  const handleBlockClick = (blockId: string, baseLat: number, baseLng: number) => {
    // Select first village in that block
    let defaultVillage = "";
    if (blockId === "Murwara (Katni)") defaultVillage = "Kuthla";
    else if (blockId === "Bahoriband") defaultVillage = "Sleemanabad";
    else if (blockId === "Rithi") defaultVillage = "Rithi";
    else if (blockId === "Barwara") defaultVillage = "Barwara";
    else if (blockId === "Vijayraghavgarh") defaultVillage = "Bijeraghogarh";
    else if (blockId === "Badwara") defaultVillage = "Badwara";

    const vCoord = VILLAGES_COORD[defaultVillage as keyof typeof VILLAGES_COORD];
    const finalLat = baseLat + (vCoord?.offsetLat || 0);
    const finalLng = baseLng + (vCoord?.offsetLng || 0);

    onSelectCoordinate(blockId, defaultVillage, finalLat, finalLng);
  };

  const handleVillageClick = (villageName: string) => {
    const blockMatch = BLOCKS.find(b => b.id === selectedBlock);
    if (!blockMatch) return;

    const vCoord = VILLAGES_COORD[villageName as keyof typeof VILLAGES_COORD];
    const finalLat = blockMatch.lat + (vCoord?.offsetLat || 0);
    const finalLng = blockMatch.lng + (vCoord?.offsetLng || 0);

    onSelectCoordinate(selectedBlock, villageName, finalLat, finalLng);
  };

  const currentVillages = selectedBlock === "Murwara (Katni)" ? ["Kuthla", "Pipariya", "Jhanjhari", "Madhayn"]
    : selectedBlock === "Bahoriband" ? ["Sleemanabad", "Bahoriband", "Khamtara", "Chhapra"]
    : selectedBlock === "Rithi" ? ["Rithi", "Hardua", "Bari", "Bakhra"]
    : selectedBlock === "Barwara" ? ["Barwara", "Rupaund", "Nanhwara", "Banjari"]
    : selectedBlock === "Vijayraghavgarh" ? ["Bijeraghogarh", "Vijayraghavgarh", "Khalwara", "Kharhari"]
    : selectedBlock === "Badwara" ? ["Badwara", "Lakhakhera", "Kailwara", "Bujbuja"]
    : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white border border-hairline rounded-md p-6 airbnb-shadow">
      
      {/* 1. Vector Map Display (col-span-2) */}
      <div className="md:col-span-2 flex flex-col items-center">
        <span className="text-xs font-bold text-muted uppercase tracking-wider mb-2 self-start">
          Interactive Katni District Map
        </span>
        <div className="relative w-full aspect-[5/4] bg-surface-soft border border-hairline rounded-sm overflow-hidden flex items-center justify-center">
          
          <svg 
            viewBox="0 0 500 400" 
            className="w-full h-full max-h-[350px] p-4 select-none"
          >
            {/* Render blocks */}
            {BLOCKS.map((block) => {
              const isSelected = selectedBlock === block.id;
              const isHovered = hoveredBlock === block.id;
              return (
                <g 
                  key={block.id} 
                  className="cursor-pointer"
                  onClick={() => handleBlockClick(block.id, block.lat, block.lng)}
                  onMouseEnter={() => setHoveredBlock(block.id)}
                  onMouseLeave={() => setHoveredBlock(null)}
                >
                  <path
                    d={block.path}
                    className={`transition-all duration-150 stroke-[1.5px] ${block.color} ${
                      isSelected 
                        ? "fill-primary/20 stroke-primary/50 stroke-2" 
                        : isHovered 
                          ? "stroke-ink/30" 
                          : ""
                    }`}
                  />
                  <text
                    x={block.labelX}
                    y={block.labelY}
                    className={`text-[11px] font-bold fill-ink/60 pointer-events-none text-center select-none ${
                      isSelected ? "fill-primary font-extrabold" : ""
                    }`}
                    textAnchor="middle"
                  >
                    {block.name}
                  </text>
                </g>
              );
            })}

            {/* Map Pin overlay on selected village center point */}
            {currentPin && (
              <g className="transition-all duration-300">
                <circle
                  cx={currentPin.x}
                  cy={currentPin.y}
                  r="6"
                  className="fill-primary/30 animate-ping"
                />
                <circle
                  cx={currentPin.x}
                  cy={currentPin.y}
                  r="3"
                  className="fill-primary"
                />
                {/* Pin Icon */}
                <foreignObject
                  x={currentPin.x - 12}
                  y={currentPin.y - 28}
                  width="24"
                  height="24"
                  className="pointer-events-none"
                >
                  <MapPin className="w-6 h-6 text-primary fill-white drop-shadow-md" />
                </foreignObject>
              </g>
            )}
          </svg>

          {/* Map instructions overlay */}
          <div className="absolute bottom-3 left-3 bg-white/95 border border-hairline-soft px-3 py-1.5 rounded-full text-[10px] font-semibold text-muted airbnb-shadow pointer-events-none">
            Click block to zoom in and list local villages
          </div>
        </div>
      </div>

      {/* 2. Village selection list (col-span-1) */}
      <div className="flex flex-col border-l border-hairline-soft pl-6">
        <span className="text-xs font-bold text-muted uppercase tracking-wider mb-3 block">
          Select Village / Ward
        </span>

        {selectedBlock ? (
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[300px] pr-2">
            <div className="text-[11px] text-muted-soft font-semibold mb-1">
              Villages in {selectedBlock}:
            </div>
            {currentVillages.map((v) => {
              const isSelected = selectedVillage === v;
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => handleVillageClick(v)}
                  className={`w-full text-left px-4 py-2.5 rounded-sm border text-xs font-semibold transition-all cursor-pointer ${
                    isSelected 
                      ? "bg-primary/5 text-primary border-primary" 
                      : "bg-surface-soft text-ink border-hairline hover:border-muted"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{v}</span>
                    {isSelected && (
                      <span className="text-[10px] text-primary bg-white px-2 py-0.5 rounded-full font-bold border border-primary/20">
                        GPS Selected
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-10 bg-surface-soft border border-dashed border-hairline rounded-sm">
            <MapPin className="w-8 h-8 text-muted-soft mb-2" />
            <p className="text-xs text-muted max-w-[150px]">
              Select a block on the map to view village details.
            </p>
          </div>
        )}

        {/* Selected Coordinates Readout */}
        {selectedVillage && currentPin && (
          <div className="mt-auto pt-6 border-t border-hairline-soft">
            <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">
              Spatial Coordinates
            </span>
            <div className="bg-surface-soft p-3 rounded-sm border border-hairline mt-1.5 flex items-center justify-between text-[11px] font-mono text-muted">
              <span>Lat: {(BLOCKS.find(b => b.id === selectedBlock)?.lat || 0) + (VILLAGES_COORD[selectedVillage as keyof typeof VILLAGES_COORD]?.offsetLat || 0)}</span>
              <span>Lng: {(BLOCKS.find(b => b.id === selectedBlock)?.lng || 0) + (VILLAGES_COORD[selectedVillage as keyof typeof VILLAGES_COORD]?.offsetLng || 0)}</span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
