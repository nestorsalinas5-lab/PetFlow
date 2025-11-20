import type { Schedule, PetProfile, HistoryEntry, Substance } from '../types';

const API_URL = process.env.VITE_API_URL;

// --- MOCK DATA (Base de datos simulada para Modo Demo) ---
let mockSchedules: Schedule[] = [
    { id: 1, time: '10:00', amount: 150, substance: 'Water', pet: 'Todos', enabled: true },
    { id: 2, time: '14:00', amount: 100, substance: 'Water', pet: 'Perro', enabled: true },
    { id: 3, time: '18:00', amount: 200, substance: 'Water', pet: 'Todos', enabled: false },
];

let mockPets: PetProfile[] = [
    { id: 1, name: 'Rex', type: 'Perro', weight: 3, breed: 'Chihuahua' },
    { id: 2, name: 'Faraon', type: 'Gato', weight: 4, breed: 'Sphynx' },
    { id: 3, name: 'Furer', type: 'Perro', weight: 24, breed: 'Pastor Alemán' },
    { id: 4, name: 'Pupi', type: 'Perro', weight: 5, breed: 'pastor aleman' },
];

let mockHistory: HistoryEntry[] = [
    { id: 1, time: new Date(), amount: 150, substance: 'Water', type: 'Manual', pet: 'Perro' },
    { id: 2, time: new Date(Date.now() - 3 * 60 * 60 * 1000), amount: 100, substance: 'Water', type: 'Scheduled', pet: 'Todos' },
];

// --- HELPERS ---

const simulateDelay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

const getAuthHeaders = () => {
    const token = localStorage.getItem('petflow_token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

// --- AUTH SERVICE ---

export const login = async (email: string, password: string): Promise<{ token: string, user: { email: string } }> => {
    if (API_URL) {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) throw new Error('Login failed');
        return response.json();
    }
    
    // Mock Login
    await simulateDelay(500);
    if (password === 'password') { // Simple mock check
        return { token: 'mock-jwt-token', user: { email } };
    }
    throw new Error('Credenciales inválidas');
};

// --- DEVICE STATUS SERVICE ---

export const getDeviceStatus = async (): Promise<{ waterLevel: number, boxStatus: string }> => {
    if (API_URL) {
        try {
            const response = await fetch(`${API_URL}/status`, { headers: getAuthHeaders() });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        } catch (error) {
            console.warn("API Error (Status), falling back to mock data temporarily if needed", error);
        }
    }

    // Mock Status
    // El nivel de agua disminuirá lentamente con el tiempo
    const waterLevel = Math.max(0, 80 - (new Date().getMinutes() % 50) - Math.random() * 5);
    const isTilted = Math.random() > 0.95; 

    return {
        waterLevel: Math.round(waterLevel),
        boxStatus: isTilted ? 'Volcado' : 'Centrado',
    };
};

export const dispenseWater = async (amount: number, pet: string): Promise<{ success: boolean, waterLevel: number }> => {
    if (API_URL) {
        const response = await fetch(`${API_URL}/dispense`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ amount, pet })
        });
        if (!response.ok) throw new Error('Dispense failed');
        return response.json();
    }

    // Mock Dispense
    await simulateDelay(800);
    const newEntry: HistoryEntry = {
        id: Date.now(),
        time: new Date(),
        amount,
        substance: 'Water',
        type: 'Manual',
        pet
    };
    mockHistory = [newEntry, ...mockHistory].slice(0, 20); // Update mock DB
    return { success: true, waterLevel: Math.max(0, 80 - 5) }; // Simulate level drop
};

// --- SCHEDULES SERVICE ---

export const getSchedules = async (): Promise<Schedule[]> => {
    if (API_URL) {
        const response = await fetch(`${API_URL}/schedules`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error('Failed to fetch schedules');
        return response.json();
    }
    await simulateDelay();
    return [...mockSchedules];
};

export const createSchedule = async (schedule: Omit<Schedule, 'id' | 'enabled' | 'substance'>): Promise<Schedule> => {
    if (API_URL) {
        const response = await fetch(`${API_URL}/schedules`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(schedule)
        });
        if (!response.ok) throw new Error('Failed to create schedule');
        return response.json();
    }
    
    await simulateDelay();
    const newSchedule: Schedule = {
        id: Date.now(),
        ...schedule,
        substance: 'Water',
        enabled: true
    };
    mockSchedules.push(newSchedule);
    mockSchedules.sort((a, b) => a.time.localeCompare(b.time));
    return newSchedule;
};

export const updateSchedule = async (schedule: Schedule): Promise<Schedule> => {
    if (API_URL) {
        const response = await fetch(`${API_URL}/schedules/${schedule.id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(schedule)
        });
        if (!response.ok) throw new Error('Failed to update schedule');
        return response.json();
    }

    await simulateDelay();
    mockSchedules = mockSchedules.map(s => s.id === schedule.id ? schedule : s)
        .sort((a, b) => a.time.localeCompare(b.time));
    return schedule;
};

export const deleteSchedule = async (id: number): Promise<void> => {
    if (API_URL) {
        const response = await fetch(`${API_URL}/schedules/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Failed to delete schedule');
        return;
    }

    await simulateDelay();
    mockSchedules = mockSchedules.filter(s => s.id !== id);
};

// --- PETS SERVICE ---

export const getPets = async (): Promise<PetProfile[]> => {
    if (API_URL) {
        const response = await fetch(`${API_URL}/pets`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error('Failed to fetch pets');
        return response.json();
    }
    await simulateDelay();
    return [...mockPets];
};

export const createPet = async (pet: Omit<PetProfile, 'id'>): Promise<PetProfile> => {
    if (API_URL) {
        const response = await fetch(`${API_URL}/pets`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(pet)
        });
        if (!response.ok) throw new Error('Failed to create pet');
        return response.json();
    }

    await simulateDelay();
    const newPet = { id: Date.now(), ...pet };
    mockPets.push(newPet);
    return newPet;
};

export const updatePet = async (pet: PetProfile): Promise<PetProfile> => {
    if (API_URL) {
        const response = await fetch(`${API_URL}/pets/${pet.id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(pet)
        });
        if (!response.ok) throw new Error('Failed to update pet');
        return response.json();
    }

    await simulateDelay();
    mockPets = mockPets.map(p => p.id === pet.id ? pet : p);
    return pet;
};

export const deletePet = async (id: number): Promise<void> => {
    if (API_URL) {
        const response = await fetch(`${API_URL}/pets/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Failed to delete pet');
        return;
    }

    await simulateDelay();
    mockPets = mockPets.filter(p => p.id !== id);
};

// --- HISTORY SERVICE ---

export const getHistory = async (): Promise<HistoryEntry[]> => {
    if (API_URL) {
        const response = await fetch(`${API_URL}/history`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error('Failed to fetch history');
        // Ensure dates are Date objects
        const data = await response.json();
        return data.map((entry: any) => ({ ...entry, time: new Date(entry.time) }));
    }

    await simulateDelay();
    return [...mockHistory];
};
