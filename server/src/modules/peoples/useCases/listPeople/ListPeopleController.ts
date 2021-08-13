import { Request, Response } from 'express';

import { ListPeopleUseCase } from './ListPeopleUseCase';

class ListPeopleController {

    constructor(
      	private listPeopleUseCase: ListPeopleUseCase
    ) { }

    handle(request: Request, response: Response): Response {
        const all = this.listPeopleUseCase.execute();

        return response.json(all);
    }
}

export { ListPeopleController };