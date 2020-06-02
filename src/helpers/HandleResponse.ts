import { Response } from 'express';
import _ from 'lodash';
import { IFormatReturn, IObjectResponse } from '../interfaces';

class HandleResponse {
	public static success(
		response: Response,
		data: IFormatReturn,
		status: number = 200
	): Response {
		const statusCode = data.status ? data.status : status;
		const result: IObjectResponse = {
			content: data.content,
			pagination: data.pagination,
			status: statusCode
		};

		return response.status(statusCode).json(result);
	}

	public static errorMsg(
		response: Response,
		data: IFormatReturn,
		status: number = 400
	): Response {
		const statusCode = data.status ? data.status : status;
		const result: IObjectResponse = {
			content: data.content,
			status: statusCode
		};

		return response.status(statusCode).json(result);
	}

	public static errorProperties(
		response: Response,
		error: any,
		status: number = 422
	): Response {
		const propertiesErrors = {};
		if (_.isArray(error)) {
			for (const e of error) {
				propertiesErrors[e.path] = e.message;
			}
		} else {
			for (const e of error.inner) {
				propertiesErrors[e.path] = e.message;
			}
		}
		const result: IObjectResponse = {
			content: {
				errors: propertiesErrors
			},
			status
		};

		return response.status(status).json(result);
	}

	public static formatReturn(
		data: any,
		success: boolean,
		status?: number
	): IFormatReturn {
		if (!_.isUndefined(data.docs)) {
			return {
				hasError: !success,
				content: data.docs,
				pagination: {
					current_page: data.page,
					last_page: data.pages,
					per_page: data.limit,
					total: data.totalDocs
				},
				status
			};
		} else {
			return {
				hasError: !success,
				content: data,
				status
			};
		}
	}
}

export default HandleResponse;
