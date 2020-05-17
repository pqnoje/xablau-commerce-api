import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import { Address } from "./addess.entity";


@Entity()
export class Person {

    @PrimaryGeneratedColumn()
    _id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    birthday: Date;

    @Column(type => Address)
    address: Address
}
