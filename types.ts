export type View = 'dashboard' | 'schedules' | 'pet-profiles' | 'manual-dispense' | 'consumption' | 'camera' | 'ai-planner';

export type Substance = 'Water';

export interface Schedule {
  id: number;
  time: string;
  amount: number; // in ml for Water
  substance: Substance;
  pet: string;
  enabled: boolean;
}

export interface HistoryEntry {
  id: number;
  time: Date;
  amount: number; // in ml for Water
  substance: Substance;
  type: 'Scheduled' | 'Manual';
  pet?: string; // Para qué mascota fue
}

export interface PetProfile {
  id: number;
  name: string;
  type: 'Perro' | 'Gato';
  weight: number; // in kg
  breed: string;
  age?: number; // in years
  activityLevel?: 'Bajo' | 'Moderado' | 'Alto';
}

export interface AIWaterPlanEntry {
    time: string;
    amount: number; // in ml
}