import { PeopleRepository } from '../../repositories/implementations/PeopleRepository';
import { ListPeopleController } from './ListPeopleController';
import { ListPeopleUseCase } from './ListPeopleUseCase';

export default () : ListPeopleController => {
    const peopleRepository = new PeopleRepository();
    const listPeopleUseCase = new ListPeopleUseCase(peopleRepository);
    const listPeopleController = new ListPeopleController(listPeopleUseCase);

    return listPeopleController;
}
