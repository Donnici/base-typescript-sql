import { Request } from 'express';

interface ICustomRequest extends Request {
	decoded?: any;
}

export default ICustomRequest;
