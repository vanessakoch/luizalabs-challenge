import { Router } from 'express';

const routes = Router();

import { CreatePeopleController } from './modules/peoples/useCases/createPeople/CreatePeopleController';
import listPeopleController from './modules/peoples/useCases/listPeople';

const createPeopleController = new CreatePeopleController();

routes.post('/peoples', createPeopleController.handle);

routes.get('/peoples', (request, response) => {
    return listPeopleController().handle(request, response);
});

export { routes };