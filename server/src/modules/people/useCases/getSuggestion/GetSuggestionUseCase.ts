import { People } from '../../../../entities/People';
import { IPeopleRepository } from '../../repositories/IPeopleRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class GetSuggestionUseCase {

	constructor(
		@inject("PeopleRepository")
		private peopleRepository: IPeopleRepository
	) { }

	async execute(name: string): Promise<string[]> {
		const result: People[] = []
		const peopleRequest = await this.getPeopleByName(name);
		const myFriendsList = await this.getMyFriendsList(peopleRequest.friends);

		myFriendsList.forEach(myFriend => {
			// Remover a própria pessoa da lista de amigos dos amigos
			const theirFriends = myFriend.friends.filter(friend => peopleRequest.name !== friend.name);
			result.push(...this.getDiffFriends(peopleRequest.friends, theirFriends))
		})

		// Pegar somente o nome dos objetos de sugestões
		const suggestionNameList = result.map(suggest => suggest.name)
		return suggestionNameList;
	}

	/**
	 * Obter os dados completos dos amigos da própria pessoa
	*/
	private getMyFriendsList(myFriends: People[]): Promise<People[]> {
		// Pegar o id de todos os amigos da própria pessoa
		const myFriendsId: string[] = myFriends.map(friend => (friend.id as string));
		// Buscar o objeto completo dos amigos da própria pessoa
		return this.peopleRepository.getMyFriendsById(myFriendsId)
	}

	/**
	 * Obter os dados da pessoa a partir do nome. Gera uma exceção caso a pessoa não exista
	*/
	private async getPeopleByName(name: string): Promise<People> {
		const peopleRequest: People = await this.peopleRepository.getPeopleByName(name);
		if (!peopleRequest) {
			throw new AppError("People doesn't exists!", 303);
		}
		return peopleRequest;
	}

	/**
	 * Remover os amigos que a própria pessoa ja tenha
	*/
	private getDiffFriends(myFriends: People[], suggestions: People[]): People[] {
		return suggestions.filter(suggest => !myFriends.some(friend => friend.name === suggest.name))
	}
}

export { GetSuggestionUseCase };
