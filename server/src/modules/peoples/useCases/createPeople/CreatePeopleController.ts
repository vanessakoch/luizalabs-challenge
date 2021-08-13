import { Response, Request } from 'express';

import { CreatePeopleUseCase } from './CreatePeopleUseCase';

class CreatePeopleController {

  constructor(
    private createPeopleUseCase: CreatePeopleUseCase
  ) { }

  handle(request: Request, response: Response): Response {
    const { name, friends } = request.body;

    this.createPeopleUseCase.execute({ name, friends });

    return response.status(201).send();
  }
}

export { CreatePeopleController };