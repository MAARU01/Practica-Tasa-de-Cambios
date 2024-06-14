import { Pool } from 'pg';

// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: 'mario',
  host: 'localhost',
  database: 'prueba',
  password: 'x',
  port: 5432, // Puerto por defecto de PostgreSQL
});

// Manejo de errores en la conexión a la base de datos
pool.on('error', (err, client) => {
  console.error('Error inesperado en el cliente de la base de datos', err);
  process.exit(-1);
});
export default pool