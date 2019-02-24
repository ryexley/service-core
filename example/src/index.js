import config from 'config';
import service from '../../src';
import {sampleRouter} from './routes/sample-router';

const serviceConfig = {
	config,
	routes: [
		{path: '/sample', router: sampleRouter}
	]
};

export default service(serviceConfig).start();
