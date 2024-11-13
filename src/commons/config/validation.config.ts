import { IsNotEmpty } from 'class-validator';

export class VariablesDeEntorno {
  @IsNotEmpty()
  NESTJS_PORT: number;

}