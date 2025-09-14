# Etapa 1: Construir la aplicación
FROM node:20-alpine AS build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Instalar tipos de Node y TypeScript (necesarios para 'process' en vite.config.ts)
RUN npm install --save-dev typescript @types/node

# Copiar el resto del código fuente
COPY . .

# Establecer argumento de compilación para API_KEY
ARG API_KEY
ENV VITE_API_KEY=$API_KEY

# Construir la app para producción
RUN npm run build

# Etapa 2: Servir la app con Nginx
FROM nginx:1.25-alpine

# Copiar archivos compilados desde etapa de build
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
