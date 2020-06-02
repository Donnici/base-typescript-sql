module.exports = {
    apps: [
        {
			name: "typescript-sql",
			script: './dist/src/index.js',
			interpreter: './node_modules/pm2/node_modules/.bin/ts-node',
			// watch: true,
			ignore_watch: ["node_modules"],
            env: {
                "PORT": 5050,
				"ENV": "prod",
				"NODE_ENV": "production"
            }
        }
    ]
}