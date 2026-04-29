# INVERSIONES_BACKEND

Backend API construido con Node.js, Express y TypeScript para gestionar usuarios, fondos de inversión y la relación entre usuarios y fondos. El proyecto se conecta a una base de datos MySQL mediante un pool de conexiones y utiliza Zod para validar esquemas de entrada.

## Qué incluye el proyecto

La estructura del código está organizada por capas:

- `src/config`: configuración de base de datos.
- `src/controllers`: recibe las peticiones HTTP y coordina la respuesta.
- `src/routes`: define los endpoints disponibles.
- `src/schemas`: esquemas de validación con Zod.
- `src/services`: contiene la lógica de negocio y acceso a datos.
- `src/types`: tipos TypeScript del dominio.
- `src/app.ts`: configuración principal de Express.
- `index.ts`: punto de arranque del servidor HTTP.

Las rutas que están activas actualmente son:

- `/fondos`
- `/usuarios`
- `/fondos-usuario`

La ruta de `inversiones` existe en el código como base, pero no está montada en la aplicación principal en este momento.

## Cómo funciona

1. `index.ts` carga las variables de entorno con `dotenv`, crea el servidor HTTP y abre la conexión a MySQL.
2. `src/app.ts` configura Express, habilita `cors`, registra `express.json()` y monta las rutas principales.
3. Cada endpoint delega la lógica a su controlador correspondiente.
4. Los controladores usan servicios y esquemas para validar datos y ejecutar operaciones sobre la base de datos.
5. La aplicación responde con JSON y tiene manejo global de errores y una respuesta `404` para rutas no encontradas.

## Requisitos

- Node.js 18 o superior.
- Una base de datos MySQL accesible desde la aplicación.

## Variables de entorno

El proyecto usa estas variables en la conexión a la base de datos y en el puerto del servidor:

- `PORT`
- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `DB_PORT`

Ejemplo de archivo `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=tu_base_de_datos
DB_PORT=3306
```

## Instalación

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

Este comando levanta el proyecto con `nodemon` apuntando a `index.ts`.

## Compilar el proyecto

```bash
npm run build
```

La compilación genera la salida en la carpeta `dist/`.

## Ejecutar en producción

```bash
npm run start
```

Este comando ejecuta `dist/index.js`, por lo que primero debes haber compilado el proyecto.

## Endpoints disponibles

### Fondos

- `GET /fondos`
- `POST /fondos`
- `GET /fondos/:id`
- `PUT /fondos/:id`
- `DELETE /fondos/:id`

### Usuarios

- `GET /usuarios`
- `POST /usuarios`
- `GET /usuarios/:documento`
- `PUT /usuarios/:documento`

### Fondos por usuario

- `GET /fondos-usuario`
- `POST /fondos-usuario/crear`
- `GET /fondos-usuario/usuario/:usuario_documento`
- `GET /fondos-usuario/:id`
- `PUT /fondos-usuario/:id`
- `DELETE /fondos-usuario/:id`
- `GET /fondos-usuario/simular/:id`

## Estructura general

```text
index.ts
src/
  app.ts
  config/
  controllers/
  routes/
  schemas/
  services/
  types/
```

## Notas

- La aplicación permite CORS desde cualquier origen.
- Si la base de datos no responde, el servidor seguirá levantando el proceso, pero registrará el error de conexión en consola.
- La validación de entrada y la lógica de negocio están separadas para facilitar el mantenimiento.