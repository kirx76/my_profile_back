import {IsNotEmpty, IsString} from "class-validator";
import {TTask} from "./day.interface";

export default class CreateDayDto {
  @IsString()
  public name: string;

  @IsNotEmpty()
  public tasks: TTask[];
}