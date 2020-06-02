import { NextFunction, Request, Response } from 'express';
import IObjectRoute from './IObjectRoute';

interface IResourceController {
	model: any;
	resource: string;

	index: (
		request: Request,
		response: Response,
		next?: NextFunction
	) => Promise<Response>;
	show: (
		request: Request,
		response: Response,
		next?: NextFunction
	) => Promise<Response>;
	create: (
		request: Request,
		response: Response,
		next?: NextFunction
	) => Promise<Response>;
	update: (
		request: Request,
		response: Response,
		next?: NextFunction
	) => Promise<Response>;
	destroy: (
		request: Request,
		response: Response,
		next?: NextFunction
	) => Promise<Response>;
	getRoutes: () => IObjectRoute[];
}

export default IResourceController;
