import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

// @Injectable()
@ValidatorConstraint({ name: 'IsRut' })

export class IsRutConstraint implements ValidatorConstraintInterface {
  validate(rut: string): boolean {

    console.log('Paso por IsRutConstraint');
    if (!rut) return false;

    // Lógica para validar el RUT 
    const rutRegex = /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]{1}$/;
    return rutRegex.test(rut);
  }

  defaultMessage(): string {
    console.log('mensajePorDefecto');
    return 'El RUT proporcionado no es válido';
  }
}
