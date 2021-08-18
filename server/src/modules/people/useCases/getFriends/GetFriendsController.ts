import { Response, Request } from 'express';
import { container } from "tsyringe";
import { GetFriendsUseCase } from './GetFriendsUseCase';

class GetFriendsController {

	async handle(request: Request, response: Response): Promise<Response> {
		const { name } = request.query;
		const getFriendsUseCase = container.resolve(GetFriendsUseCase)
		const peopleNameList = await getFriendsUseCase.execute(String(name));
		return response.status(200).json(peopleNameList);
	}
}

export { GetFriendsController };
