# Usa una imagen ligera de Node.js
FROM node:16-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm install --only=production

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto y el puerto por defecto
EXPOSE ${PORT}
EXPOSE ${PORT_DEFAULT}

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]
