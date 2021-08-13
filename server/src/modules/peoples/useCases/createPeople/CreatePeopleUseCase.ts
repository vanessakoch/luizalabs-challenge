import { People } from '../../model/People';
import { IPeopleRepository } from '../../repositories/IPeopleRepository';

interface IRequest {
	name: string;
	friends: Array<People>;
}

class CreatePeopleUseCase {

	constructor(
		private peopleRepository: IPeopleRepository
	) { }
	
	execute({ name, friends }: IRequest): void {
		const peopleExists = this.peopleRepository.getByName(name);

		if (peopleExists) {
			throw new Error('People already exists!');
		}

		this.peopleRepository.create({ name, friends });
	}
}

export { CreatePeopleUseCase };