import { Request, Response } from 'express'
import pool from '../db'
import {API_URL_UE,DataFromBanxico, formatoFecha} from '../keys'


class UEController {
    //Función que crea un nuevo valor en la BD
    public async createeuro (req:Request, res: Response): Promise<void>{
        try {
            const hoy = formatoFecha(new Date());
            const consultaselect = await pool.query('SELECT * FROM tasadecambios WHERE fecha = $1 AND tipo_de_cambio = $2', [hoy,'euro']);
            //Comprueba si es la primera vez que va insertar los datos 
            if (consultaselect.rows.length > 0) {
                console.log ("Ya se ha hecho la consulta del día")
            } else {
              //Realiza el insert en la BD
              const apiUrl = `${API_URL_UE}${hoy}/${hoy}`;
              const data = await DataFromBanxico(apiUrl);
              if (data !== null) {
                const { fecha, dato } = data;
                const resp = await pool.query('INSERT INTO tasadecambios (fecha, tipo_de_cambio, tasa) VALUES ($1, $2, $3)', [fecha, 'euro', dato]);
                console.log ("Se han guardado exitosamente los datos")
                res.status(201).json({ message: 'Se han guardado exitosamente los datos' });
              } else {
                res.status(500).json({ message: 'Error al obtener la tasa de cambio del euro desde Banxico' });
              }
            }
          } catch (error) {
            res.status(500).json({ message: 'Error interno del servidor' });
            console.error('Error en la función createeuro:', error);
        }
    }

    //Función que muestra la cantidad de la tasa del euro y la fecha de su valor 
    public async showeuro (req:Request, res: Response): Promise<void>{
        try {
            const consulta  = await pool.query('SELECT * FROM tasadecambios WHERE tipo = $1 ORDER BY fecha DESC', ['euro']);
            //Comprueba si existen datos en la BD 
            if (consulta.rows.length > 0) {
              console.log(`La tasa del euro es de ${consulta.rows[0].tasa} MXN a la fecha de ${consulta.rows[0].fecha}`);
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
export const ueController = new UEController()