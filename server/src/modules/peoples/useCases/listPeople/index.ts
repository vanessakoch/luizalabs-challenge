import { PeopleRepository } from '../../repositories/implementations/PeopleRepository';
import { ListPeopleController } from './ListPeopleController';
import { ListPeopleUseCase } from './ListPeopleUseCase';

const peopleRepository = PeopleRepository.getInstance();
const listPeopleUseCase = new ListPeopleUseCase(peopleRepository);
const listPeopleController = new ListPeopleController(listPeopleUseCase);

export { listPeopleController };