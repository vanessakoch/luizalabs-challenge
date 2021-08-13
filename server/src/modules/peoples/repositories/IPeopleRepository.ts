import { ICreatePeopleDTO } from '../dtos/ICreatePeopleDTO';
import { People } from '../model/People';

interface IPeopleRepository {
    create({ name, friends }: ICreatePeopleDTO): void;
    list(): People[];
    getByName(name: string): People;
}
  
export { IPeopleRepository, ICreatePeopleDTO };