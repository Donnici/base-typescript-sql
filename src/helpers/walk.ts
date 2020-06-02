import fs from 'fs';
import path from 'path';

export const walkDir = (dir: string, callback: any) => {
	fs.readdirSync(dir).forEach((f: string) => {
		const dirPath = path.join(dir, f);
		const isDirectory = fs.statSync(dirPath).isDirectory();
		isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
	});
};

export const walkControllers = (
	dir = path.resolve(path.join('src', 'resources'))
) => {
	// const dir = path.resolve(path.join('src', 'resources'));
	const controllers: string[] = [];
	fs.readdirSync(dir).forEach((f) => {
		const dirPath = path.join(dir, f);
		if (!f.includes('Default') && f.includes('Controller.ts')) {
			controllers.push(dirPath);
		}
		if (fs.statSync(dirPath).isDirectory()) {
			const otherControllers = walkControllers(dirPath);
			controllers.push(...otherControllers);
		}
	});

	return controllers;
};

export const walkModels = (
	dir = path.resolve(path.join('src', 'resources'))
) => {
	// const dir = path.resolve(path.join('src', 'resources'));
	const models: string[] = [];
	fs.readdirSync(dir).forEach((f) => {
		const dirPath = path.join(dir, f);
		if (f.includes('Model.ts')) {
			models.push(dirPath);
		}
		if (fs.statSync(dirPath).isDirectory()) {
			const otherModels = walkModels(dirPath);
			models.push(...otherModels);
		}
	});

	return models;
};

export const walkEvents = (
	dir = path.resolve(path.join('src', 'resources'))
) => {
	// const dir = path.resolve(path.join('src', 'resources'));
	const events: string[] = [];
	fs.readdirSync(dir).forEach((f) => {
		const dirPath = path.join(dir, f);
		if (f.includes('Events.ts')) {
			events.push(dirPath);
		}
		if (fs.statSync(dirPath).isDirectory()) {
			const otherEvents = walkEvents(dirPath);
			events.push(...otherEvents);
		}
	});

	return events;
};
