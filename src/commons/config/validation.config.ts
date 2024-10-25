import { IsNotEmpty } from 'class-validator';

export class VariablesDeEntorno {
  @IsNotEmpty()
  PUERTO: number;

}