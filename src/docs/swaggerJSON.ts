import pkg from '../../package.json';
import { HOST_URL } from '../config/const';

export const swaggerDefinition = {
	info: {
		title: pkg.name,
		description: pkg.description,
		version: pkg.version
	},
	host: HOST_URL.replace('http://', ''),
	basePath: '/'
};
