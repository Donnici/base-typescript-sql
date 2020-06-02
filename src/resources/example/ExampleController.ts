import { Response } from 'express';
import _ from 'lodash';
import HandleResponse from '../../helpers/HandleResponse';
import { ValidateBodyUpdate } from '../../helpers/YupValidations';
import {
	ICustomRequest,
	IFormatReturn,
	IObjectRoute,
	IRequestModel,
	IResourceController,
} from '../../interfaces';
import ApiTrait from '../../traits/ApiTrait';
import IExample from './interfaces/IExample';
import Example, { ExampleValidation } from './ExampleModel';

class ExampleController extends ApiTrait<IExample>
	implements IResourceController {
	public model = Example;
	public resource = 'example';

	public index = async (
		request: ICustomRequest,
		response: Response
	): Promise<Response> => {
		const { query } = request;
		const findOptions = {};
		const items: IFormatReturn = await this.list(query, findOptions);
		return HandleResponse.success(response, items);
	};

	public show = async (
		request: ICustomRequest,
		response: Response
	): Promise<Response> => {
		const { id } = request.params;
		const item: IFormatReturn = await this.detail(id, {});
		if (item.hasError) {
			return HandleResponse.errorMsg(response, item);
		} else {
			return HandleResponse.success(response, item);
		}
	};

	public create = async (
		request: IRequestModel<IExample>,
		response: Response
	): Promise<Response> => {
		let item: IExample = request.body;
		try {
			item = await ExampleValidation.validate(item, {
				abortEarly: false,
			});
			const result: IFormatReturn = await this.store(item);
			if (result.hasError) {
				return HandleResponse.errorMsg(response, result);
			} else {
				return HandleResponse.success(response, result);
			}
		} catch (error) {
			if (!_.isUndefined(error.inner)) {
				return HandleResponse.errorProperties(response, error);
			}
			return HandleResponse.errorMsg(response, {
				content: { message: error },
			});
		}
	};

	public update = async (
		request: IRequestModel<IExample>,
		response: Response
	): Promise<Response> => {
		const { id } = request.params;
		const item: IExample = request.body;
		const { isValid, errors } = ValidateBodyUpdate(ExampleValidation, item);
		try {
			if (isValid) {
				const result: any = await this.modernize(id, item);
				if (result.hasError) {
					return HandleResponse.errorMsg(response, result);
				} else {
					return HandleResponse.success(response, result);
				}
			} else {
				throw errors;
			}
		} catch (error) {
			if (!_.isUndefined(error.inner) || _.isArray(error)) {
				return HandleResponse.errorProperties(response, error);
			}
			return HandleResponse.errorMsg(response, {
				content: { message: error },
			});
		}
	};

	public destroy = async (
		request: ICustomRequest,
		response: Response
	): Promise<Response> => {
		const { id } = request.params;
		const result: any = await this.delete(id);
		if (result.hasError) {
			return HandleResponse.errorMsg(response, result);
		} else {
			return HandleResponse.success(response, result);
		}
	};

	public getRoutes(): IObjectRoute[] {
		return [
			{
				url: `/${this.resource}/`,
				version: 'v1',
				method: 'get',
				resource: this.resource,
				action: 'index',
				controllerRoute: this.index,
			},
			{
				url: `/${this.resource}/`,
				version: 'v1',
				method: 'post',
				resource: this.resource,
				action: 'create',
				controllerRoute: this.create,
			},
			{
				url: `/${this.resource}/:id`,
				version: 'v1',
				method: 'get',
				resource: this.resource,
				action: 'show',
				controllerRoute: this.show,
			},
			{
				url: `/${this.resource}/:id`,
				version: 'v1',
				method: 'put',
				resource: this.resource,
				action: 'update',
				controllerRoute: this.update,
			},
			{
				url: `/${this.resource}/:id`,
				version: 'v1',
				method: 'delete',
				resource: this.resource,
				action: 'destroy',
				controllerRoute: this.destroy,
			},
		];
	}
}

export default ExampleController;
