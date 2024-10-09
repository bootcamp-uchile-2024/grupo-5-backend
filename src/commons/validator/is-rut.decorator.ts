import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsRutConstraint } from './is-rut.constraint';

export function IsRut(validationOptions?: ValidationOptions) {

  console.log('En IsRut archivo is-rut.decorador');
  return function (object: Object, propertyName: string) {
    console.log('En Funcion registerDecorator');
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRutConstraint,  
      
    });
  };
}
