import { Router } from 'express'
import {ueController} from '../Controllers/UEController'
class UERouter{
    public router: Router = Router ()

    constructor() {
		this.config()
	}
    //Configuración de rutas de las peticiones 
    config(): void {
        this.router.post('/createeuro', ueController.createeuro);
        this.router.get('/showeuro', ueController.showeuro);
    }
}

const ueRouter = new UERouter()
export default ueRouter.router