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
		await this.validateRequest({ name, friends });
		await this.setFriendsId(friends);
		// Chama a função do banco para criar nova pessoa
		await this.peopleRepository.create({ name, friends });
	}

	/**
	 * Gerar exceção caso a pessoa já exista
	*/
	private async checkIfPeopleExists(name: string): Promise<boolean> {
		const peopleExists = await this.peopleRepository.getPeopleByName(name);
		// Se a pessoa já existir, não deverá adicionar
		if (peopleExists) {
			throw new AppError('People already exists!', 303);
		}
		return false;
	}

	/**
	 * Definir os ids dos amigos listados na requisição. 
	 * Gerar exceção caso algum dos amigos não exista.
	*/
	private async setFriendsId(friends: People[]): Promise<void> {
		// Lista de todas as pessoas
		const listPeople = await this.peopleRepository.list();
		/** Percorre a lista de amigos da requisição e verifica 
		 *  se os amigos existem, se não existir retorna um erro */
		friends.forEach(friend => {
			const friendExist = listPeople.find(people => people.name === friend.name);
			if (!friendExist) {
				throw new AppError(`You are trying to add a friend that doesn't exist!`, 404);
			}
			// Salvar no banco o id do amigo junto ao nome
			friend.id = friendExist.id
		})
	}

	/**
	 * Validar dados da requisição
	*/
	private async validateRequest({ name, friends }: IRequest) {
		await this.checkIfPeopleExists(name);
		// Se estiver adicionando uma pessoa sem amigos, dará erro
		if (friends.length === 0) {
			throw new AppError('Friends list is empty!');
		}
	}
}

export { CreatePeopleUseCase };
