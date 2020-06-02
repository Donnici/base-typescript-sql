import * as Yup from 'yup';

import { LANG } from '../config/const';
import messages from '../locale/messages';

export const ValidateBodyUpdate = (schema, body) => {
	const pathsError: any[] = [];
	for (const key in body) {
		try {
			const a = schema.validateSyncAt(key, body);
		} catch (error) {
			pathsError.push(error);
		}
	}
	return {
		isValid: pathsError.length > 0 ? false : true,
		errors: pathsError
	};
};

export default {
	STRING: Yup.string()
		.typeError(messages.yupValidation.typeString[LANG])
		.trim(),
	STRING_REQUIRED: Yup.string()
		.typeError(messages.yupValidation.typeString[LANG])
		.trim()
		.required(messages.yupValidation.required[LANG]),
	EMAIL_REQUIRED: Yup.string()
		.typeError(messages.yupValidation.typeString[LANG])
		.trim()
		.email(messages.yupValidation.isEmail[LANG])
		.required(messages.yupValidation.required[LANG]),
	NUMBER_POSITIVE: Yup.number()
		.typeError(messages.yupValidation.typeNumber[LANG])
		.positive(messages.yupValidation.positiveNumber[LANG])
		.integer(messages.yupValidation.integerNumber[LANG]),
	NUMBER_POSITIVE_REQUIRED: Yup.number()
		.typeError(messages.yupValidation.typeNumber[LANG])
		.positive(messages.yupValidation.positiveNumber[LANG])
		.integer(messages.yupValidation.integerNumber[LANG])
		.required(messages.yupValidation.required[LANG]),
	BOOLEAN: Yup.boolean()
		.typeError(messages.yupValidation.typeBoolean[LANG])
		.strict(true),
	BOOLEAN_REQUIRED: Yup.boolean()
		.typeError(messages.yupValidation.typeBoolean[LANG])
		.strict(true)
		.required(messages.yupValidation.required[LANG]),

	ARRAY_STRING: Yup.array().of(Yup.string()),
	ARRAY_NUMBER: Yup.array().of(Yup.number()),
	ARRAY_NUMBER_POSITIVE: Yup.array().of(
		Yup.number()
			.typeError(messages.yupValidation.typeNumber[LANG])
			.strict(true)
			.positive(messages.yupValidation.positiveNumber[LANG])
			.integer(messages.yupValidation.integerNumber[LANG])
	)
};
