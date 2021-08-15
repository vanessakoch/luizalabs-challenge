import { People } from '../../../../entities/People';
import { IPeopleRepository } from '../../repositories/IPeopleRepository';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';

@injectable()
class GetFriendsUseCase {
	constructor(
		@inject("PeopleRepository")
		private peopleRepository: IPeopleRepository
	) { }
	
	async execute(name: string): Promise<People> {
		const peopleExists = await this.peopleRepository.getByName(name);

        if (!peopleExists) {
			throw new AppError('People doesnt exists!');
		}

		return peopleExists;
	}
}

export { GetFriendsUseCase };