// src/features/campus/CampusPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CampusScene from './CampusScene';
import CampusFallback from './CampusFallback';
import { CAMPUS_BUILDINGS } from '@/data/campusLayout';
import { ROOMS } from '@/data/demoData';
import {
  Boxes,
  Layers,
  Building2,
  X,
  ArrowRight,
  Compass,
  RotateCcw,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { Badge, Button, StatusBadge } from '@/components/common';

export default function CampusPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('3d'); // '3d' or '2d'
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [activeFloor, setActiveFloor] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');

  const buildingRooms = selectedBuilding
    ? ROOMS.filter((r) => r.building === selectedBuilding.name)
    : [];

  const filteredRooms = buildingRooms.filter((r) => {
    if (statusFilter === 'available') return r.status === 'available';
    if (statusFilter === 'occupied') return r.status === 'occupied';
    return true;
  });

  const handleEnterFloor = (floorNum) => {
    if (!selectedBuilding) return;
    navigate(`/campus/${selectedBuilding.id}/floor/${floorNum}`);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col rounded-2xl overflow-hidden border border-[#1F2420] bg-[#080A09] relative shadow-2xl">
      {/* Top Campus Control Bar */}
      <div className="h-14 border-b border-[#1F2420] bg-[#080A09]/95 backdrop-blur-md px-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Boxes className="w-5 h-5 text-[#B8F36B]" />
            <h2 className="font-bold text-sm sm:text-base text-white">
              Interactive CIT Campus
            </h2>
          </div>
          <Badge variant="teal" size="sm" className="hidden sm:inline-flex">
            Illustrative campus layout
          </Badge>
        </div>

        {/* View Mode Toggle & Status Filter */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center bg-[#121614] p-1 rounded-xl border border-[#1F2420]">
            <button
              onClick={() => setViewMode('3d')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                viewMode === '3d'
                  ? 'bg-[#B8F36B] text-[#101110] font-black shadow-md shadow-[#B8F36B]/20'
                  : 'text-[#9AA19C] hover:text-white'
              }`}
            >
              3D Campus
            </button>
            <button
              onClick={() => setViewMode('2d')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                viewMode === '2d'
                  ? 'bg-[#B8F36B] text-[#101110] font-black shadow-md shadow-[#B8F36B]/20'
                  : 'text-[#9AA19C] hover:text-white'
              }`}
            >
              2D Plan
            </button>
          </div>

          {selectedBuilding && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedBuilding(null)}
              icon={RotateCcw}
              className="hidden md:inline-flex text-xs"
            >
              Reset View
            </Button>
          )}
        </div>
      </div>

      {/* Main Campus Scene Container */}
      <div className="flex-1 relative overflow-hidden">
        {viewMode === '3d' ? (
          <CampusScene
            selectedBuilding={selectedBuilding}
            onSelectBuilding={(b) => {
              setSelectedBuilding(b);
              setActiveFloor(b.floors[0] || 1);
            }}
          />
        ) : (
          <CampusFallback
            selectedBuilding={selectedBuilding}
            onSelectBuilding={(b) => {
              setSelectedBuilding(b);
              setActiveFloor(b.floors[0] || 1);
            }}
          />
        )}

        {/* Selected Building Details Drawer */}
        {selectedBuilding && (
          <div className="absolute top-4 right-4 bottom-4 w-80 sm:w-96 bg-[#080A09]/95 border border-[#1F2420] rounded-2xl shadow-2xl backdrop-blur-xl z-30 flex flex-col overflow-hidden animate-slide-in-right">
            {/* Drawer Header */}
            <div className="p-4 border-b border-[#1F2420] bg-[#121614] flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{selectedBuilding.icon}</span>
                  <h3 className="font-bold text-base text-white">
                    {selectedBuilding.name}
                  </h3>
                </div>
                <p className="text-xs text-[#9AA19C] mt-1">
                  Departments: {selectedBuilding.dept}
                </p>
              </div>
              <button
                onClick={() => setSelectedBuilding(null)}
                className="p-1 text-[#9AA19C] hover:text-white hover:bg-[#161B18] rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Floor Selector Tabs */}
            <div className="p-4 border-b border-[#1F2420] bg-[#121614]/40">
              <label className="text-xs font-semibold text-[#9AA19C] uppercase tracking-wider block mb-2 font-mono">
                Select Floor to Inspect
              </label>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {selectedBuilding.floors.map((floor) => (
                  <button
                    key={floor}
                    onClick={() => setActiveFloor(floor)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeFloor === floor
                        ? 'bg-[#B8F36B] text-[#101110] font-black shadow-md shadow-[#B8F36B]/20'
                        : 'bg-[#161B18] text-[#9AA19C] hover:text-white hover:bg-[#1F2420]'
                    }`}
                  >
                    Floor {floor}
                  </button>
                ))}
              </div>

              <Button
                variant="primary"
                size="sm"
                className="w-full mt-3 text-xs"
                onClick={() => handleEnterFloor(activeFloor)}
              >
                <span>Enter Top-Down Floor Plan</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Rooms list on this floor */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-[#9AA19C] mb-2 font-mono">
                <span className="font-semibold uppercase tracking-wider">
                  Rooms on Floor {activeFloor}
                </span>
                <span className="text-[#777D78]">
                  {
                    buildingRooms.filter((r) => r.floor === activeFloor).length
                  } total
                </span>
              </div>

              {buildingRooms.filter((r) => r.floor === activeFloor).length === 0 ? (
                <div className="text-center py-6 text-xs text-[#777D78]">
                  No classroom records on this level
                </div>
              ) : (
                buildingRooms
                  .filter((r) => r.floor === activeFloor)
                  .map((room) => (
                    <div
                      key={room.id}
                      onClick={() =>
                        navigate(
                          `/campus/${selectedBuilding.id}/floor/${room.floor}/room/${room.id}`
                        )
                      }
                      className="p-3 rounded-xl bg-[#121614] hover:bg-[#161B18] border border-[#1F2420] hover:border-[#B8F36B]/40 cursor-pointer transition-all flex items-center justify-between group"
                    >
                      <div>
                        <div className="font-bold text-xs text-slate-200 group-hover:text-[#B8F36B] transition-colors">
                          {room.name}
                        </div>
                        <div className="text-[11px] text-[#9AA19C] mt-0.5">
                          {room.type} • {room.capacity} seats
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={room.status} />
                        <ChevronRight className="w-4 h-4 text-[#777D78] group-hover:text-[#B8F36B] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  ))
              )}
            </div>

            {/* Footer with hint */}
            <div className="p-3 bg-[#080A09] border-t border-[#1F2420] text-[11px] text-[#9AA19C] flex items-center gap-2">
              <Info className="w-4 h-4 text-[#B8F36B] shrink-0" />
              <span>Click any classroom to see live timetable and booking slots</span>
            </div>
          </div>
        )}

        {/* Legend Overlay at bottom-left */}
        <div className="absolute bottom-4 left-4 bg-[#121614]/95 border border-[#1F2420] rounded-xl px-3 py-2 backdrop-blur-md shadow-lg z-20 flex items-center gap-3 text-xs text-slate-300">
          <span className="font-semibold text-[#9AA19C] text-[11px] uppercase tracking-wider font-mono">
            Legend:
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B8F36B]" />
            <span className="text-slate-200">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="text-slate-200">Occupied</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="text-slate-200">Partial</span>
          </div>
        </div>
      </div>
    </div>
  );
}
