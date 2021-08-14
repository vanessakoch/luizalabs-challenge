
import { getRepository, Repository } from "typeorm";
import { People } from "../../entities/People";
import {
  IPeopleRepository,
  ICreatePeopleDTO,
} from "../IPeopleRepository";

class PeopleRepository implements IPeopleRepository {
    private repository: Repository<People>;

    constructor() {
        this.repository = getRepository(People);
    }

    async getByName(name: string): Promise<People> {
        const people = await this.repository.findOne({ name }) 
        return people;
    }

    async list(): Promise<People[]> {
        const peoples = await this.repository.find();
        return peoples
    }

    async create({ name, friends }: ICreatePeopleDTO): Promise<void> {
        const people = this.repository.create({
            name,
            friends
        })
        await this.repository.save(people);
    }
}

export { PeopleRepository };