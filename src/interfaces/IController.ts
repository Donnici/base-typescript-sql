import { NextFunction, Request, Response } from 'express';
import IObjectRoute from './IObjectRoute';

interface IController {
	getRoutes: () => IObjectRoute[];
}

export default IController;
