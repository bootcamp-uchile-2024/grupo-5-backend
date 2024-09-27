# 🐾 Petrópolis Backend

[![Node.js](https://img.shields.io/badge/Node.js-14.15.1-green?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-20.10.7-blue?logo=docker&logoColor=white)](https://www.docker.com/)
[![Docker Compose](https://img.shields.io/badge/Docker--Compose-1.29.2-blue?logo=docker&logoColor=white)](https://docs.docker.com/compose/)
[![Swagger](https://img.shields.io/badge/Swagger-API-green?logo=swagger&logoColor=white)](https://swagger.io/)

Este proyecto es un backend basado en Node.js y Docker. Se proporciona un entorno para desarrollo y producción utilizando Docker y Docker Compose.

## 🚀 Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu máquina local:

- [Node.js](https://nodejs.org/) (para desarrollo local sin Docker)
- [Docker](https://www.docker.com/get-started) (para entornos Dockerizados)
- [Docker Compose](https://docs.docker.com/compose/install/) (para gestionar los servicios Docker)
- Un editor de texto como [Visual Studio Code](https://code.visualstudio.com/) o similar.

## ⚙️ Configuración de las variables de entorno

Este proyecto utiliza archivos `.env` para manejar las variables de entorno. Hay dos archivos de configuración que puedes utilizar dependiendo del entorno:

- `.env.desarrollo`: Variables de entorno para el ambiente de **desarrollo**.
- `.env.produccion`: Variables de entorno para el ambiente de **producción**.

### Ejemplo de archivo `.env.desarrollo`

```plaintext
NODE_ENV=desarrollo
PORT=3000

```
### Ejemplo de archivo `.env.produccion`

```plaintext
NODE_ENV=producción
PORT=80
```

### 🛠️ Configuración y ejecución del proyecto
### 1️⃣ Clonar el repositorio

Clona este repositorio a tu máquina local:

```bash
git clone https://github.com/bootcamp-uchile-2024/grupo-5-backend.git
cd grupo-5-backend
```

### 2️⃣ Configuración para Desarrollo

Para levantar el proyecto en un ambiente de **desarrollo**, sigue los siguientes pasos:

#### a. Crear el archivo `.env.desarrollo`

Copia el contenido del ejemplo de `.env.desarrollo` y guárdalo como `.env.desarrollo` en la raíz del proyecto. Asegúrate de ajustar las variables según tu configuración local.

#### b. Construir y levantar los contenedores

Utiliza el archivo `docker-compose.dev.yml` para levantar los servicios de desarrollo:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

Este comando hará lo siguiente:

- Construirá la imagen de Docker a partir del `Dockerfile`.
- Levantará los servicios necesarios, como la base de datos (MongoDB, PostgreSQL, etc.) y el backend.
  
La aplicación estará corriendo en `http://localhost:3000`.

#### c. Verificar los contenedores

Puedes verificar que los contenedores estén corriendo con el siguiente comando:

```bash
docker ps
```

Para detener los contenedores cuando termines, ejecuta:

```bash
docker-compose -f docker-compose.dev.yml down
```

### 3️⃣ Configuración para Producción

Para levantar el proyecto en un ambiente de **producción**, sigue los siguientes pasos:

#### a. Crear el archivo `.env.produccion`

Copia el contenido del ejemplo de `.env.produccion` y guárdalo como `.env.produccion` en la raíz del proyecto. Asegúrate de ajustar las variables según tu configuración de producción.

#### b. Construir y levantar los contenedores

Utiliza el archivo `docker-compose.prod.yml` para levantar los servicios de producción:

```bash
docker-compose -f docker-compose.prod.yml up --build -d
```

Este comando levantará los servicios en segundo plano (`-d` flag) y expondrá la aplicación en el puerto configurado para producción, generalmente `8080`.

#### c. Verificar los contenedores

Al igual que en desarrollo, puedes verificar los contenedores con:

```bash
docker ps
```

Para detener los contenedores cuando termines, ejecuta:

```bash
docker-compose -f docker-compose.prod.yml down
```

### 4️⃣ Ejecución local sin Docker (Opcional)

Si prefieres ejecutar el backend sin Docker en desarrollo, asegúrate de tener Node.js instalado y sigue estos pasos:

#### a. Instalar dependencias

```bash
npm install
```

#### b. Crear archivo `.env.desarrollo`

Asegúrate de crear un archivo `.env.desarrollo` en la raíz del proyecto con las variables necesarias.

#### c. Ejecutar la aplicación

```bash
npm run start:dev
```

Esto levantará el servidor en el puerto 3000 por defecto.

### 5️⃣ Documentación de la API (Swagger)

La documentación de la API está disponible en la ruta `/api-docs` si Swagger está habilitado. Visita:

```
http://localhost:3000/api
```

## 📦 Publicación de la Imagen en Docker Hub

Para crear y subir una imagen en Docker Hub, sigue estos pasos:

### a. Autenticarse en Docker Hub

```bash
docker login
```

### b. Crear la imagen

```bash
docker build -t tu_usuario/tu_proyecto_backend:lates .
```

### c. Subir la imagen a Docker Hub

```bash
docker push tu_usuario/tu_proyecto_backend:latest
```

### d. Documentación de Docker Hub

No olvides actualizar la descripción y documentación de la imagen en Docker Hub.

---

## 📝 Notas adicionales

- Si tienes algún problema o pregunta, no dudes en abrir un **issue** en el repositorio.
- Asegúrate de mantener las dependencias actualizadas con `npm install` en cada actualización del proyecto.
