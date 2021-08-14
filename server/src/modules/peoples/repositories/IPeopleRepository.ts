import { ICreatePeopleDTO } from '../dtos/ICreatePeopleDTO';
import { People } from '../entities/People';

interface IPeopleRepository {
    create({ name, friends }: ICreatePeopleDTO): Promise<void>;
    list(): Promise<People[]>;
    getByName(name: string): Promise<People>;
}
  
export { IPeopleRepository, ICreatePeopleDTO };