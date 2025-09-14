import { GoogleGenAI, Type } from "@google/genai";
import type { PetProfile, MealPlan } from '../types';

// Fix: Adhere to Gemini API guidelines by using process.env.API_KEY. This also resolves the
// TypeScript error 'Property 'env' does not exist on type 'ImportMeta''. We declare 'process'
// to avoid 'Cannot find name 'process'' errors in a browser environment.
declare var process: {
  env: {
    [key: string]: string | undefined;
  };
};

const apiKey = process.env.API_KEY;

if (!apiKey) {
    console.warn("La variable de entorno API_KEY no está configurada. Usando un servicio de simulación.");
}
const ai = new GoogleGenAI({ apiKey: apiKey || 'mock_key' });

const mealPlanSchema = {
  type: Type.OBJECT,
  properties: {
    dailyCalories: { 
        type: Type.NUMBER,
        description: "El total de calorías diarias recomendadas para la mascota."
    },
    mealPortions: {
      type: Type.ARRAY,
      description: "Una lista de comidas recomendadas, incluyendo el tamaño de la porción y la hora de la comida.",
      items: {
        type: Type.OBJECT,
        properties: {
          meal: { type: Type.STRING, description: "El nombre de la comida (ej., 'Desayuno', 'Cena')." },
          grams: { type: Type.NUMBER, description: "El tamaño de la porción recomendado en gramos." },
          time: { type: Type.STRING, description: "La hora de la comida recomendada en formato HH:MM (ej., '08:00')." },
        },
        required: ["meal", "grams", "time"],
      },
    },
    feedingTips: {
        type: Type.ARRAY,
        description: "Una lista de 2-3 consejos útiles para la alimentación de la mascota.",
        items: {
            type: Type.STRING
        }
    }
  },
  required: ["dailyCalories", "mealPortions", "feedingTips"],
};

const createMockMealPlan = (profile: PetProfile): MealPlan => {
    const baseCalories = profile.weight * 50;
    let activityMultiplier = 1.0;
    if (profile.activityLevel === 'Alto') activityMultiplier = 1.4;
    if (profile.activityLevel === 'Bajo') activityMultiplier = 0.8;

    const dailyCalories = baseCalories * activityMultiplier;
    const totalGrams = dailyCalories / 3.5; // Avg kcal per gram of pet food

    return {
        dailyCalories: dailyCalories,
        mealPortions: [
            { meal: 'Desayuno', grams: Math.round(totalGrams / 2), time: '08:00' },
            { meal: 'Cena', grams: Math.round(totalGrams / 2), time: '18:00' },
        ],
        feedingTips: [
            `Esta es una respuesta de simulación para un ${profile.type}.`,
            "Asegúrate de que siempre haya agua fresca disponible.",
            "Controla el peso de tu mascota y ajusta las porciones según sea necesario.",
            "Consulta a un veterinario para necesidades dietéticas específicas.",
        ],
    };
};


export const generateMealPlan = async (profile: PetProfile): Promise<MealPlan> => {
    if (!apiKey) {
        return new Promise(resolve => setTimeout(() => resolve(createMockMealPlan(profile)), 1000));
    }

    const prompt = `
    Genera un plan de alimentación diario para una mascota con las siguientes características.
    - Tipo de Mascota: ${profile.type}
    - Peso: ${profile.weight} kg
    - Edad: ${profile.age} años
    - Nivel de Actividad: ${profile.activityLevel}

    Por favor, proporciona la salida en un formato JSON estructurado. El plan debe incluir la ingesta calórica diaria total, un desglose de las porciones de comida en gramos con horarios de alimentación sugeridos y 2-3 consejos de alimentación concisos.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: mealPlanSchema,
            },
        });
        
        const jsonText = response.text;
        if (!jsonText) {
          throw new Error("La API no devolvió una respuesta de texto.");
        }
        
        const parsedPlan = JSON.parse(jsonText.trim());

        // Basic validation
        if (!parsedPlan.dailyCalories || !parsedPlan.mealPortions || !parsedPlan.feedingTips) {
          throw new Error("Se recibió un plan de comidas incompleto de la API.");
        }

        return parsedPlan as MealPlan;
    } catch (error) {
        console.error("Error al generar el plan de comidas:", error);
        throw new Error("No se pudo generar el plan de comidas. La IA puede estar ocupada, por favor inténtalo de nuevo más tarde.");
    }
};