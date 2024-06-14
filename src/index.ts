import express, {Application} from 'express'
import ueroutes from './Routers/UERouter';
import usaroutes from './Routers/UERouter';



class Server {
    public app: Application

    //Constructor 
    constructor() {
		this.app = express()
		this.config()
		this.routes()
	}

    //Configuración del puerto 
    config(): void {
		this.app.set('port', process.env.PORT || 3000)
		this.app.use(express.json())
	}

    //Configuración de las rutas de la API
    routes(): void {
        this.app.use("/api/tasadolar",usaroutes);
        this.app.use("/api/tasaeuro",ueroutes);
    }

    //Comenzar a correr el servidor en el puerto 3000
    start(): void {
		this.app.listen(this.app.get('port'), () => {
			console.log('Server on port', this.app.get('port'))
			console.log('Visit', 'http://localhost:' + this.app.get('port'), 'to check')
		}) 
	}
}

const server = new Server()
server.start()
