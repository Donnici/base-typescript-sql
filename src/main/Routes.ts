import Express, {
	Application,
	NextFunction,
	Request,
	Response,
	Router
} from 'express';
import SwaggerJSDoc from 'swagger-jsdoc';
import SwaggerUi from 'swagger-ui-express';
import { LANG } from '../config/const';
import { swaggerDefinition } from '../docs/swaggerJSON';
import { IObjectRoute } from '../interfaces';
import messages from '../locale/messages';
import Default from '../resources/default/DefaultController';

class Routes {
	private router: Router;
	private app: Application;
	private swaggerSpec: any;

	constructor(app: Application) {
		this.app = app;
		this.router = Express.Router();
		this.swaggerSpec = SwaggerJSDoc({
			swaggerDefinition,
			apis: ['**/*.ts']
		});
		this.defaultRoutes();
	}

	public getRoutes() {
		return this.router;
	}

	public defaultRoutes() {
		const DefaultRoutes: IObjectRoute[] = new Default().getRoutes();
		for (const route of DefaultRoutes) {
			this.registerPublicRoute('', route);
		}
		this.app.get('/swagger.json', this.swaggerJSON);
		this.app.use(
			'/api-docs',
			SwaggerUi.serve,
			SwaggerUi.setup(this.swaggerSpec)
		);
	}

	private registerPublicRoute(prefix: string, route: IObjectRoute) {
		const url = `${prefix}${route.url}`;
		(this.router as any)[route.method](url, route.controllerRoute);
	}


	public async registerResourceRoutes(
		routers: IObjectRoute[]
	): Promise<void> {
		for (const router of routers) {
				const vs = router.version && router.version !== ''
					? '/' + router.version
					: '';
			this.registerPublicRoute('/api' + vs, router);
		}
	}

	public swaggerJSON = (request: Request, response: Response) => {
		return response.json(this.swaggerSpec);
	}

	public error404(request: Request, response: Response, next: NextFunction) {
		return response.status(404).json({
			content: {
				message: messages.error404.message[LANG]
			},
			status_code: 404
		});
	}

	public error500(
		error: any,
		request: Request,
		response: Response,
		next: NextFunction
	) {
		return response.status(500).json({
			content: {
				message: messages.error500.message[LANG],
				error
			},
			status_code: 500
		});
	}
}

export default Routes;
