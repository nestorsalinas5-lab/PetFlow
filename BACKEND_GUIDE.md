# Especificación de la API de PetFlow (Versión simplificada - Solo Agua)

## 1. Resumen

¡Bienvenidos, equipo de backend!

Este documento describe la especificación de la API para la aplicación PetFlow, que ahora se enfoca **exclusivamente en la dispensación de agua**. El frontend está completamente desarrollado y depende de esta API para reemplazar todos los datos de prueba (mock data) con un backend persistente.

El objetivo es construir una API RESTful que gestione la autenticación, el estado del dispositivo (nivel de agua y estado de la caja), los horarios de dispensación de agua y los perfiles de las mascotas.

### Convenciones Generales

*   **URL Base**: Todos los endpoints de la API tienen el prefijo `/api`. Por ejemplo: `https://your-domain.com/api/`.
*   **Autenticación**: Todos los endpoints, excepto `/api/auth/login`, están protegidos y requieren un JSON Web Token (JWT).
    ```
    Authorization: Bearer <your_jwt_token>
    ```
*   **Formato de Datos**: `application/json`.
*   **Respuestas de Error**:
    ```json
    {
      "error": "Un mensaje de error descriptivo."
    }
    ```

---

## 2. Autenticación

### **`POST /api/auth/login`**

Autentica a un usuario y devuelve un JWT.

*   **Cuerpo de la Petición**: `{ "email": "user@petflow.com", "password": "password123" }`
*   **Respuesta Exitosa (`200 OK`)**: `{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }`
*   **Respuesta de Error (`401 Unauthorized`)**: `{ "error": "Email o contraseña inválidos." }`

---

## 3. Estado y Acciones del Dispositivo

### **`GET /api/status`**

Recupera el estado actual de los sensores del dispositivo. El frontend llamará a este endpoint periódicamente (cada 5 segundos) para mantener la interfaz actualizada.

*   **Autenticación**: Requerida.
*   **Respuesta Exitosa (`200 OK`)**:
    ```json
    {
      "waterLevel": 85,        // Porcentaje (0-100), corresponde al sensor D0/L4
      "boxStatus": "Centrado"  // String: "Centrado" o "Volcado", corresponde al sensor D0/L3
    }
    ```

### **`POST /api/dispense`**

Activa una dispensación manual de agua. El backend debe actualizar el nivel del contenedor y registrar el evento en el historial.

*   **Autenticación**: Requerida.
*   **Cuerpo de la Petición**:
    ```json
    {
      "amount": 150,     // ml de agua
      "pet": "Perro"  // Nombre de la mascota o grupo ("Todos", "Perro", "Gato")
    }
    ```
*   **Respuesta Exitosa (`200 OK`)**: Devuelve el nuevo estado del dispositivo.
    ```json
    {
      "waterLevel": 80 // Nuevo nivel de agua
    }
    ```
*   **Respuesta de Error (`400 Bad Request`)**: `{ "error": "Agua insuficiente en el dispensador." }`

---

## 4. Horarios de Agua

Gestiona los horarios de dispensación de agua.

### **`GET /api/schedules`**

Recupera una lista completa de todos los horarios de agua.

*   **Autenticación**: Requerida.
*   **Respuesta Exitosa (`200 OK`)**:
    ```json
    [
      {
        "id": 1,
        "time": "10:00",
        "amount": 150, // ml
        "substance": "Water",
        "pet": "Todos",
        "enabled": true
      }
    ]
    ```

### **`POST /api/schedules`**

Crea un nuevo horario de agua.

*   **Autenticación**: Requerida.
*   **Cuerpo de la Petición**:
    ```json
    {
      "time": "14:00",
      "amount": 100, // ml
      "pet": "Perro"
    }
    ```
*   **Respuesta Exitosa (`201 Created`)**: Devuelve el objeto del horario recién creado.
    ```json
    {
      "id": 2,
      "time": "14:00",
      "amount": 100,
      "substance": "Water",
      "pet": "Perro",
      "enabled": true
    }
    ```

### **`PUT /api/schedules/:id`**

Actualiza un horario existente por completo. También se usa para cambiar el estado `enabled`.

*   **Autenticación**: Requerida.
*   **Cuerpo de la Petición**:
    ```json
    {
        "time": "15:00",
        "amount": 120,
        "pet": "Gato",
        "enabled": false 
    }
    ```
*   **Respuesta Exitosa (`200 OK`)**: Devuelve el objeto del horario completo y actualizado.

### **`DELETE /api/schedules/:id`**

Elimina un horario.

*   **Autenticación**: Requerida.
*   **Respuesta Exitosa (`204 No Content`)**.

---

## 5. Perfiles de Mascotas

Gestiona los perfiles de las mascotas del usuario.

### **`GET /api/pets`**

Obtiene todos los perfiles de mascotas.

### **`POST /api/pets`**

Crea un nuevo perfil de mascota.
*   **Cuerpo de la Petición**: `{ "name": "Rex", "type": "Perro", "weight": 5, "breed": "Chihuahua" }`
*   **Respuesta Exitosa (`201 Created`)**: Devuelve el perfil completo con su nuevo `id`.

### **`PUT /api/pets/:id`**

Actualiza un perfil de mascota existente.
*   **Cuerpo de la Petición**: `{ "name": "Rexy", "type": "Perro", "weight": 5.5, "breed": "Chihuahua" }`
*   **Respuesta Exitosa (`200 OK`)**: Devuelve el perfil completo actualizado.

### **`DELETE /api/pets/:id`**

Elimina un perfil de mascota.
*   **Respuesta Exitosa (`204 No Content`)**.

---

## 6. Historial de Dispensación

Para obtener el historial, este puede ser un endpoint dedicado o incluido en una carga inicial.

### **`GET /api/history`**

Recupera las últimas 20 entradas del historial de dispensación.

*   **Autenticación**: Requerida.
*   **Respuesta Exitosa (`200 OK`)**:
    ```json
    [
        { 
            "id": 1, 
            "time": "2024-07-28T10:30:00.000Z",
            "amount": 150, 
            "substance": "Water",
            "type": "Manual", 
            "pet": "Perro"
        }
    ]
    ```