import { IPagination } from '.';

interface IObjectResponse {
	status: number;
	content: object | [];
	pagination?: IPagination;
}

export default IObjectResponse;
