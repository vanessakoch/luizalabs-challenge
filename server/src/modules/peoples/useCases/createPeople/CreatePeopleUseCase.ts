import { People } from '../../entities/People';
import { IPeopleRepository } from '../../repositories/IPeopleRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
	name: string;
	friends: Array<People>;
}

@injectable()
class CreatePeopleUseCase {
	constructor(
		@inject("PeopleRepository")
		private peopleRepository: IPeopleRepository
	) { }
	
	async execute({ name, friends }: IRequest): Promise<void> {
		const peopleExists = await this.peopleRepository.getByName(name);

		if (peopleExists) {
			throw new Error('People already exists!');
		}

		this.peopleRepository.create({ name, friends });
	}
}

export { CreatePeopleUseCase };