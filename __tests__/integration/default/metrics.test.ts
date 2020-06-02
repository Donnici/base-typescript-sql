import request from 'supertest';

import App from './../../../src/main/App';

import pkg from './../../../package.json';

const application = new App();
application.configure();
const app = application.getApp();

describe('GET /health - check status of application', () => {
	it('Verify if /health was registred', async (done) => {
		const result = await request(app).options('/health');
		expect(result.status).toEqual(204);
		done();
	});
	it('Teste router thats say if application is healthy', async (done) => {
		const result = await request(app).get('/health');
		expect(result.status).toEqual(200);
		expect(result.body).toHaveProperty('content');
		expect(result.body.content).toHaveProperty('message', 'ok');
		done();
	});
});

describe('GET /health-check - execute check of dependencies', () => {
	it('Verify if /health-check was registred', async (done) => {
		const result = await request(app).options('/health-check');
		expect(result.status).toEqual(204);
		done();
	});
	it('Teste router thats say if application is health-checky', async (done) => {
		const result = await request(app).get('/health-check');
		expect(result.status).toEqual(200);
		expect(result.body).toHaveProperty('content');
		expect(result.body.content).toHaveProperty('message', 'ok');
		done();
	});
});

describe('GET /ready - verify application is ready', () => {
	it('Verify if /ready was registred', async (done) => {
		const result = await request(app).options('/ready');
		expect(result.status).toEqual(204);
		done();
	});
	it('Teste router thats say if application is ready', async (done) => {
		const result = await request(app).get('/ready');
		expect(result.status).toEqual(200);
		expect(result.body).toHaveProperty('content');
		expect(result.body.content).toHaveProperty('message', 'ok');
		done();
	});
});

describe('GET /info - info about application', () => {
	it('Verify if /info was registred', async (done) => {
		const result = await request(app).options('/info');
		expect(result.status).toEqual(204);
		done();
	});
	it('Teste router thats say if application is info', async (done) => {
		const result = await request(app).get('/info');
		expect(result.status).toEqual(200);
		expect(result.body).toHaveProperty('content');
		expect(result.body.content).toMatchObject({
			name: pkg.name,
			description: pkg.description,
			version: pkg.version
		});
		done();
	});
});
