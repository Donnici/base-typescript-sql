import {
	Column,
	CreatedAt,
	DataType,
	Model,
	Table,
	UpdatedAt,
} from 'sequelize-typescript';

import * as Yup from 'yup';

import YupValidations from '../../helpers/YupValidations';

/**
 * @swagger
 *
 * definitions:
 *   Example:
 *     type: object
 *     required:
 *       - name
 *     properties:
 *       id:
 *         type: number
 *       name:
 *         type: string
 *       description:
 *         type: string
 */

@Table({
	timestamps: true,
	tableName: 'TableExample',
})
class Example extends Model<Example> {
	@Column(DataType.STRING)
	public name!: string;

	@Column(DataType.STRING)
	public description: string;

	@CreatedAt
	@Column
	public createdAt!: Date;

	@UpdatedAt
	@Column
	public updatedAt!: Date;
}

export const ExampleValidation = Yup.object().shape({
	name: YupValidations.STRING_REQUIRED,
	description: YupValidations.STRING,
});

export default Example;
