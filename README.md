# Practica-Tasa-de-Cambios

Este proyecto se encarga de consultar las tasas de cambio de Dólares Americanos (USD) y Euros (EUR) desde el Banco de México, almacenarlas en una base de datos PostgreSQL y mostrarlas en consola.

## Especificaciones del proyecto 
### Especificaciones de la Base de Datos
El proyecto utiliza una base de datos PostgreSQL con las siguientes especificaciones:
- Nombre de usuario: mario
- contraseña: x
- Nombre de la Base de Datos: prueba
- Tabla: tasadecambio
- Campos:
- fecha (tipo: DATE): La fecha en que se registró la tasa de cambio.
- tipo_de_cambio (tipo: VARCHAR): El tipo de tasa de cambio (euro o dolar).
- tasa (tipo: NUMERIC): La tasa de cambio registrada.
  
### Especificaciones de las Rutas

Crear y Guardar la Tasa de Cambio del Euro:
- Ruta: http://localhost:3000/api/tasaeuro/createeuro
- Método: POST
- Descripción: Consulta la tasa de cambio del euro desde el Banco de México y la guarda en la base de datos si aún no se ha registrado para la fecha actual.
Mostrar la Tasa de Cambio del Euro:
- Ruta: http://localhost:3000/api/tasaeuro/showeuro
- Método: GET
- Descripción: Muestra la tasa de cambio del euro registrada más reciente desde la base de datos.
Crear y Guardar la Tasa de Cambio del Dólar:
- Ruta: http://localhost:3000/api/tasaeuro/createdolar
- Método: POST
- Descripción: Consulta la tasa de cambio del dólar desde el Banco de México y la guarda en la base de datos si aún no se ha registrado para la fecha actual.
Mostrar la Tasa de Cambio del Dólar:
- Ruta: http://localhost:3000/api/tasaeuro/showdolar
- Método: GET
- Descripción: Muestra la tasa de cambio del dólar registrada más reciente desde la base de datos.

### Estructura del Proyecto
- src/index.ts: Punto de entrada principal del servidor.
- src/routes.ts: Definición de las rutas de la API.
- src/db.ts: Configuración de la conexión a la base de datos.
- src/controllers/UEController.ts: Controlador para manejar las operaciones relacionadas con la tasa de cambio del euro.
- src/controllers/USDController.ts: Controlador para manejar las operaciones relacionadas con la tasa de cambio del dólar.

## Instrucciones para Ejecutar el Programa

Para correr el programa, primero asegúrate de tener todas las dependencias instaladas. Luego, ejecuta el siguiente comando:

```bash
npx ts-node src/index.ts

