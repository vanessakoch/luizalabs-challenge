import { Request, Response } from 'express';

import { ListPeopleUseCase } from './ListPeopleUseCase';

import { container } from 'tsyringe';
import { GetFriendsController } from '../getFriends/GetFriendsController';

class ListPeopleController {

    async handle(request: Request, response: Response): Promise<Response> {
        if(request.query.name) {
            const getFriendsController = new GetFriendsController();
            return getFriendsController.handle(request, response);
        }
        const listPeopleUseCase = container.resolve(ListPeopleUseCase)
        const peopleList = await listPeopleUseCase.execute()
        const peopleName = peopleList.map(people => people.name);
        return response.json(peopleName);
    }
}

export { ListPeopleController };