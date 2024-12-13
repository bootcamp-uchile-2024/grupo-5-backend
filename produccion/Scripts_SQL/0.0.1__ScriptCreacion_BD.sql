/*==============================================================*/
/* dbms name:      mysql 5.0                                    */
/* created on:     23-11-2024 20:29:10                          */
/*==============================================================*/




/*==============================================================*/
/* table: avatar_mascotas                                       */
/*==============================================================*/
create table avatar_mascotas
(
   idavatarmascota      bigint not null  comment '',
   pathimamascota       varchar(1000)  comment '',
   primary key (idavatarmascota)
);

/*==============================================================*/
/* table: avatar_usuarios                                       */
/*==============================================================*/
create table avatar_usuarios
(
   idimagenavatar       bigint not null  comment '',
   pathimausuario       varchar(1000) not null  comment '',
   primary key (idimagenavatar)
);

/*==============================================================*/
/* table: calendarios                                           */
/*==============================================================*/
create table calendarios
(
   idevento             int not null  comment '',
   idfrecuencia         int  comment '',
   idmascota            bigint not null  comment '',
   fechaevento          datetime not null  comment '',
   etiqueta             varchar(20) not null  comment '',
   motivocalendario     varchar(3000) not null  comment '',
   primary key (idevento)
);

/*==============================================================*/
/* table: carro_compras                                         */
/*==============================================================*/
create table carro_compras
(
   idusuario            bigint not null comment '',
   idcarrocompras       bigint not null auto_increment  comment '',
   fechacreacion        timestamp not null  comment '',
   preciototal          bigint  comment '',
   primary key (idcarrocompras),
   unique (idusuario)
);

/*==============================================================*/
/* table: categorias_producto                                   */
/*==============================================================*/
create table categorias_producto
(
   idcategoria          int not null  comment '',
   nombrecategoria      varchar(100) not null  comment '',
   descripcioncategoria varchar(100) not null  comment '',
   primary key (idcategoria)
);

/*==============================================================*/
/* table: comunas                                               */
/*==============================================================*/
create table comunas
(
   idcomuna             int not null  comment '',
   idregion             int  comment '',
   nombrecomuna         varchar(100)  comment '',
   primary key (idcomuna)
);

/*==============================================================*/
/* table: condiciones_alimentarias                              */
/*==============================================================*/
create table condiciones_alimentarias
(
   idcondicion          int not null  comment '',
   condicionalimentaria varchar(100) not null  comment '',
   primary key (idcondicion)
);

/*==============================================================*/
/* table: detalles_carro_compra                                 */
/*==============================================================*/
create table detalles_carro_compra
(
   iddetallecarro       bigint not null  auto_increment comment '',
   idcarrocompras       bigint not null  comment '',
   idproducto           bigint not null  comment '',
   cantidad             int not null  comment '',
   preciounitario       int not null  comment '',
   primary key (iddetallecarro, idcarrocompras, idproducto)
);

/*==============================================================*/
/* table: detalles_pedidos                                      */
/*==============================================================*/
create table detalles_pedidos
(
   idpedido             bigint not null  comment '',
   iddetallepedido      bigint not null  comment '',
   idproducto           bigint not null  comment '',
   cantidadproducto     int not null  comment '',
   precioproducto       int not null  comment '',
   primary key (idpedido, iddetallepedido, idproducto)
);

/*==============================================================*/
/* table: direcciones                                           */
/*==============================================================*/
create table direcciones
(
   iddireccion          bigint not null  comment '',
   idusuario            bigint not null  comment '',
   idcomuna             int  comment '',
   alias                varchar(100) not null  comment '',
   calle                longtext not null  comment '',
   numero               char(10) not null  comment '',
   zipcode              int  comment '',
   referencias          varchar(1000) not null  comment '',
   personacontacto      varchar(100) not null  comment '',
   telefonocontactro    numeric(11,0) not null  comment '',
   primary key (iddireccion)
);

/*==============================================================*/
/* table: enfermedades_base                                     */
/*==============================================================*/
create table enfermedades_base
(
   idenfermedad        int not null  comment '',
   nombreenfermedad     varchar(100)  comment '',
   primary key (idenfermedad)
);

/*==============================================================*/
/* table: especies                                              */
/*==============================================================*/
create table especies
(
   idespecie            int not null  comment '',
   nombreespecie        varchar(100) not null  comment '',
   primary key (idespecie)
);

/*==============================================================*/
/* table: frecuencias                                           */
/*==============================================================*/
create table frecuencias
(
   idfrecuencia         int not null  comment '',
   frecuencia           varchar(50) not null  comment '',
   primary key (idfrecuencia)
);

/*==============================================================*/
/* table: imagenes_productos                                    */
/*==============================================================*/
create table imagenes_productos
(
   idimagen             bigint not null auto_increment comment '',
   idproducto           bigint  comment '',
   pathimaproductos     varchar(1000) not null  comment '',
   primary key (idimagen)
);

/*==============================================================*/
/* table: marcas_producto                                       */
/*==============================================================*/
create table marcas_producto
(
   idmarca              int not null  comment '',
   nombremarca          varchar(100) not null  comment '',
   primary key (idmarca)
);

/*==============================================================*/
/* table: mascotas                                              */
/*==============================================================*/
create table mascotas
(
   idmascota            bigint not null  comment '',
   idraza               int not null  comment '',
   idavatarmascota      bigint  comment '',
   nombre               varchar(100) not null  comment '',
   fechanacimiento      date not null  comment '',
   sexo                 varchar(15) not null  comment '',
   numerochip           varchar(15)  comment '',
   primary key (idmascota)
);

/*==============================================================*/
/* table: mascotas_condalimentarias                             */
/*==============================================================*/
create table mascotas_condalimentarias
(
   idmascota            bigint not null  comment '',
   idcondicion          int not null  comment '',
   primary key (idmascota, idcondicion)
);

/*==============================================================*/
/* table: mascotas_enfermedades                                 */
/*==============================================================*/
create table mascotas_enfermedades
(
   idmascota            bigint not null  comment '',
   idenfermedad        int not null  comment '',
   primary key (idmascota, idenfermedad)
);

/*==============================================================*/
/* table: mascotas_vacunas                                      */
/*==============================================================*/
create table mascotas_vacunas
(
   idvacuna             int not null  comment '',
   idmascota            bigint not null  comment '',
   primary key (idvacuna, idmascota)
);

/*==============================================================*/
/* table: pedidos                                               */
/*==============================================================*/
create table pedidos
(
   idpedido             bigint not null  comment '',
   idusuario            bigint not null  comment '',
   fechacreacion        datetime  comment '',
   fechaentrega         datetime  comment '',
   preciototal          bigint  comment '',
   primary key (idpedido)
);

/*==============================================================*/
/* table: productos                                             */
/*==============================================================*/
create table productos
(
   idproducto           bigint not null auto_increment  comment '',
   idmarca              int  comment '',
   idcategoria          int  comment '',
   nombreproducto       varchar(150) not null  comment '',
   descripcion          varchar(1000) not null  comment '',
   sku                  varchar(20) not null  comment '',
   precio               int not null  comment '',
   stock                int not null  comment '',
   peso                 varchar(20)  comment '',
   tamanio              varchar(20)  comment '',
   ingredientes         varchar(1000)  comment '',
   material             varchar(1000)  comment '',
   activo               bool  comment '',
   primary key (idproducto)
);

/*==============================================================*/
/* table: razas                                                 */
/*==============================================================*/
create table razas
(
   idraza               int not null  comment '',
   idespecie            int not null  comment '',
   nombreraza           varchar(100) not null  comment '',
   primary key (idraza)
);

/*==============================================================*/
/* table: regiones                                              */
/*==============================================================*/
create table regiones
(
   idregion             int not null  comment '',
   orden                int not null  comment '',
   nombreregion         varchar(100) not null  comment '',
   primary key (idregion)
);

/*==============================================================*/
/* table: registros_medicos                                     */
/*==============================================================*/
create table registros_medicos
(
   idresgistromedico    bigint not null  comment '',
   idmascota            bigint  comment '',
   fecharegistro        date not null  comment '',
   horaregistro         time not null  comment '',
   motivo               varchar(3000) not null  comment '',
   primary key (idresgistromedico)
);

/*==============================================================*/
/* table: roles                                                 */
/*==============================================================*/
create table roles
(
   idrol                int not null  comment '',
   rol                  varchar(20)  comment '',
   primary key (idrol)
);

/*==============================================================*/
/* table: usuarios                                              */
/*==============================================================*/
create table usuarios
(
   idusuario            bigint not null  comment '',
   idrol                int  comment '',
   idimagenavatar       bigint  comment '',
   rut                  varchar(12)  comment '',
   nombreusuario        varchar(100) not null  comment '',
   apellidos            varchar(100) not null  comment '',
   email                varchar(100) not null  comment '',
   telefono             int  comment '',
   contrasena           varchar(100)  comment '',
   chkterminos          bool  comment '',
   chkofertas           bool  comment '',
   activo               bool  comment '',
   primary key (idusuario)
);

/*==============================================================*/
/* table: usuarios_mascotas                                     */
/*==============================================================*/
create table usuarios_mascotas
(
   idusuario            bigint not null  comment '',
   idmascota            bigint not null  comment '',
   primary key (idusuario, idmascota)
);

/*==============================================================*/
/* table: vacunas                                               */
/*==============================================================*/
create table vacunas
(
   idvacuna             int not null  comment '',
   nombrevacuna         varchar(80)  comment '',
   primary key (idvacuna)
);

alter table calendarios add constraint frecuencias_calendarios foreign key (idfrecuencia)
      references frecuencias (idfrecuencia) on delete restrict on update restrict;

alter table calendarios add constraint mascotas_calendarios foreign key (idmascota)
      references mascotas (idmascota) on delete restrict on update restrict;

alter table carro_compras add constraint usuarios_carcom foreign key (idusuario)
      references usuarios (idusuario) on delete restrict on update restrict;

alter table comunas add constraint regiones_comunas foreign key (idregion)
      references regiones (idregion) on delete restrict on update restrict;

alter table detalles_carro_compra add constraint carrcomp_detcarcom foreign key (idcarrocompras)
      references carro_compras (idcarrocompras) on delete restrict on update restrict;

alter table detalles_carro_compra add constraint prod_detcarcom foreign key (idproducto)
      references productos (idproducto) on delete restrict on update restrict;

alter table detalles_pedidos add constraint prod_detpedidos foreign key (idproducto)
      references productos (idproducto) on delete restrict on update restrict;

alter table detalles_pedidos add constraint pedido_detpedidos foreign key (idpedido)
      references pedidos (idpedido) on delete restrict on update restrict;

alter table direcciones add constraint comunas_direcciones foreign key (idcomuna)
      references comunas (idcomuna) on delete restrict on update restrict;

alter table direcciones add constraint usuarios_direcciones foreign key (idusuario)
      references usuarios (idusuario) on delete restrict on update restrict;

alter table imagenes_productos add constraint productos_imagprod foreign key (idproducto)
      references productos (idproducto) on delete restrict on update restrict;

alter table mascotas add constraint avamas_mascotas foreign key (idavatarmascota)
      references avatar_mascotas (idavatarmascota) on delete restrict on update restrict;

alter table mascotas add constraint razas_mascotas foreign key (idraza)
      references razas (idraza) on delete restrict on update restrict;

alter table mascotas_condalimentarias add constraint condiciones_mascondali foreign key (idcondicion)
      references condiciones_alimentarias (idcondicion) on delete restrict on update restrict;

alter table mascotas_condalimentarias add constraint mascotas_mascondali foreign key (idmascota)
      references mascotas (idmascota) on delete restrict on update restrict;

alter table mascotas_enfermedades add constraint mascotas_masenf foreign key (idmascota)
      references mascotas (idmascota) on delete restrict on update restrict;

alter table mascotas_enfermedades add constraint enferbase_masenf foreign key (idenfermedad)
      references enfermedades_base (idenfermedad) on delete restrict on update restrict;

alter table mascotas_vacunas add constraint vacunas_masvac foreign key (idvacuna)
      references vacunas (idvacuna) on delete restrict on update restrict;

alter table mascotas_vacunas add constraint mascotas_masvac foreign key (idmascota)
      references mascotas (idmascota) on delete restrict on update restrict;

alter table pedidos add constraint usuarios_pedidos foreign key (idusuario)
      references usuarios (idusuario) on delete restrict on update restrict;

alter table productos add constraint producto_catprod foreign key (idcategoria)
      references categorias_producto (idcategoria) on delete restrict on update restrict;

alter table productos add constraint marcaprod_prod foreign key (idmarca)
      references marcas_producto (idmarca) on delete restrict on update restrict;

alter table razas add constraint especies_razas foreign key (idespecie)
      references especies (idespecie) on delete restrict on update restrict;

alter table registros_medicos add constraint mascotas_regmed foreign key (idmascota)
      references mascotas (idmascota) on delete restrict on update restrict;

alter table usuarios add constraint avatarusu_usuarios foreign key (idimagenavatar)
      references avatar_usuarios (idimagenavatar) on delete restrict on update restrict;

alter table usuarios add constraint roles_usuarios foreign key (idrol)
      references roles (idrol) on delete restrict on update restrict;

alter table usuarios_mascotas add constraint usurios_usumas foreign key (idusuario)
      references usuarios (idusuario) on delete restrict on update restrict;

alter table usuarios_mascotas add constraint mascotas_usumas foreign key (idmascota)
      references mascotas (idmascota) on delete restrict on update restrict;

