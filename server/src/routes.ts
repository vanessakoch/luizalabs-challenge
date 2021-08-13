import { Router } from 'express';

const routes = Router();

import { createPeopleController } from './modules/peoples/useCases/createPeople';
import { listPeopleController } from './modules/peoples/useCases/listPeople';

routes.post('/peoples', (request, response) => {
    return createPeopleController.handle(request, response);
});

routes.get('/peoples', (request, response) => {
    return listPeopleController.handle(request, response);
});

export { routes };