import { Request, Response } from 'express';
import { ListPeopleUseCase } from './ListPeopleUseCase';
import { container } from 'tsyringe';

class ListPeopleController {

    async handle(request: Request, response: Response): Promise<Response> {
        const listPeopleUseCase = container.resolve(ListPeopleUseCase)
        const peopleList = await listPeopleUseCase.execute()
        const peopleName = peopleList.map(people => people.name);
        return response.json(peopleName);
    }
}

export { ListPeopleController };