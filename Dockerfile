# Etapa 1: build de la app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: imagen final optimizada
FROM node:20-alpine

WORKDIR /app

# Solo dependencias necesarias para producción
COPY package*.json ./
RUN npm install --only=production

# Copiamos solo el resultado del build
COPY --from=builder /app/dist ./dist

# Copiamos también los archivos de configuración si los necesitas
COPY --from=builder /app/.env .env

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/main.js"]
