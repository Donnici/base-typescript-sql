import { Sequelize } from 'sequelize-typescript';
import { DB_DIALECT, PG_DATABASE, PG_HOST, PG_PASSWORD, PG_PORT, PG_USERNAME } from '../config/const';
import { walkModels } from '../helpers/walk';

class Database {
	public static sequelize: any;

	public async createConnection() {
		Database.sequelize = new Sequelize({
			username: PG_USERNAME,
			password: PG_PASSWORD,
			database: PG_DATABASE,
			host: PG_HOST,
			port: PG_PORT,
			dialect: DB_DIALECT,
			models: walkModels(),
			logging: false
		});
	}

	public static async syncDB(options = {}) {
		await Database.sequelize.sync(options);
	}
}

export default Database;
