import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {TTask} from "./day.interface";

@Entity()
export default class Day {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({nullable: false})
  public name: string;

  @Column({nullable: true})
  public description: string;

  @Column({type: 'jsonb', array: false, default: () => "'[]'", nullable: false})
  public tasks: Array<TTask>;
}