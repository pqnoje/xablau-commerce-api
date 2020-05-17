import {Entity, PrimaryGeneratedColumn, Column, Index} from "typeorm"

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    _id: string

    @Column()
    street: string

    @Column()
    number: string

    @Column()
    zipcode: string

    @Column()
    complement: string

    @Column()
    city: string

    @Column()
    state: string

    @Column()
    country: string
}
