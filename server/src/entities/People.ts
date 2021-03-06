import { v4 as uuidV4 } from 'uuid';

class People {
    id?: string;
    name!: string;
    friends: People[] = [];

    constructor() {
        this.id ||= uuidV4();
    }
}

export { People };
