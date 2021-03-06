import * as http from 'http';
import * as debug from 'debug';

import { App } from './app/App';

debug('ts-express:server');

const app = new App();
const port = app.getPort();

const server = http.createServer(app.getExpressApp());

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error: NodeJS.ErrnoException): void {
	if (error.syscall !== 'listen') {
		throw error;
	}

	let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;

	switch (error.code) {
		case 'EACCES':
			console.error(`${bind} requires elevated privileges`);
			process.exit(1);

			break;
		case 'EADDRINUSE':
			console.error(`${bind} is already in use`);
			process.exit(1);

			break;
		default:
			throw error;
	}
}

function onListening(): void {
	let address = server.address();
	let bind = (typeof address === 'string') ? `pipe ${address}` : `port ${address.port}`;

	console.log(`Listening on ${bind}`);
	debug(`Listening on ${bind}`);
}