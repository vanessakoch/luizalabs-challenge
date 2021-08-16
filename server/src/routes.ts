import { Router } from 'express';

const routes = Router();

import { CreatePeopleController } from './modules/people/useCases/createPeople/CreatePeopleController';
import { ListPeopleController } from './modules/people/useCases/listPeople/ListPeopleController';
import { GetSuggestionController } from './modules/people/useCases/getSuggestion/GetSuggestionController';
import { GetFriendsController } from './modules/people/useCases/getFriends/GetFriendsController';

const createPeopleController = new CreatePeopleController();
const listPeopleController = new ListPeopleController();
const getSuggestionController = new GetSuggestionController();
const getFriendsController = new GetFriendsController();

routes.post('/people', createPeopleController.handle);
routes.get('/people', listPeopleController.handle);
routes.get('/people/friends', getFriendsController.handle);
routes.get('/people/suggestion', getSuggestionController.handle);

export { routes };