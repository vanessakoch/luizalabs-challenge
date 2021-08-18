import { Response, Request } from 'express';
import { container } from "tsyringe";

import { CreatePeopleUseCase } from './CreatePeopleUseCase';

class CreatePeopleController {

	async handle(request: Request, response: Response): Promise<Response> {
		const { name, friends } = request.body;
		const createPeopleUseCase = container.resolve(CreatePeopleUseCase)
		await createPeopleUseCase.execute({ name, friends });
		return response.status(201).send();
	}
}

export { CreatePeopleController };
