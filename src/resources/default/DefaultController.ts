import { Request, Response } from 'express';

import pkg from '../../../package.json';

import { LANG } from '../../config/const';
import Database from '../../database/Database';
import HandleResponse from '../../helpers/HandleResponse';

import { IObjectRoute } from '../../interfaces';
import IController from '../../interfaces/IController';
import messages from '../../locale/messages';

class InfoController implements IController {

	private health = (request: Request, response: Response): Response => {
		return HandleResponse.success(response, {
			content: {
				message: 'ok'
			}
		});
	}

	private healthCheck = (request: Request, response: Response): Response => {
		return HandleResponse.success(response, {
			content: {
				message: 'ok'
			}
		});
	}

	private ready = (request: Request, response: Response): Response => {
		return HandleResponse.success(response, {
			content: {
				message: 'ok'
			}
		});
	}

	private info = (request: Request, response: Response): Response => {
		return HandleResponse.success(response, {
			content: {
				name: pkg.name,
				description: pkg.description,
				version: pkg.version
			}
		});
	}

	private syncDB = async (request: Request, response: Response): Promise<Response> => {
		await Database.syncDB();
		return HandleResponse.success(response, {
			content: {
				message: messages.database.syncSuccess[LANG]
			}
		});
	}

	public getRoutes(): IObjectRoute[] {
		return [
			{
				url: `/health/`,
				version: '',
				method: 'get',
				resource: 'info',
				action: 'health',
				controllerRoute: this.health,
				protected: false
			},
			{
				url: `/health-check/`,
				version: '',
				method: 'get',
				resource: 'info',
				action: 'health-check',
				controllerRoute: this.healthCheck,
				protected: false
			},
			{
				url: `/ready/`,
				version: '',
				method: 'get',
				resource: 'info',
				action: 'ready',
				controllerRoute: this.ready,
				protected: false
			},
			{
				url: `/info/`,
				version: '',
				method: 'get',
				resource: 'info',
				action: 'info',
				controllerRoute: this.info,
				protected: false
			},
			{
				url: `/syncDB/`,
				version: '',
				method: 'get',
				resource: 'sync',
				action: 'sync',
				controllerRoute: this.syncDB,
				protected: false
			}
		];
	}
}

export default InfoController;
