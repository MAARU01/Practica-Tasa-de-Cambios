import { Request, Response } from 'express'
import { API_URL_EU, DataFromBanxico, formatoFecha} from '../keys'
import pool from '../db'

class USAController {
    //Función que crea un nuevo valor en la BD
    public async createdolar (req:Request, res: Response): Promise<void>{
        try {
            const hoy = formatoFecha(new Date());
            const consultaselect = await pool.query('SELECT * FROM tasadecambios WHERE fecha = $1 AND tipo_de_cambio = $2', [hoy,'dolar']);
            //Comprueba si es la primera vez que inserta los datos del día 
            if (consultaselect.rows.length > 0) {
                console.log ("Ya se ha hecho la consulta del día")
            } else {
              const apiUrl = `${API_URL_EU}${hoy}/${hoy}`;
              const data = await DataFromBanxico(apiUrl);
              if (data !== null) {
                const { fecha, dato } = data;
                const resp = await pool.query('INSERT INTO (fecha, tipo_de_cambio, tasa) VALUES ($1, $2, $3)', [fecha, 'dolar', dato]);
                res.json (resp)
                console.log ("Se han guardado exitosamente los datos")
              } else {
                res.status(500).json({ message: 'Error al obtener la tasa de cambio dexl euro desde Banxico' });
              }
            }
          } catch (error) {
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
    //Función que muestra la cantidad de la tasa del dolar y la fecha de su valor 
    public async showdolar (req:Request, res: Response): Promise<void>{
        try {
            const consulta  = await pool.query('SELECT * FROM tasadecambios WHERE tipo = $1 ORDER BY fecha DESC', ['dolar']);
            //Comprueba si hay datos en la bd 
            if (consulta.rows.length > 0) {
              console.log(`La tasa del euro es de ${consulta.rows[0].tasa} MXN a la fecha de ${consulta.rows[0].fecha}`);
              res.json (consulta)
              res.status(200).json({ message: `La tasa del euro es de ${consulta.rows[0].tasa} MXN a la fecha de ${consulta.rows[0].fecha}` });
            } else {
              res.status(404).json({ message: 'No se encontraron datos de la tasa de cambio del euro en la base de datos.' });
            }
          } catch (error) {
            console.error('Error en la funcion showEuro:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
          }
    }
    
}
export const usaController = new USAController()