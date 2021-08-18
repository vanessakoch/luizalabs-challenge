import { IPeopleRepository } from '../../repositories/IPeopleRepository';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';

@injectable()
class GetFriendsUseCase {
	
	constructor(
		@inject("PeopleRepository")
		private peopleRepository: IPeopleRepository
	) { }
	
	async execute(name: string): Promise<string[]> {
		const peopleExists = await this.peopleRepository.getPeopleByName(name);

        if (!peopleExists) {
			throw new AppError("People doesn't exists!", 303);
		}

		const friendNameList = peopleExists.friends.map(friend => friend.name)
		return friendNameList;
	}
}

export { GetFriendsUseCase };