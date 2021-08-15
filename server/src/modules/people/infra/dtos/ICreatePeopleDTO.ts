
import { People } from "../../../../entities/People";

interface ICreatePeopleDTO {
    name: string,
    friends: People[]
}

export { ICreatePeopleDTO };