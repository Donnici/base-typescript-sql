import _ from 'lodash';

import { LANG } from '../config/const';
import { IFormatReturn } from '../interfaces';
import messages from '../locale/messages';
import HandleResponse from '../helpers/HandleResponse';

class ApiTraitController<T> {
	protected model: any;
	protected resource: string;

	protected async list(
		query: any = {},
		options: any = {}
	): Promise<IFormatReturn> {
		const { page = 1, limit = 15 } = query;
		const items: any = await this.model.findAll({
			...options,
			offset: limit === '*' ? undefined : (page - 1) * limit,
			limit: limit === '*' ? undefined : limit,
		});

		return HandleResponse.formatReturn(items, true);
	}

	protected async detail(id: string, options = {}): Promise<IFormatReturn> {
		let resp: any;
		let success: boolean = false;
		let status: number;
		try {
			resp = await this.model.findByPk(id, {
				...options,
			});
			if (_.isNull(resp)) {
				throw messages.detail.notFound[LANG];
			}
			success = true;
			status = 200;
		} catch (error) {
			console.log(error);
			resp = {
				message: messages.detail.notFound[LANG],
			};
			success = false;
			status = 404;
		}
		return HandleResponse.formatReturn(resp, success, status);
	}

	protected async store(item: T): Promise<IFormatReturn> {
		let newItem: any;
		let success: boolean = false;
		let status: number;
		try {
			newItem = await this.model.create(item);
			success = true;
			status = 201;
		} catch (e) {
			success = false;
			status = 422;
			newItem = {
				message: messages.store.notCreate[LANG],
				error: e,
			};
		}

		return HandleResponse.formatReturn(newItem, success, status);
	}

	protected async modernize(id: string, item: T): Promise<IFormatReturn> {
		let resp: any = {};
		let success: boolean = false;
		let status: number;
		try {
			const [updated, newItem] = await this.model.update(item, {
				returning: true,
				where: { id },
			});

			if (updated === 0) {
				success = false;
				status = 404;
				resp.message = messages.modernize.notFound[LANG];
			} else {
				success = true;
				status = 200;
				resp.message = messages.modernize.success[LANG];
				resp.new = newItem;
			}
		} catch (e) {
			console.log(e);
			success = false;
			status = 422;
			resp = {
				message: messages.modernize.error[LANG],
				error: e,
			};
		}
		return HandleResponse.formatReturn(resp, success, status);
	}

	protected async delete(id: string): Promise<IFormatReturn> {
		let resp: any = {};
		let success: boolean = false;
		let status: number;
		try {
			const deleted = await this.model.destroy({ where: { id } });
			if (!deleted) {
				throw {
					message: messages.detail.notFound[LANG],
					status: 404,
				};
			}
			success = true;
			status = 200;
			resp.message = messages.delete.success[LANG];
		} catch (e) {
			resp = {
				message: !_.isUndefined(e.message)
					? e.message
					: messages.delete.error[LANG],
				error: !_.isUndefined(e.message)
					? messages.delete.error[LANG]
					: e,
			};
			status = !_.isUndefined(e.status) ? e.status : 422;
			success = false;
		}
		return HandleResponse.formatReturn(resp, success, status);
	}
}

export default ApiTraitController;
