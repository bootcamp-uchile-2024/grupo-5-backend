# 🐾 Petrópolis Backend

Este proyecto es un backend basado en Node.js y Docker. Se proporciona un entorno para desarrollo y producción utilizando Docker y Docker Compose.

## 📝 Tabla de Contenidos

- [🐾 Petrópolis - API](#-petropolis---api)
1. 📋 [Requisitos previos](#1---requisitos-previos)
2. 🛠️ [Instalación](#2---instalación)
   - 2.1. [Clona el repositorio](#21-clona-el-repositorio)
   - 2.2. [Entra en el directorio del proyecto](#22-entra-en-el-directorio-del-proyecto)
   - 2.3. [Instala las dependencias](#23-instala-las-dependencias)
3. ⚙️ [Configuración](#3---configuración)
4. 🛠️ [Ejecución](#4---ejecución)
   - 4.1. 👨‍💻 [Modo Desarrollo](#41-modo-desarollo)
     - a. [Crear el archivo `.env.desarrollo`](#a-crear-el-archivo-envdesarrollo)
     - b. [Construir y levantar los contenedores](#b-construir-y-levantar-los-contenedores)
     - c. [Verificar los contenedores](#c-verificar-los-contenedores)
     - d. [Detener los contenedores](#d-detener-los-contenedores)
   - 4.2. 📦 [Modo Producción](#42-modo-producción)
     - a. [Crear el archivo `.env.produccion`](#a-crear-el-archivo-envproduccion)
     - b. [Construir y levantar los contenedores](#b-construir-y-levantar-los-contenedores-1)
     - c. [Verificar los contenedores](#c-verificar-los-contenedores-1)
     - d. [Detener los contenedores](#d-detener-los-contenedores-1)
   - 4.3. [Ejecución local sin Docker (Opcional)](#43-ejecución-local-sin-docker-opcional)
5. 🔀 [Estructura del Proyecto](#5---estructura-del-proyecto)
6. 🤖 [Documentación de la API](#6---documentación-de-la-api)
   - 6.1. [Inicia el proyecto](#61-inicia-el-proyecto)
   - 6.2. [Accede a Swagger en tu navegador](#62-accede-a-swagger-en-tu-navegador)
7. 👷‍♂️ [Flujo de Trabajo para Desarrollo](#7--flujo-de-trabajo-para-desarrollo)
   - 7.1. [Flujo de Trabajo](#71-flujo-de-trabajo)
   - 7.2. [Branch Principal](#72-branch-principal)
   - 7.3. [Creación de Branches para Desarrollo](#73-creación-de-branches-para-desarrollo)
   - 7.4. [Nomenclatura de las Ramas](#74-nomenclatura-de-las-ramas)
8. 📞 [Contacto](#8---contacto)
9. 📝 [Notas adicionales](#9---notas-adicionales)


[![Ir Arriba](https://img.shields.io/badge/Ir_Arriba-green?style=for-the-badge&logo=arrow-up&logoColor=white)](#--Tabla-de-Contenidos)

## 1. 📋 Requisitos previos 


Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu máquina local:

![Nest CLI](https://img.shields.io/badge/NestCLI-8.2.6-red?logo=nestjs&logoColor=white)

Para instalar `Nest Cli` correr este comando: 

  ```bash
  npm i -g @nestjs/cli
  ```

[![Node.js](https://img.shields.io/badge/Node.js->=20.13.1-green?logo=node.js&logoColor=white)](https://nodejs.org/)

[![Docker](https://img.shields.io/badge/Docker-20.10.7-blue?logo=docker&logoColor=white)](https://www.docker.com/)

[![Docker Compose](https://img.shields.io/badge/Docker--Compose-1.29.2-blue?logo=docker&logoColor=white)](https://docs.docker.com/compose/)

## 2. 🛠️ Instalación
Ejecuta los siguientes comandos instalar el proyecto en local:

### 2.1. Clona el repositorio:

```bash
git clone https://github.com/usuario/proyecto.git
```
### 2.2. Entra en el directorio del proyecto:

```bash
cd nombre-del-proyecto
```
### 2.3. Instala las dependencias:

```bash
npm install
```


## 3. ⚙️ Configuración

Este proyecto utiliza archivos `.env` para manejar las variables de entorno. Encontrarás dos archivos de configuración que puedes utilizar dependiendo del entorno:

  📄`.env.desarrollo`: Contiene las variables de entorno para el ambiente de **desarrollo**.
  
    ```plaintext
    PORT=3000
    NODE_ENV=desarrollo
    ```
  📄`.env.produccion`: Contiene las Variables de entorno para el ambiente de **producción**.
  
    ```plaintext
    PORT=8080
    NODE_ENV=produccion
    ```

## 4. 🛠️ Ejecución

A continuación se indican los pasos para la ejecución del proyecto en modo `desarrollo` y `producción`.

### 4.1. 👨‍💻 Modo Desarollo 
Para levantar el proyecto en un ambiente en modo **desarrollo**, sigue los siguientes pasos:

#### a. Crear el archivo `.env.desarrollo`

Copia el contenido del ejemplo de `.env.desarrollo` y guárdalo como `.env.desarrollo` en la raíz del proyecto. Asegúrate de ajustar las variables según tu configuración local.

#### b. Construir y levantar los contenedores

Utiliza el archivo `docker-compose.yml` para levantar los servicios de desarrollo:

```bash
docker-compose --file docker-compose.yml --env-file .env.desarrollo up
```
El comando levanta los contenedores definidos en docker-compose.yml usando las variables de entorno del archivo `.env.desarrollo`.
  
La aplicación estará corriendo en `http://localhost:3000`.

#### c. Verificar los contenedores

Puedes verificar que los contenedores estén corriendo con el siguiente comando:

```bash
docker ps
```

#### d. Detener los contenedores
Para detener los contenedores cuando termines, ejecuta:

```bash
docker-compose -f docker-compose.dev.yml down
```

### 4.2. 📦 Modo Producción

Para levantar el proyecto en modo **producción**, sigue los siguientes pasos:

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
#### d. Detener los contenedores
Para detener los contenedores cuando termines, ejecuta:

```bash
docker-compose -f docker-compose.prod.yml down
```

### 4.2. Ejecución local sin Docker (Opcional)

Si prefieres ejecutar el backend sin Docker en desarrollo, asegúrate de tener`Node.js` instalado y seguir los siguientes pasos:

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

Esto levantará el servidor en el puerto **3000** por defecto.

## 5. 🔀 Estructura del Proyecto

A continuación la estructura del proyecto: 

```plaintext
SRC/
│   app.controller.ts
│   app.module.ts                        # Módulo raíz de la aplicación
│   app.service.ts                         
│   main.ts                              # Punto de entrada del servidor
│
├───commons                              # Contiene los archivos asociados a la configuración, filtros, interceptores, middleware, validadores 
│   ├───config
│   │       validation.config.ts
│   │
│   ├───filters
│   │       http-exception.filter.ts
│   │
│   ├───interceptors
│   │       logging.interceptor.ts
│   │
│   ├───middleware
│   │       logging.middleware.ts
│   │
│   └───validator
│           is-rut.constraint.ts
│           is-rut.decorator.ts
│
├───equipo                               # Módulo con información del equipo
│   │   equipo.controller.spec.ts
│   │   equipo.controller.ts
│   │   equipo.module.ts
│   │   equipo.service.spec.ts
│   │   equipo.service.ts
│   │
│   ├───dto                              # Módulo DTO del equipo
│   │       create-equipo.dto.ts
│   │       update-equipo.dto.ts
│   │
│   └───entities                         # Módulo entidades del equipo
│           equipo.entity.ts
│
├───mascotas                             # Módulo de mascotas
│   │   mascotas.controller.ts
│   │   mascotas.module.ts
│   │   mascotas.service.ts
│   │
│   ├───dto                              # Módulo DTO de mascotas
│   │       create-mascota.dto.ts
│   │       delete-mascota.dto.ts
│   │       read-mascota.dto.ts
│   │       update-mascota.dto.ts
│   │
│   └───entities                         # Módulo entidades de mascotas
│           mascota.entity.ts
│
├───productos                             # Módulo de productos
│   │   productos.controller.ts
│   │   productos.module.ts
│   │   productos.service.ts
│   │
│   ├───dto                              # Módulo de productos
│   │       create-producto.dto.ts
│   │       read-catalogo-productos.dto.ts
│   │       read-detalle-producto.dto.ts
│   │       update-producto.dto.ts
│   │
│   └─
```

## 6 🤖 Documentación de la API [![Swagger](https://img.shields.io/badge/Swagger--blue?logo=swagger&logoColor=white)](https://swagger.io/)

Swagger está habilitado en este proyecto. Puedes acceder a la documentación de la API después de iniciar el
servidor con estos pasos. 

### 6.1. Inicia el proyecto:
Para iniciar el proyecto debe correr el siguiente comando: 

```bash
	npm run start:prod
```
### 6.2. Accede a Swagger en tu navegador:
Para acceder a la documentación debes copiar las siguientes URL en tu navegador: 

#### 6.2.1. Documentación API Usuario: 
```
	http://localhost:8080/api/usuario
```
#### 6.2.2. Documentación API Mascota: 
```
	http://localhost:8080/api/mascota
```
#### 6.2.3. Documentación API Producto: 
```
	http://localhost:8080/api/producto
```

## 7. 👷‍♂️Flujo de Trabajo para Desarrollo
A continuación el flujo de trabajo que se debe seguir para realizar
cambios sobre este  proyecto.
### 7.1. Flujo de Trabajo
En este proyecto, seguimos un flujo de trabajo basado en
ramas para el desarrollo de nuevas características y
corrección de errores. A continuación, se detalla cómo crear
nuevas ramas, integrarlas y desplegar a producción.

#### 7.1.1. Branch Principal
La rama principal de este proyecto es main. Esta rama
contiene la última versión estable del proyecto y no debe
modificarse directamente.
#### 7.1.1.  Creación de Branches para Desarrollo
Cuando se desarrolla una nueva funcionalidad o se corrige un
error, es necesario crear una rama específica para ello,
derivada de main.
#### 7.1.1.  Nomenclatura de las Ramas
Ramas para nuevas funcionalidades:

- Ramas para nuevas funcionalidades: `Taller + Numero de la presentacion a entregar (Taller_6)`

## 8. 📞 Contacto 

Si tienes alguna pregunta, no dudes en ponerte en contacto con nosotros a través de:

- 📧 Email: contacto@petropolis.com
- 📞 Teléfono: +562 2999 9000
- 🌐 Sitio web: [www.petropolis.com](http://www.petropolis.com)
  
- Desarrolladores:
  - [![Rodrigo Alcayaga](https://img.shields.io/badge/Rodrigo_Alcayaga-000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ralcayaga)

  - [![Ányelo Flores](https://img.shields.io/badge/Anyelo_Flores-000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/anyelofc)

  - [![Andree Barait](https://img.shields.io/badge/Andree_Barait-000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/bananin8)

  - [![Mauricio Piña](https://img.shields.io/badge/Mauricio_Pina-000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mauriciopinavalenzuela)

  - [![Lorenzo Baeza](https://img.shields.io/badge/Lorenzo_Baeza-000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/LENZOZ)


## 📝 Notas adicionales 

- Si tienes algún problema o pregunta, no dudes en abrir un **issue** en el repositorio.
- Asegúrate de mantener las dependencias actualizadas con `npm install` en cada actualización del proyecto.
