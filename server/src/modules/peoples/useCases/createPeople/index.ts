import { PeopleRepository } from '../../repositories/implementations/PeopleRepository';
import { CreatePeopleController } from './CreatePeopleController';
import { CreatePeopleUseCase } from './CreatePeopleUseCase';

const peopleRepository = PeopleRepository.getInstance();
const createPeopleUseCase = new CreatePeopleUseCase(peopleRepository);
const createPeopleController = new CreatePeopleController(createPeopleUseCase);

export { createPeopleController };