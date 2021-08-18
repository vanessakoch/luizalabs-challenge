import { IPeopleRepository } from '../../repositories/IPeopleRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListPeopleUseCase {

    constructor(
        @inject("PeopleRepository")
      	private peopleRepository: IPeopleRepository
    ) { }

    async execute(): Promise<string[]> {
        const peopleList = await this.peopleRepository.list();
        const peopleNameList = peopleList.map(people => people.name);
        return peopleNameList;
    }

}

export { ListPeopleUseCase };