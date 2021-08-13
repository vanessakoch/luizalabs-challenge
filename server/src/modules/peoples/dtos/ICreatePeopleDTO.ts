import { People } from "../model/People";

interface ICreatePeopleDTO {
    name: string,
    friends: Array<People>
}

export { ICreatePeopleDTO };