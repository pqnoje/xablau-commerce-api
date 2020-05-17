import {Entity, PrimaryGeneratedColumn, Column, Index} from "typeorm";
import { Person } from './person.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public _id: string;

    @Index({ unique: true })
    @Column()
    public username: string;

    @Column()
    public password: string;

    @Column(type => Person)
    public person: Person
}
