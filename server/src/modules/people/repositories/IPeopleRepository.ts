import { ICreatePeopleDTO } from '../infra/dtos/ICreatePeopleDTO';
import { People } from '../../../entities/People';

interface IPeopleRepository {
    create({ name, friends }: ICreatePeopleDTO): Promise<void>;
    getByName(name: string): Promise<People>;
    list(): Promise<People[]>;
}

export { IPeopleRepository, ICreatePeopleDTO };