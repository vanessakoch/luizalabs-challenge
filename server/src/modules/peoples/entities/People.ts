import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity("peoples")
class People {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @ManyToMany(type => People)
    @JoinTable()
    friends: People[];

    constructor() {
        if(!this.id) this.id = uuidV4();
    }
}

export { People };