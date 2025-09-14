export type View = 'dashboard' | 'schedules' | 'pet-profiles' | 'manual-dispense' | 'consumption' | 'meal-planner';

export interface Schedule {
  id: number;
  time: string;
  amount: number; // in grams
  pet: string;
  enabled: boolean;
}

export interface HistoryEntry {
  id: number;
  time: Date;
  amount: number; // in grams
  type: 'Scheduled' | 'Manual';
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


export interface MealPlan {
  dailyCalories: number;
  mealPortions: {
    meal: string;
    grams: number;
    time: string;
  }[];
  feedingTips: string[];
}