import { People } from '../../../../entities/People';
import { IPeopleRepository } from '../../repositories/IPeopleRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

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
		const peopleExists = await this.peopleRepository.getPeopleByName(name);
		/** Se a pessoa já existir, não deverá adicionar */
		if (peopleExists) {
			throw new AppError('People already exists!', 303);
		}
		/** Lista de todas as pessoas */
		const listPeople = await this.peopleRepository.list();
		/** Se estiver adicionando uma pessoa sem amigos, dará erro */
		if (friends.length === 0) {
			throw new AppError('Friends list is empty!');
		}
		/** Percorre a lista de amigos da requisição e verifica 
		 *  se os amigos existem, se não existir retorna um erro */
		friends.forEach(friend => {
			const friendExist = listPeople.find(people => people.name === friend.name);
			if(!friendExist) {
				throw new AppError(`Friend name: ${friend.name} doesn't exist!`, 404);
			}
		})
		/** Chama a função do banco para criar nova pessoa */
		this.peopleRepository.create({ name, friends });
	}
}

export { CreatePeopleUseCase };