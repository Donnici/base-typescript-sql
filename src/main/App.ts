import Cors from 'cors';
import Express from 'express';
import Morgan from 'morgan';
import Database from '../database/Database';
import { walkControllers } from '../helpers/walk';
import messages from '../locale/messages';
import Routes from './Routes';
import { LANG } from '../config/const';

class App {
	private port: number = 5555;
	private app: Express.Application;
	private routes: Routes;
	private database: Database;
	private server: any;

	constructor() {
		this.app = Express();
		this.database = new Database();
		this.database.createConnection();
		this.applyMidlewares();
		this.routes = new Routes(this.app);
	}

	public getApp = (): Express.Application => {
		return this.app;
	}

	public setPort = (port: number): void => {
		this.port = port;
	}

	private registerResources = async (): Promise<void> => {
		const controllers: string[] = walkControllers();

		for (const item of controllers) {
			const controller = new (require(item).default)();
			const controllerRoutes = controller.getRoutes();
			await this.routes.registerResourceRoutes(controllerRoutes);
		}
	}

	private running = (): void => {
		// console.clear();
		// console.log(this.routes.getRoutes().stack.map((item) => item.route.path));
		console.log(`🌐 ${messages.running.message[LANG]}${this.port} 🚀`);
	}

	public configure = async (): Promise<void> => {
		// this.app.use('/static', Express.static(Path.resolve('staticfiles')));
		this.app.use('/', this.routes.getRoutes());
		this.app.use(this.routes.error404);
		this.listenSignals();
		await Database.syncDB({ force: true });
		await this.registerResources();
	}

	public start = async (): Promise<void> => {
		await this.configure();
		this.server = this.app.listen(this.port, this.running);
	}

	public stop = (): void => {
		this.server.close();
	}

	private applyMidlewares = (): void => {
		this.app.use(Cors());
		this.app.use(Morgan('combined'));
		this.app.use(Express.json({ limit: '10mb' }));
	}

	private listenSignals = (): void => {
		process.once('SIGUSR2', () => process.kill(process.pid, 'SIGUSR2'));
		process.on('SIGINT', () => process.exit(0));
	}
}

export default App;
