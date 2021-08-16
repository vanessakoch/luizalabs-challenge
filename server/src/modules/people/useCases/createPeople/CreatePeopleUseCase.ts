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
		/** Se a pessoa já existir, não deverá adicionar */
		if (peopleExists) {
			throw new AppError('People already exists!', 303);
		}
		const listPeople = await this.peopleRepository.list();
		/** Se estiver adicionando uma pessoa sem amigos, dará erro */
		if (friends.length === 0) {
			throw new AppError('Friends list is empty!');
		}
		/** Percorre a lista de amigos da requisição e verifica 
		 *  se esse amigo existe, se não existir retorna erro */
		friends.forEach(friend => {
			const friendExist = listPeople.find(repository => repository.name === friend.name);
			if(!friendExist) {
				throw new AppError(`Friend name: ${friend.name} doesn't exist!`, 404);
			}
		})
		/** Chama a função do banco para criar nova pessoa */
		this.peopleRepository.create({ name, friends });
	}
}

export { CreatePeopleUseCase };