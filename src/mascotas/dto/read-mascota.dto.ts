import { ApiProperty } from '@nestjs/swagger';

export class MascotaDto {

     // @ApiProperty()
     // public idMascota: number;
     
     @ApiProperty({
      type: 'string',
      title: 'Rut del Usuario',
      description: 'Identificación única del usuario dueño de la mascota',
      example: '10234945-K',
      minLength: 9,                   // Tamaño minimo
      maxLength: 10,                  // Tamaño maximo
      pattern: '^\\d{7,8}-[\\dkK]$',  // Valida el formato del RUT chileno
      required: true,                 // Indica si es obligatorio
      nullable: false})               // Indica si el valor puede o no ser nulo            
      public rutUsuario: string;

      @ApiProperty({
         type: 'number',
         title: 'Id de la mascota',
         description: 'Identificador de la Mascota',
         example: 23535,
         minLength: 1,                   // Tamaño minimo
         maxLength: 999999,              // Tamaño maximo
         pattern: '/^\d+$/',             // Valida el formato numerico
         required: true,                 // Indica si es obligatorio
         nullable: false})               // Indica si el valor puede ser nulo           
      public idMascota: number;

      @ApiProperty({
         type: 'string',
         title: 'Nombre Mascota',
         description: 'Nombre de la Mascota',
         example: 'Snoopy',
         minLength: 2,                   // Tamaño minimo
         maxLength: 50,                  // Tamaño maximo
         required: true,                 // Indica si es obligatorio
         nullable: false })                // Indica si el valor puede ser nulo                   
      public nombre: string;

      @ApiProperty({type: 'string',
         title: 'Categoría Mascota',
         description: 'Categóría de la Mascota',
         required: true,
         minLength: 2,
         maxLength: 50, 
         example: 'Perro'})
   public categoria: string;

      @ApiProperty({
         type: 'string',
         title: 'Raza de la Mascota',
         description: 'Raza de la Mascota',
         example: 'Beagle',
         minLength: 2,                   // Tamaño minimo
         maxLength: 50,                  // Tamaño maximo
         required: true,                 // Indica si es obligatorio
         nullable: false})               // Indica si el valor puede ser nulo                 
      public raza: string;

      @ApiProperty({
         type: 'number',
         title: 'Edad de la Mascota',
         description: 'Edad en años de la Mascota',
         example: 3,
         minLength: 1,                   // Tamaño minimo
         maxLength: 3,                   // Tamaño maximo
         pattern: '/^\d+$/',             // Valida el formato numerico
         required: false,                // Indica si es obligatorio
         nullable: true})                // Indica si el valor puede ser nulo
      public edad: number;
      
      @ApiProperty({
         type: 'string',
         title: 'Imagen de la Mascota',
         description: 'Ruta del archivo imagen',
         example: './images/Snoopy.jpg',
         maxLength: 255,                  // Tamaño maximo
         required: false,                // Indica si es obligatorio
         nullable: true})                 // Indica si el valor puede ser nulo                 
      public imagen?: string;

  
      @ApiProperty({
         type: 'string[]',
         title: 'Afeccciones de la Mascota',
         description: 'Listado de afeccciones de la Mascota',
         example: ['Rabia','Tiña'],
         maxLength: 30,                  // Tamaño maximo
         required: false,                // Indica si es obligatorio
         nullable: true })               // Indica si el valor puede ser nulo            
      public afeccionesSalud?: string[];

      
      @ApiProperty({
         type: 'string[]',
         title: 'Preferencias de la Mascota',
         description: 'Listado de preferencias de la Mascota',
         example: ['ProPlan','RoyalCanin'],
         maxLength: 50,                  // Tamaño maximo
         required: false,                // Indica si es obligatorio
         nullable: true})                // Indica si el valor puede ser nulo
      public preferencias?: string[];
      
      //@ApiProperty()
      // type: 'HistorialClinico[]',
      // title: 'Historial Clinico',
      // description: 'Listado de las atenciones medicas Mascota',
      // example: ['Picadura Insecto','Cortar la cola'],
      // minLength: 50,                   // Tamaño minimo
      // maxLength: 200,                  // Tamaño maximo
      // required: false,                // Indica si es obligatorio
      // nullable: true})                 // Indica si el valor puede ser nulo       
     // public historialClinico: HistorialClinico[];
  }