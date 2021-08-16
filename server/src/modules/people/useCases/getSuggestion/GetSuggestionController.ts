import { Response, Request } from 'express';
import { container } from "tsyringe";
import { GetSuggestionUseCase } from './GetSuggestionUseCase';

class GetSuggestionController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;
    const getFriendsUseCase = container.resolve(GetSuggestionUseCase)
    const suggestions = await getFriendsUseCase.execute(String(name));
    const suggestionName = suggestions.map(suggest => suggest.name)
    return response.status(200).json(suggestionName);
  }
}

export { GetSuggestionController };
