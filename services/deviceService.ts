/**
 * Simula una llamada a la API para obtener el estado actual del dispensador.
 * En una aplicación real, esto haría una petición fetch a tu backend.
 * @returns {Promise<{waterLevel: number, boxStatus: string}>} Un objeto con el nivel de agua y el estado de la caja.
 */
export const getDeviceStatus = async (): Promise<{waterLevel: number, boxStatus: string}> => {
    // Simula un retardo de red de 300ms
    await new Promise(resolve => setTimeout(resolve, 300));

    // Simula datos que cambian con el tiempo para demostrar la reactividad de la UI
    // El nivel de agua disminuirá lentamente con el tiempo (basado en los minutos) y un poco de aleatoriedad
    const waterLevel = Math.max(0, 80 - (new Date().getMinutes() % 50) - Math.random() * 5);
    
    // Simula que hay un 10% de probabilidad de que la caja esté volcada
    const isTilted = Math.random() > 0.9; 

    return {
        waterLevel: Math.round(waterLevel),
        boxStatus: isTilted ? 'Volcado' : 'Centrado',
    };
};
