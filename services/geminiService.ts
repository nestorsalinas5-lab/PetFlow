import { GoogleGenAI, Type } from "@google/genai";
import type { PetProfile, AIWaterPlanEntry } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Genera un plan de hidratación para las mascotas utilizando la IA de Gemini.
 * @param {PetProfile[]} pets - Un array con los perfiles de las mascotas.
 * @returns {Promise<AIWaterPlanEntry[]>} Un plan de hidratación con horarios y cantidades.
 */
export const generateWaterPlan = async (pets: PetProfile[]): Promise<AIWaterPlanEntry[]> => {
    
    const petInfo = pets.map(p => `- ${p.name}: ${p.type} de ${p.weight}kg, raza ${p.breed}.`).join('\n');

    const prompt = `
        Basado en los siguientes perfiles de mascotas:
        ${petInfo}

        Crea un plan diario de dispensación de agua para todas ellas. Considera que un perro necesita aproximadamente 60ml de agua por kg de peso corporal al día, y un gato unos 50ml por kg.
        Distribuye la ingesta total diaria recomendada para todas las mascotas en 3-5 tomas a lo largo del día, en horarios razonables (p. ej., mañana, mediodía, tarde, noche).
        Devuelve un array de objetos JSON con los horarios y las cantidades. La hora debe estar en formato "HH:mm".
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            time: {
                                type: Type.STRING,
                                description: 'La hora de la dispensación en formato "HH:mm".'
                            },
                            amount: {
                                type: Type.NUMBER,
                                description: 'La cantidad de agua a dispensar en ml.'
                            }
                        },
                        required: ["time", "amount"]
                    }
                }
            }
        });
        
        const jsonText = response.text?.trim();
        if (!jsonText) {
            throw new Error("La respuesta de la IA no devolvió un texto válido.");
        }
        const plan = JSON.parse(jsonText);

        // Validar que el plan es un array
        if (!Array.isArray(plan)) {
            throw new Error("La respuesta de la IA no es un array válido.");
        }

        return plan;
    } catch (error) {
        console.error("Error al generar el plan de hidratación con Gemini:", error);
        throw new Error("No se pudo obtener una respuesta válida de la IA.");
    }
};