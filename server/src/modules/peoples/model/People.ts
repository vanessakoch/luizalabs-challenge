import { v4 as uuidV4 } from 'uuid';

class People {
    id?: string;
    name: string;
    friends: Array<People>;

    constructor() {
        /** Adicionar o id somente caso 
         * a pessoa não exista */
        if(!this.id) this.id = uuidV4();
    }
}

export { People };