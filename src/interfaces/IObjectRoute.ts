import { Request, Response } from 'express';

interface IObjectRoute {
	url: string;
	version: string;
	method: 'get' | 'post' | 'patch' | 'put' | 'delete';
	controllerRoute: (request: Request, response: Response) => Promise<Response> | Response;
	action: string;
	resource: string;
	protected?: boolean;
	onlyOwner?: boolean;
}

export default IObjectRoute;
