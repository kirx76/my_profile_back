import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export default class CreateTravelDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsNumber()
  @IsNotEmpty()
  public lat: string;

  @IsNumber()
  @IsNotEmpty()
  public long: string;
}