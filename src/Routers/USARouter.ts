import { Router } from 'express'
import {usaController} from '../Controllers/USAController'


class USARouter{
    public router: Router = Router ()

    constructor() {
		this.config()
	}
    //Configuración de rutas de las peticiones 
    config(): void {
        this.router.post('/createdolar', usaController.createdolar);
        this.router.get('/showdolar', usaController.showdolar);
    }
}

const usaRouter = new USARouter()
export default usaRouter.router