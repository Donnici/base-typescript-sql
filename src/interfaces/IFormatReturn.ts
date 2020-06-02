interface IFormatReturn {
	hasError?: boolean;
	content: any;
	pagination?: {
		current_page: number;
		last_page: number;
		per_page: number;
		total: number;
	};
	status?: number;
}

export default IFormatReturn;
