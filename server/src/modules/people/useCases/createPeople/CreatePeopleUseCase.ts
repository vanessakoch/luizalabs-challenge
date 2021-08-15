import { People } from '../../../../entities/People';
import { IPeopleRepository } from '../../repositories/IPeopleRepository';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';

interface IRequest {
	name: string;
	friends: People[];
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
			throw new AppError('People already exists!');
		}

		this.peopleRepository.create({ name, friends });
	}
}

export { CreatePeopleUseCase };