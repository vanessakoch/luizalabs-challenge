import { People } from '../../model/People';
import { IPeopleRepository } from '../../repositories/IPeopleRepository';

class ListPeopleUseCase {

    constructor(
      	private peoplesRepository: IPeopleRepository
    ) { }

    execute(): People[] {
        const peoples = this.peoplesRepository.list();
        return peoples;
    }

}

export { ListPeopleUseCase };