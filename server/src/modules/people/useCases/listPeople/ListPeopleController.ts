import { Request, Response } from 'express';
import { ListPeopleUseCase } from './ListPeopleUseCase';
import { container } from 'tsyringe';

class ListPeopleController {

    async handle(request: Request, response: Response): Promise<Response> {
        const listPeopleUseCase = container.resolve(ListPeopleUseCase)
        const peopleNameList = await listPeopleUseCase.execute()
        return response.status(200).json(peopleNameList);
    }
}

export { ListPeopleController };
