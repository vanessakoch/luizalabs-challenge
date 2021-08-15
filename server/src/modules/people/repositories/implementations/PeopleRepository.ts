
import { People } from "../../../../entities/People";
import { PeopleModel } from "../../infra/mongoose";
import { IPeopleRepository, ICreatePeopleDTO } from "../IPeopleRepository";
import { v4 as uuidV4 } from 'uuid';

class PeopleRepository implements IPeopleRepository {

    async getByName(name: string): Promise<People> {
        const people = await PeopleModel.findOne({ name }) 
        return people;
    }

    async list(): Promise<People[]> {
        const peopleList = await PeopleModel.find();
        return peopleList;
    }

    async create({ name, friends }: ICreatePeopleDTO): Promise<void> {
        const people: People = {
            name,
            friends
        }
        await PeopleModel.create(people)
    }
}

export { PeopleRepository };