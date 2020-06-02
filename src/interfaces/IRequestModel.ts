import ICustomRequest from './ICustomRequest';

interface IRequestModel<T> extends ICustomRequest {
	body: T;
}

export default IRequestModel;
