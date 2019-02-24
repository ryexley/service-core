import {Router as routeFactory} from 'express';
import HttpStatus from 'http-status';

export function sampleRouter(app) {
	const router = routeFactory();

	router.get('/', (req, res) => {
		res.status(HttpStatus.OK).send({message: 'this is a sample endpoint'});
	});

	return router;
}
