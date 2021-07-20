import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export default class Travel {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({nullable: false})
  public name: string;

  @Column({nullable: false})
  public description: string;

  @Column({nullable: true})
  public extraData: string;

  @Column({nullable: false})
  public lat: string;

  @Column({nullable: false})
  public long: string;
}