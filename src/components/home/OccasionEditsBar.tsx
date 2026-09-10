import React, { useState } from 'react';
import { ArrowRight, ChevronRight, X, Sparkles, Compass, CheckCircle2 } from 'lucide-react';
import { ProductCategory } from '../../types';
import { CATEGORY_DEPARTMENTS, DepartmentCategory, DepartmentPillarGroup } from '../../data/categoryContent';
import { useAudioStore } from '../../stores/audioStore';
import { useCurrencyStore } from '../../stores/currencyStore';
import { formatKoboToNgn } from '../../utils/formatters';

interface OccasionEditsBarProps {
  onSelectCategory?: (category: ProductCategory) => void;
  onSelectOccasion?: (occasion: any) => void;
}

type PillarFilter = 'ALL' | DepartmentPillarGroup;

export const OccasionEditsBar: React.FC<OccasionEditsBarProps> = ({ 
  onSelectCategory, 
  onSelectOccasion 
}) => {
  const { playTactileClick } = useAudioStore();
  const { displayCurrency } = useCurrencyStore();
  
  const [activePillar, setActivePillar] = useState<PillarFilter>('ALL');
  const [inspectedDept, setInspectedDept] = useState<DepartmentCategory | null>(null);

  const handleNavigate = (catId: ProductCategory) => {
    playTactileClick();
    if (onSelectCategory) {
      onSelectCategory(catId);
    } else if (onSelectOccasion) {
      onSelectOccasion(catId);
    }
  };

  const filteredDepartments = CATEGORY_DEPARTMENTS.filter((dept) => {
    if (activePillar === 'ALL') return true;
    return dept.pillarGroup === activePillar;
  });

  // Featured department when in ALL view is Grand Soirée & Gala Gowns (DINNER_DRESSES)
  const featuredDept = activePillar === 'ALL' 
    ? CATEGORY_DEPARTMENTS.find((d) => d.id === 'DINNER_DRESSES') 
    : filteredDepartments[0];

  const gridDepartments = activePillar === 'ALL'
    ? CATEGORY_DEPARTMENTS.filter((d) => d.id !== 'DINNER_DRESSES')
    : filteredDepartments.slice(1);

  return (
    <section className="w-full bg-[#FFFFFF] py-14 sm:py-24 border-b border-black/10">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header with Authority (Craft-Floor: No Banned Kickers) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-8 sm:mb-12 border-b border-black/10 gap-6">
          <div className="space-y-2">
            <h2 className="font-sans-luxury text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-noir uppercase leading-tight">
              13 COUTURE DEPARTMENTS
            </h2>
            <p className="text-xs sm:text-sm text-black/70 font-light max-w-2xl leading-relaxed">
              Pure mulberry silks, hand-canvassed Italian wools, and ancestral metallic embroidery. Each department is drafted across 48 custom anatomical points inside our Lagos atelier.
            </p>
          </div>

          {/* Minimalist Pillar Filters */}
          <div className="flex items-center flex-wrap gap-2 text-xs font-sans-luxury tracking-wider">
            <button
              onClick={() => {
                playTactileClick();
                setActivePillar('ALL');
                setInspectedDept(null);
              }}
              className={`px-3.5 py-2 text-[11px] uppercase tracking-wider transition-all duration-200 border ${
                activePillar === 'ALL'
                  ? 'bg-black text-white border-black font-semibold'
                  : 'bg-white text-black/70 border-black/15 hover:border-black hover:text-black'
              }`}
            >
              All Departments [13]
            </button>
            <button
              onClick={() => {
                playTactileClick();
                setActivePillar('TAILORING');
                setInspectedDept(null);
              }}
              className={`px-3.5 py-2 text-[11px] uppercase tra