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
		const myFriendsId: string[] = []
		const peopleRequest = await this.peopleRepository.getPeopleByName(name);
        if (!peopleRequest) {
			throw new AppError("People doesn't exists!", 303);
		}
		// Pegar o id de todos os amigos da própria pessoa
		peopleRequest.friends.forEach(friend => myFriendsId.push(friend.id))
		// Buscar o objeto completo dos amigos da própria pessoa
		const myFriendsList = await this.peopleRepository.getMyFriendsById(myFriendsId)
		myFriendsList.forEach(myFriend => {
			// Remover a própria pessoa da lista de amigos dos amigos
			const theirFriends = myFriend.friends.filter(friend => peopleRequest.name !== friend.name);
			result.push(...this.getDiffFriends(peopleRequest.friends, theirFriends))
		})
		// Pegar somente o nome dos objetos de sugestões
		const suggestionNameList = result.map(suggest => suggest.name)
		return suggestionNameList;
	}

	// Remover os amigos que a própria pessoa ja tenha
	getDiffFriends(myFriends, suggestions) {
		return suggestions.filter(suggest => !myFriends.some(friend => friend.name === suggest.name))
	}
}

export { GetSuggestionUseCase };
