# Usa una imagen ligera de Node.js
FROM node:16-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json /app

# Instalar solo dependencias de producción
RUN npm install --only=production

# Instalar solo dependencias de desarrollo
RUN npm install --only=development

# Copiar el resto del código de la aplicación
COPY dist/src /app/dist

# Exponer el puerto y el puerto por defecto
EXPOSE ${PUERTO}
EXPOSE ${AMBIENTE}

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]
