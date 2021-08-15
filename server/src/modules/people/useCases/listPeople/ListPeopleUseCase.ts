import { People } from '../../../../entities/People';
import { IPeopleRepository } from '../../repositories/IPeopleRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListPeopleUseCase {

    constructor(
        @inject("PeopleRepository")
      	private peopleRepository: IPeopleRepository
    ) { }

    async execute(): Promise<People[]> {
        const peopleList = await this.peopleRepository.list();
        return peopleList;
    }

}

export { ListPeopleUseCase };