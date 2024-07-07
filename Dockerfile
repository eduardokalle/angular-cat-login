# Etapa de construcción
FROM node:18 AS build

WORKDIR /app

# Copiar archivos de la aplicación Angular
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build -- --output-path=dist

# Etapa de producción
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Copiar archivo de configuración Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
