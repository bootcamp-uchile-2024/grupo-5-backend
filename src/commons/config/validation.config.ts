import { IsNotEmpty } from 'class-validator';

export class VariablesDeEntorno {
  @IsNotEmpty()
  PORT: string;
  PORT_DEFAULT: string;
}