import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity("vehicle")
export class Vehicle extends BaseEntity {
    @PrimaryGeneratedColumn("uuid") id: string;

    @Column("varchar", { length: 100 })
    make: string;

    @Column("varchar", { length: 100 })
    model: string;

    @Column("int")
    year: number;
}