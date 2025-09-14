Asunto: Guía para Conectar el Backend a la Aplicación PetFlow
Hola equipo de backend,
Esta es una guía para construir el "cerebro" de nuestra aplicación PetFlow. La aplicación que ven (el frontend) ya está lista para conectarse y mostrar los datos reales que ustedes van a gestionar.
La idea es que ustedes construyan una API (un conjunto de direcciones web a las que nuestra app pueda hacerle peticiones) que reemplace todos los datos de prueba que tenemos actualmente.
Aquí les explicamos qué necesita la aplicación, pantalla por pantalla:
1. El Login de Usuario
Qué ve el usuario: La pantalla de inicio de sesión.
Archivo del frontend involucrado: views/LoginView.tsx.
Qué necesita hacer el backend: Crear una dirección web (un endpoint), por ejemplo /api/login, que reciba un email y una contraseña. Si son correctos, debe devolvernos una "llave de acceso" (un token JWT) para que sepamos que el usuario ha iniciado sesión.
2. El Dashboard Principal (la pantalla más importante)
Qué ve el usuario: La pantalla principal con el nivel de comida, los horarios y el historial.
Archivo del frontend involucrado: views/DashboardView.tsx.
Qué necesita hacer el backend: Crear una dirección web, por ejemplo /api/dashboard, que cuando la app la consulte, le devuelva toda la información principal de una sola vez:
El nivel actual del dispensador (ej: 73).
La lista de horarios programados (hora, cantidad, si está activado o no).
El historial de las últimas veces que se dispensó comida.
Nota: Actualmente, todos estos datos están como "datos falsos" en nuestro archivo App.tsx. El objetivo es que el backend sea la única fuente real de esta información.
3. Dispensar Comida Manualmente
Qué ve el usuario: El panel "Dispensar Ahora" en el Dashboard.
Archivo del frontend involucrado: components/ControlPanel.tsx.
Qué necesita hacer el backend: Crear una dirección, por ejemplo /api/dispense, que la app pueda "llamar" cuando el usuario pulse el botón. El backend debe entonces:
Guardar que se ha dispensado una nueva ración en la base de datos.
Restar esa cantidad del nivel total de comida.
Devolverle a la app el nuevo nivel de comida para que se actualice la barrita de progreso.
4. Activar o Desactivar Horarios
Qué ve el usuario: Los interruptores (switches) al lado de cada horario, tanto en el Dashboard como en la pantalla de "Horarios".
Archivos del frontend involucrados: components/ScheduleList.tsx y views/SchedulesView.tsx.
Qué necesita hacer el backend: Crear una dirección para cada horario, por ejemplo /api/schedules/1/toggle. Cuando el usuario mueva el interruptor, la app llamará a esa dirección y el backend deberá cambiar el estado de ese horario (de activado a desactivado, o viceversa) en la base de datos.
5. El Planificador de Comidas con IA (Muy Importante)
Qué ve el usuario: La pantalla "Planificador IA" donde introduce los datos de su mascota.
Archivos del frontend involucrados: views/MealPlannerView.tsx y services/geminiService.ts.
Qué necesita hacer el backend: Por seguridad, la clave secreta de la IA de Google no puede estar en nuestra aplicación visible. Por eso, el backend debe actuar como un intermediario seguro.
Crear una dirección, por ejemplo /api/generate-plan.
Nuestra app le enviará los datos de la mascota (peso, edad, etc.) a esa dirección.
El backend (que tendrá la clave secreta guardada de forma segura) le preguntará a la IA de Google.
Finalmente, el backend le enviará la respuesta de la IA a nuestra app.
Nota: La lógica que está ahora en services/geminiService.ts debe ser replicada en el backend.
6. Perfiles de las Mascotas
Qué ve el usuario: La pantalla "Perfiles", que muestra una lista de sus mascotas.
Archivo del frontend involucrado: views/PetProfilesView.tsx.
Qué necesita hacer el backend: Crear una dirección, por ejemplo /api/pets, que devuelva la lista de todas las mascotas que le pertenecen al usuario que ha iniciado sesión.
En resumen: Cada acción en la aplicación necesita "hablar" con una dirección web que ustedes crearán. Nosotros nos encargaremos de conectar cada botón y cada pantalla a esas direcciones.
