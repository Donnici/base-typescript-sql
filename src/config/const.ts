import dotenv from 'dotenv';
dotenv.config();

export const LANG: string = process.env.API_LANG as string;

export const FRONT_URL: string = process.env.FRONT_URL as string;

export const HOST_URL: string = process.env.HOST_URL as string;
export const BACK_URL: string = `${HOST_URL}/api/v1`;

export const PG_USERNAME: string = process.env.PG_USERNAME as string;
export const PG_PASSWORD: string = process.env.PG_PASSWORD as string;
export const PG_DATABASE: string = process.env.PG_DATABASE as string;
export const PG_PORT: number = parseInt(
	process.env.PG_PORT ? process.env.PG_PORT : '0',
	10
);
export const PG_HOST: string = process.env.PG_HOST as string;

let dialect = process.env.DB_DIALECT;
if (
	!(
		dialect === 'mysql' ||
		dialect === 'postgres' ||
		dialect === 'sqlite' ||
		dialect === 'mariadb' ||
		dialect === 'mssql' ||
		dialect === undefined
	)
) {
	dialect = undefined;
}

export const DB_DIALECT:
	| 'mysql'
	| 'postgres'
	| 'sqlite'
	| 'mariadb'
	| 'mssql'
	| undefined = dialect;

export const MESSAGE_TYPE = {
	error: 'ERROR',
	warning: 'WARNING',
	info: 'INFO',
	success: 'SUCCESS'
};
