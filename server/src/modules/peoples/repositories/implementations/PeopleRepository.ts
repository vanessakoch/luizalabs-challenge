
import { People } from "../../model/People";
import {
  IPeopleRepository,
  ICreatePeopleDTO,
} from "../IPeopleRepository";

class PeopleRepository implements IPeopleRepository {
    private static instance: PeopleRepository;

    peoples: People[] = [];

    static getInstance(): PeopleRepository {
        if (!PeopleRepository.instance) {
            PeopleRepository.instance = new PeopleRepository();
        }
    
        return PeopleRepository.instance;
    }

    getByName(name: string): People {
        const people = this.peoples.find((people) => people.name === name);
        return people;
    }

    list(): People[] {
        const all = this.peoples;
        return all;
    }

    create({ name, friends }: ICreatePeopleDTO): void {
        const people = new People();

        Object.assign(people, {
            name,
            friends,
        });

        this.peoples.push(people);
    }
}

export { PeopleRepository };