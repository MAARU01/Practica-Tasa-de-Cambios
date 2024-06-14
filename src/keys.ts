import axios from 'axios';
//Tokeyn y URL
export const BANXICO_TOKEN = '0ac297739cd3e3ca0bf9494c821804c12fad2dfa3d2ada17451e7aafe625f99d';
export const API_URL_EU = 'https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718/datos/';
export const API_URL_UE = 'https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF46410/datos/';

//METODOS DE BANXICO Y FECHA
export type BanxicoResponse = {
    fecha: string;
    dato: string;
};
export const DataFromBanxico = async (apiUrl: string): Promise<BanxicoResponse | null> => {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'Bmx-Token': BANXICO_TOKEN,
          'Content-Type': 'application/json',
        },
      });
      const serieData = response.data.bmx.series[0].datos[0];
      return { fecha: serieData.fecha, dato: serieData.dato };
    } catch (error) {
      console.error('Error al obtener datos de Banxico:', error);
      return null;
    }
};

export const formatoFecha = (date: Date): string => {
    const anio = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const dia = String(date.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  };