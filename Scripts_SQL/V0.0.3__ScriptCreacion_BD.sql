/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     12-12-2024 21:17:47                          */
/*==============================================================*/




/*==============================================================*/
/* Table: avatar_mascotas                                       */
/*==============================================================*/
create table avatar_mascotas
(
   idavatarmascota      bigint not null  comment '',
   pathimamascota       varchar(1000)  comment '',
   primary key (idavatarmascota)
);

/*==============================================================*/
/* Table: avatar_usuarios                                       */
/*==============================================================*/
create table avatar_usuarios
(
   idimagenavatar       bigint not null  comment '',
   pathimausuario       varchar(1000) not null  comment '',
   primary key (idimagenavatar)
);

/*==============================================================*/
/* Table: busqueda_frecuente                                    */
/*==============================================================*/
create table busqueda_frecuente
(
   idbusqueda           bigint not null  comment '',
   frasebusqueda        varchar(1000)  comment '',
   frecuencia           integer  comment '',
   primary key (idbusqueda)
);

/*==============================================================*/
/* Table: calendarios                                           */
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
/* Table: carro_compras                                         */
/*==============================================================*/
create table carro_compras
(
   idcarrocompras       bigint not null auto_increment  comment '',
   idusuario            bigint not null  comment '',
   primary key (idcarrocompras)
);

/*==============================================================*/
/* Table: categorias_producto                                   */
/*==============================================================*/
create table categorias_producto
(
   idcategoria          int not null auto_increment  comment '',
   nombrecategoria      varchar(100) not null  comment '',
   descripcioncategoria varchar(100) not null  comment '',
   primary key (idcategoria)
);

/*==============================================================*/
/* Table: comunas                                               */
/*==============================================================*/
create table comunas
(
   idcomuna             int not null  comment '',
   idregion             int  comment '',
   nombrecomuna         varchar(100)  comment '',
   primary key (idcomuna)
);

/*==============================================================*/
/* Table: condiciones_alimentarias                              */
/*==============================================================*/
create table condiciones_alimentarias
(
   idcondicion          int not null  comment '',
   condicionalimentaria varchar(100) not null  comment '',
   primary key (idcondicion)
);

/*==============================================================*/
/* Table: descuentos                                            */
/*==============================================================*/
create table descuentos
(
   iddescuento          bigint not null auto_increment  comment '',
   nombredescuento      varchar(100) not null  comment '',
   descripciondescuento varchar(1000)  comment '',
   porcentaje           int not null  comment '',
   fechainicio          date not null  comment '',
   fechafin             date not null  comment '',
   estado               boolean not null  comment '',
   primary key (iddescuento)
);

/*==============================================================*/
/* Table: detalle_descuento                                     */
/*==============================================================*/
create table detalle_descuento
(
   iddetalledescuento   bigint not null auto_increment  comment '',
   iddescuento          bigint  comment '',
   idcategoria          bigint  comment '',
   idmarca              bigint  comment '',
   idproducto           bigint  comment '',
   primary key (iddetalledescuento)
);

/*==============================================================*/
/* Table: detalles_carro_compra                                 */
/*==============================================================*/
create table detalles_carro_compra
(
   iddetallecarro       bigint not null auto_increment comment '',
   idcarrocompras       bigint not null  comment '',
   idproducto           bigint not null  comment '',
   cantidad             int not null  comment '',
   preciounitario       int not null  comment '',
   primary key (iddetallecarro, idcarrocompras, idproducto)
);

/*==============================================================*/
/* Table: detalles_pedidos                                      */
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
/* Table: direcciones                                           */
/*==============================================================*/
create table direcciones
(
   iddireccion          bigint not null auto_increment  comment 'Identificador único de la dirección.',
   alias                varchar(100) not null  comment 'Nombre o alias para identificar la dirección (por ejemplo, Casa, Oficina).',
   calle                longtext not null  comment 'Nombre de la calle o avenida de la dirección.',
   numero               char(10) not null  comment 'Número de la casa o edificio.',
   referencias          varchar(1000) not null  comment 'Referencias adicionales para ubicar la dirección.',
   personacontacto      varchar(100) not null  comment 'Nombre de la persona de contacto asociada a la dirección.',
   telefonocontacto     varchar(11) not null  comment 'Número de teléfono de la persona de contacto.',
   activo               int not null  comment 'Estado de la dirección: 1 para activa, 0 para inactiva.',
   idusuario            bigint not null  comment 'Identificador del usuario al que pertenece la dirección.',
   idcomuna             int  comment 'Identificador de la comuna asociada a la dirección.',
   primary key (iddireccion)
);

/*==============================================================*/
/* Table: enfermedades_base                                     */
/*==============================================================*/
create table enfermedades_base
(
   idenfermedad         int not null  comment '',
   nombreenfermedad     varchar(100)  comment '',
   primary key (idenfermedad)
);

/*==============================================================*/
/* Table: especies                                              */
/*==============================================================*/
create table especies
(
   idespecie            int not null  comment '',
   nombreespecie        varchar(100) not null  comment '',
   primary key (idespecie)
);

/*==============================================================*/
/* Table: frecuencias                                           */
/*==============================================================*/
create table frecuencias
(
   idfrecuencia         int not null  comment '',
   frecuencia           varchar(50) not null  comment '',
   primary key (idfrecuencia)
);

/*==============================================================*/
/* Table: imagenes_productos                                    */
/*==============================================================*/
create table imagenes_productos
(
   idimagen             bigint not null auto_increment  comment '',
   idproducto           bigint  comment '',
   pathimaproductos     varchar(1000) not null  comment '',
   primary key (idimagen)
);

/*==============================================================*/
/* Table: marcas_producto                                       */
/*==============================================================*/
create table marcas_producto
(
   idmarca              int not null auto_increment  comment '',
   nombremarca          varchar(100) not null  comment '',
   primary key (idmarca)
);

/*==============================================================*/
/* Table: mascotas                                              */
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
/* Table: mascotas_condalimentarias                             */
/*==============================================================*/
create table mascotas_condalimentarias
(
   idmascota            bigint not null  comment '',
   idcondicion          int not null  comment '',
   primary key (idmascota, idcondicion)
);

/*==============================================================*/
/* Table: mascotas_enfermedades                                 */
/*==============================================================*/
create table mascotas_enfermedades
(
   idmascota            bigint not null  comment '',
   idesnfermedad        int not null  comment '',
   primary key (idmascota, idesnfermedad)
);

/*==============================================================*/
/* Table: mascotas_vacunas                                      */
/*==============================================================*/
create table mascotas_vacunas
(
   idvacuna             int not null  comment '',
   idmascota            bigint not null  comment '',
   primary key (idvacuna, idmascota)
);

/*==============================================================*/
/* Table: pedidos                                               */
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
/* Table: productos                                             */
/*==============================================================*/
create table productos
(
   idproducto           bigint not null auto_increment  comment '',
   idmarca              int not null  comment '',
   idcategoria          int not null  comment '',
   idtipoalimento       bigint  comment '',
   idsegmento           bigint  comment '',
   nombreproducto       varchar(150) not null  comment '',
   descripcion          varchar(100) not null  comment '',
   sku                  varchar(20) not null  comment '',
   precio               int not null  comment '',
   stock                int not null  comment '',
   peso                 varchar(20)  comment '',
   tamanio              varchar(20)  comment '',
   ingredientes         varchar(1000)  comment '',
   material             varchar(1000)  comment '',
   descuento            int  comment '',
   activo               bool not null  comment '',
   primary key (idproducto)
);

/*==============================================================*/
/* Table: razas                                                 */
/*==============================================================*/
create table razas
(
   idraza               int not null  comment '',
   idespecie            int not null  comment '',
   nombreraza           varchar(100) not null  comment '',
   primary key (idraza)
);

/*==============================================================*/
/* Table: regiones                                              */
/*==============================================================*/
create table regiones
(
   idregion             int not null  comment '',
   orden                int not null  comment '',
   nombreregion         varchar(100) not null  comment '',
   primary key (idregion)
);

/*==============================================================*/
/* Table: registros_medicos                                     */
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
/* Table: roles                                                 */
/*==============================================================*/
create table roles
(
   idrol                int not null  comment '',
   rol                  varchar(20)  comment '',
   primary key (idrol)
);

/*==============================================================*/
/* Table: segmento_etareo                                       */
/*==============================================================*/
create table segmento_etareo
(
   idsegmento           bigint not null  comment '',
   nombresegmento       varchar(100)  comment '',
   descripsegmento      varchar(1000)  comment '',
   primary key (idsegmento)
);

/*==============================================================*/
/* Table: tipo_alimento                                         */
/*==============================================================*/
create table tipo_alimento
(
   idtipoalimento       bigint not null  comment '',
   tipoalimento         varchar(100)  comment '',
   descripciontipo      varchar(1000)  comment '',
   primary key (idtipoalimento)
);

/*==============================================================*/
/* Table: usuarios                                              */
/*==============================================================*/
create table usuarios
(
   idusuario            bigint not null auto_increment  comment '',
   idrol                int  comment '',
   idimagenavatar       bigint  comment '',
   rut                  varchar(12)  comment '',
   nombres              varchar(100) not null  comment '',
   apellidos            varchar(100) not null  comment '',
   email                varchar(100) not null  comment '',
   telefono             varchar(11) not null  comment '',
   contrasena           varchar(100)  comment '',
   chkterminos          bool  comment '',
   chkofertas           bool  comment '',
   activo               bool  comment '',
   primary key (idusuario)
);

/*==============================================================*/
/* Table: usuarios_mascotas                                     */
/*==============================================================*/
create table usuarios_mascotas
(
   idusuario            bigint not null  comment '',
   idmascota            bigint not null  comment '',
   primary key (idusuario, idmascota)
);

/*==============================================================*/
/* Table: vacunas                                               */
/*==============================================================*/
create table vacunas
(
   idvacuna             int not null  comment '',
   nombrevacuna         varchar(80)  comment '',
   primary key (idvacuna)
);

alter table calendarios add constraint FRECUENCIAS_CALENDARIOS foreign key (idfrecuencia)
      references frecuencias (idfrecuencia) on delete restrict on update restrict;

alter table calendarios add constraint MASCOTAS_CALENDARIOS foreign key (idmascota)
      references mascotas (idmascota) on delete restrict on update restrict;

alter table carro_compras add constraint USUARIOS_CARCOM foreign key (idusuario)
      references usuarios (idusuario) on delete restrict on update restrict;

alter table comunas add constraint REGIONES_COMUNAS foreign key (idregion)
      references regiones (idregion) on delete restrict on update restrict;

alter table detalle_descuento add constraint DESCUENTOS_DETDESCUENTOS foreign key (iddescuento)
      references descuentos (iddescuento) on delete restrict on update restrict;

alter table detalles_carro_compra add constraint CARRCOMP_DETCARCOM foreign key (idcarrocompras)
      references carro_compras (idcarrocompras) on delete restrict on update restrict;

alter table detalles_carro_compra add constraint PROD_DETCARCOM foreign key (idproducto)
      references productos (idproducto) on delete restrict on update restrict;

alter table detalles_pedidos add constraint PROD_DETPEDIDOS foreign key (idproducto)
      references productos (idproducto) on delete restrict on update restrict;

alter table detalles_pedidos add constraint PEDIDO_DETPEDIDOS foreign key (idpedido)
      references pedidos (idpedido) on delete restrict on update restrict;

alter table direcciones add constraint COMUNAS_DIRECCIONES foreign key (idcomuna)
      references comunas (idcomuna) on delete restrict on update restrict;

alter table direcciones add constraint USUARIOS_DIRECCIONES foreign key (idusuario)
      references usuarios (idusuario) on delete restrict on update restrict;

alter table imagenes_productos add constraint PRODUCTOS_IMAGPROD foreign key (idproducto)
      references productos (idproducto) on delete restrict on update restrict;

alter table mascotas add constraint AVAMAS_MASCOTAS foreign key (idavatarmascota)
      references avatar_mascotas (idavatarmascota) on delete restrict on update restrict;

alter table mascotas add constraint RAZAS_MASCOTAS foreign key (idraza)
      references razas (idraza) on delete restrict on update restrict;

alter table mascotas_condalimentarias add constraint CONDICIONES_MASCONDALI foreign key (idcondicion)
      references condiciones_alimentarias (idcondicion) on delete restrict on update restrict;

alter table mascotas_condalimentarias add constraint MASCOTAS_MASCONDALI foreign key (idmascota)
      references mascotas (idmascota) on delete restrict on update restrict;

alter table mascotas_enfermedades add constraint MASCOTAS_MASENF foreign key (idmascota)
      references mascotas (idmascota) on delete restrict on update restrict;

alter table mascotas_enfermedades add constraint ENFERBASE_MASENF foreign key (idesnfermedad)
      references enfermedades_base (idenfermedad) on delete restrict on update restrict;

alter table mascotas_vacunas add constraint VACUNAS_MASVAC foreign key (idvacuna)
      references vacunas (idvacuna) on delete restrict on update restrict;

alter table mascotas_vacunas add constraint MASCOTAS_MASVAC foreign key (idmascota)
      references mascotas (idmascota) on delete restrict on update restrict;

alter table pedidos add constraint USUARIOS_PEDIDOS foreign key (idusuario)
      references usuarios (idusuario) on delete restrict on update restrict;

alter table productos add constraint PRODUCTO_CATPROD foreign key (idcategoria)
      references categorias_producto (idcategoria) on delete restrict on update restrict;

alter table productos add constraint MARCAPROD_PROD foreign key (idmarca)
      references marcas_producto (idmarca) on delete restrict on update restrict;

alter table productos add constraint SEGMENTOETARERO_PRODUCTO foreign key (idsegmento)
      references segmento_etareo (idsegmento) on delete restrict on update restrict;

alter table productos add constraint TIPOALIMENTO_PRODUCTO foreign key (idtipoalimento)
      references tipo_alimento (idtipoalimento) on delete restrict on update restrict;

alter table razas add constraint ESPECIES_RAZAS foreign key (idespecie)
      references especies (idespecie) on delete restrict on update restrict;

alter table registros_medicos add constraint MASCOTAS_REGMED foreign key (idmascota)
      references mascotas (idmascota) on delete restrict on update restrict;

alter table usuarios add constraint AVATARUSU_USUARIOS foreign key (idimagenavatar)
      references avatar_usuarios (idimagenavatar) on delete restrict on update restrict;

alter table usuarios add constraint ROLES_USUARIOS foreign key (idrol)
      references roles (idrol) on delete restrict on update restrict;

alter table usuarios_mascotas add constraint USURIOS_USUMAS foreign key (idusuario)
      references usuarios (idusuario) on delete restrict on update restrict;

alter table usuarios_mascotas add constraint MASCOTAS_USUMAS foreign key (idmascota)
      references mascotas (idmascota) on delete restrict on update restrict;

