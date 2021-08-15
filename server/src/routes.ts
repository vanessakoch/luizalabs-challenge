import { Router } from 'express';

const routes = Router();

import { CreatePeopleController } from './modules/people/useCases/createPeople/CreatePeopleController';
import { ListPeopleController } from './modules/people/useCases/listPeople/ListPeopleController';

const createPeopleController = new CreatePeopleController();
const listPeopleController = new ListPeopleController();

routes.post('/people', createPeopleController.handle);
routes.get('/people', listPeopleController.handle);

export { routes };