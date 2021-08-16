
import { People } from "../../../../entities/People";
import { PeopleModel } from "../../infra/database";
import { IPeopleRepository, ICreatePeopleDTO } from "../IPeopleRepository";

class PeopleRepository implements IPeopleRepository {

    /** Encontrar pessoa no banco de dados através do nome */
    async getByName(name: string): Promise<People> {
        const people = await PeopleModel.findOne({ name }) 
        return people;
    }

    /** Listar todas as pessoas disponíveis no banco de dados */
    async list(): Promise<People[]> {
        const peopleList = await PeopleModel.find();
        return peopleList;
    }

    /** Persistir a pessoa no banco de dados */
    async create({ name, friends }: ICreatePeopleDTO): Promise<void> {
        const people: People = {
            name,
            friends
        }
        await PeopleModel.create(people)
    }

    async getMyFriendsById(list: string[]): Promise<People[]> {
        const query = await PeopleModel.find({
            id: { $in: list }
        })
        return query
    }
}

export { PeopleRepository };