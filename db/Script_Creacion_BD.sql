/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     25-10-2024 14:19:40                          */
/*==============================================================*/

DROP DATABASE petropolis;

CREATE DATABASE petropolis;


USE petropolis;

/*==============================================================*/
/* Table: ATRIBUTOS_ESPECIFICOS                                 */
/*==============================================================*/
create table ATRIBUTOS_ESPECIFICOS
(
   IDATRIBUTO           int not null  comment '',
   IDPRODUCTO           bigint not null  comment '',
   CARACTERISTICA       varchar(100) not null  comment '',
   VALOR                varchar(1000) not null  comment '',
   primary key (IDATRIBUTO)
);

/*==============================================================*/
/* Table: AVATAR_MASCOTAS                                       */
/*==============================================================*/
create table AVATAR_MASCOTAS
(
   IDAVATARMASCOTA      bigint not null  comment '',
   PATHIMAMASCOTA       varchar(1000)  comment '',
   primary key (IDAVATARMASCOTA)
);

/*==============================================================*/
/* Table: AVATAR_USUARIOS                                       */
/*==============================================================*/
create table AVATAR_USUARIOS
(
   IDIMAGENAVATAR       bigint not null  comment '',
   PATHIMAUSUARIO       varchar(1000) not null  comment '',
   primary key (IDIMAGENAVATAR)
);

/*==============================================================*/
/* Table: CALENDARIOS                                           */
/*==============================================================*/
create table CALENDARIOS
(
   IDEVENTO             int not null  comment '',
   IDFRECUENCIA         int  comment '',
   IDMASCOTA            bigint not null  comment '',
   FECHAEVENTO          datetime not null  comment '',
   ETIQUETA             varchar(20) not null  comment '',
   MOTIVOCALENDARIO     varchar(3000) not null  comment '',
   primary key (IDEVENTO)
);

/*==============================================================*/
/* Table: CARRO_COMPRAS                                         */
/*==============================================================*/
create table CARRO_COMPRAS
(
   IDCARROCOMPRAS       bigint not null  comment '',
   IDUSUARIO            bigint not null  comment '',
   FECHACREACION        timestamp not null  comment '',
   primary key (IDCARROCOMPRAS)
);

/*==============================================================*/
/* Table: CATEGORIAS_PRODUCTO                                   */
/*==============================================================*/
create table CATEGORIAS_PRODUCTO
(
   IDCATEGORIA          int not null  comment '',
   NOMBRECATEGORIA      varchar(100) not null  comment '',
   DESCRIPCIONCATEGORIA varchar(100) not null  comment '',
   primary key (IDCATEGORIA)
);

/*==============================================================*/
/* Table: COMUNAS                                               */
/*==============================================================*/
create table COMUNAS
(
   IDCOMUNA             int not null  comment '',
   IDREGION             int  comment '',
   NOMBRECOMUNA         varchar(100)  comment '',
   primary key (IDCOMUNA)
);

/*==============================================================*/
/* Table: CONDICIONES_ALIMENTARIAS                              */
/*==============================================================*/
create table CONDICIONES_ALIMENTARIAS
(
   IDCONDICION          int not null  comment '',
   CONDICIONALIMENTARIA varchar(100) not null  comment '',
   primary key (IDCONDICION)
);

/*==============================================================*/
/* Table: DETALLES_CARRO_COMPRA                                 */
/*==============================================================*/
create table DETALLES_CARRO_COMPRA
(
   IDDETALLECARRO       bigint not null  comment '',
   IDCARROCOMPRAS       bigint not null  comment '',
   CANTIDAD             int not null  comment '',
   PRECIOUNITARIO       int not null  comment '',
   primary key (IDDETALLECARRO)
);

/*==============================================================*/
/* Table: DETALLES_PEDIDOS                                      */
/*==============================================================*/
create table DETALLES_PEDIDOS
(
   IDDETALLEPEDIDO      bigint not null  comment '',
   IDUSUARIO            bigint  comment '',
   IDPEDIDO             bigint  comment '',
   CANTIDADPRODUCTO     int not null  comment '',
   PRECIOPRODUCTO       int not null  comment '',
   primary key (IDDETALLEPEDIDO)
);

/*==============================================================*/
/* Table: DIRECCIONES                                           */
/*==============================================================*/
create table DIRECCIONES
(
   IDDIRECCION          bigint not null  comment '',
   IDUSUARIO            bigint not null  comment '',
   IDCOMUNA             int  comment '',
   ALIAS                varchar(100) not null  comment '',
   CALLE                longtext not null  comment '',
   NUMERO               char(10) not null  comment '',
   ZIPCODE              int  comment '',
   REFERENCIAS          varchar(1000) not null  comment '',
   PERSONACONTACTO      varchar(100) not null  comment '',
   TELEFONOCONTACTRO    numeric(11,0) not null  comment '',
   primary key (IDDIRECCION)
);

/*==============================================================*/
/* Table: ENFERMEDADES_BASE                                     */
/*==============================================================*/
create table ENFERMEDADES_BASE
(
   IDESNFERMEDAD        int not null  comment '',
   NOMBREENFERMEDAD     varchar(100)  comment '',
   primary key (IDESNFERMEDAD)
);

/*==============================================================*/
/* Table: ESPECIES                                              */
/*==============================================================*/
create table ESPECIES
(
   IDESPECIE            int not null  comment '',
   NOMBREESPECIE        varchar(100) not null  comment '',
   primary key (IDESPECIE)
);

/*==============================================================*/
/* Table: FRECUENCIAS                                           */
/*==============================================================*/
create table FRECUENCIAS
(
   IDFRECUENCIA         int not null  comment '',
   FRECUENCIA           varchar(50) not null  comment '',
   primary key (IDFRECUENCIA)
);

/*==============================================================*/
/* Table: IMAGENES_PRODUCTOS                                    */
/*==============================================================*/
create table IMAGENES_PRODUCTOS
(
   IDIMAGEN             bigint not null  comment '',
   IDPRODUCTO           bigint  comment '',
   PATHIMAPRODUCTOS     varchar(1000) not null  comment '',
   primary key (IDIMAGEN)
);

/*==============================================================*/
/* Table: MARCAS_PRODUCTO                                       */
/*==============================================================*/
create table MARCAS_PRODUCTO
(
   IDMARCA              int not null  comment '',
   NOMBREMARCA          varchar(100) not null  comment '',
   primary key (IDMARCA)
);

/*==============================================================*/
/* Table: MASCOTAS                                              */
/*==============================================================*/
create table MASCOTAS
(
   IDMASCOTA            bigint not null  comment '',
   IDRAZA               int not null  comment '',
   IDAVATARMASCOTA      bigint  comment '',
   NOMBRE               varchar(100) not null  comment '',
   FECHANACIMIENTO      date not null  comment '',
   SEXO                 varchar(15) not null  comment '',
   NUMEROCHIP           varchar(15)  comment '',
   primary key (IDMASCOTA)
);

/*==============================================================*/
/* Table: MASCOTAS_CONDALIMENTARIAS                             */
/*==============================================================*/
create table MASCOTAS_CONDALIMENTARIAS
(
   IDMASCOTA            bigint not null  comment '',
   IDCONDICION          int not null  comment '',
   primary key (IDMASCOTA, IDCONDICION)
);

/*==============================================================*/
/* Table: MASCOTAS_ENFERMEDADES                                 */
/*==============================================================*/
create table MASCOTAS_ENFERMEDADES
(
   IDMASCOTA            bigint not null  comment '',
   IDESNFERMEDAD        int not null  comment '',
   primary key (IDMASCOTA, IDESNFERMEDAD)
);

/*==============================================================*/
/* Table: MASCOTAS_VACUNAS                                      */
/*==============================================================*/
create table MASCOTAS_VACUNAS
(
   IDVACUNA             int not null  comment '',
   IDMASCOTA            bigint not null  comment '',
   primary key (IDVACUNA, IDMASCOTA)
);

/*==============================================================*/
/* Table: PEDIDOS                                               */
/*==============================================================*/
create table PEDIDOS
(
   IDPEDIDO             bigint not null  comment '',
   IDUSUARIO            bigint  comment '',
   FECHACREACION        datetime  comment '',
   FECHAENTRGA          datetime  comment '',
   primary key (IDPEDIDO)
);

/*==============================================================*/
/* Table: PRESENTACIONES_PRODUCTO                               */
/*==============================================================*/
create table PRESENTACIONES_PRODUCTO
(
   IDPRESENTACION       int not null  comment '',
   IDPRODUCTO           bigint  comment '',
   PRECIO               bigint not null  comment '',
   STOCK                int not null  comment '',
   PESO                 int  comment '',
   TAMANIO              int  comment '',
   primary key (IDPRESENTACION)
);

/*==============================================================*/
/* Table: PRODUCTOS                                             */
/*==============================================================*/
create table PRODUCTOS
(
   IDPRODUCTO           bigint not null  comment '',
   IDMARCA              int  comment '',
   IDCATEGORIA          int  comment '',
   NOMBREPRODUCTO       varchar(150) not null  comment '',
   SKU                  varchar(20)  comment '',
   DESCRIPCION          varchar(150)  comment '',
   primary key (IDPRODUCTO)
);

/*==============================================================*/
/* Table: PRODUCTOS_CARRO                                       */
/*==============================================================*/
create table PRODUCTOS_CARRO
(
   IDCARROCOMPRAS       bigint not null  comment '',
   IDPRODUCTO           bigint not null  comment '',
   primary key (IDCARROCOMPRAS, IDPRODUCTO)
);

/*==============================================================*/
/* Table: PRODUCTOS_PEDIDOS                                     */
/*==============================================================*/
create table PRODUCTOS_PEDIDOS
(
   IDPEDIDO             bigint not null  comment '',
   IDPRODUCTO           bigint not null  comment '',
   primary key (IDPEDIDO, IDPRODUCTO)
);

/*==============================================================*/
/* Table: RAZAS                                                 */
/*==============================================================*/
create table RAZAS
(
   IDRAZA               int not null  comment '',
   IDESPECIE            int not null  comment '',
   NOMBRERAZA           varchar(100) not null  comment '',
   primary key (IDRAZA)
);

/*==============================================================*/
/* Table: REGIONES                                              */
/*==============================================================*/
create table REGIONES
(
   IDREGION             int not null  comment '',
   ORDEN                int not null  comment '',
   NOMBREREGION         varchar(100) not null  comment '',
   primary key (IDREGION)
);

/*==============================================================*/
/* Table: REGISTROS_MEDICOS                                     */
/*==============================================================*/
create table REGISTROS_MEDICOS
(
   IDRESGISTROMEDICO    bigint not null  comment '',
   IDMASCOTA            bigint  comment '',
   FECHAREGISTRO        date not null  comment '',
   HORAREGISTRO         time not null  comment '',
   MOTIVO               varchar(3000) not null  comment '',
   primary key (IDRESGISTROMEDICO)
);

/*==============================================================*/
/* Table: ROLES                                                 */
/*==============================================================*/
create table ROLES
(
   IDROL                int not null  comment '',
   ROL                  varchar(20)  comment '',
   primary key (IDROL)
);

/*==============================================================*/
/* Table: USUARIOS                                              */
/*==============================================================*/
create table USUARIOS
(
   IDUSUARIO            bigint not null  comment '',
   IDROL                int  comment '',
   IDIMAGENAVATAR       bigint  comment '',
   RUT                  varchar(12)  comment '',
   NOMBREUSUARIO        varchar(100) not null  comment '',
   APELLIDOS            varchar(100) not null  comment '',
   EMAIL                varchar(100) not null  comment '',
   TELEFONO             int  comment '',
   CONTRASENA           varchar(100)  comment '',
   CHKTERMINOS          bool  comment '',
   CHKOFERTAS           bool  comment '',
   primary key (IDUSUARIO)
);

/*==============================================================*/
/* Table: USUARIOS_MASCOTAS                                     */
/*==============================================================*/
create table USUARIOS_MASCOTAS
(
   IDUSUARIO            bigint not null  comment '',
   IDMASCOTA            bigint not null  comment '',
   primary key (IDUSUARIO, IDMASCOTA)
);

/*==============================================================*/
/* Table: VACUNAS                                               */
/*==============================================================*/
create table VACUNAS
(
   IDVACUNA             int not null  comment '',
   NOMBREVACUNA         varchar(80)  comment '',
   primary key (IDVACUNA)
);

alter table ATRIBUTOS_ESPECIFICOS add constraint PRODUCTO_ATRIESP foreign key (IDPRODUCTO)
      references PRODUCTOS (IDPRODUCTO) on delete restrict on update restrict;

alter table CALENDARIOS add constraint FRECUENCIAS_CALENDARIOS foreign key (IDFRECUENCIA)
      references FRECUENCIAS (IDFRECUENCIA) on delete restrict on update restrict;

alter table CALENDARIOS add constraint MASCOTAS_CALENDARIOS foreign key (IDMASCOTA)
      references MASCOTAS (IDMASCOTA) on delete restrict on update restrict;

alter table CARRO_COMPRAS add constraint USUARIOS_CARCOM foreign key (IDUSUARIO)
      references USUARIOS (IDUSUARIO) on delete restrict on update restrict;

alter table COMUNAS add constraint REGIONES_COMUNAS foreign key (IDREGION)
      references REGIONES (IDREGION) on delete restrict on update restrict;

alter table DETALLES_CARRO_COMPRA add constraint CARRCOMP_DETCARCOM foreign key (IDCARROCOMPRAS)
      references CARRO_COMPRAS (IDCARROCOMPRAS) on delete restrict on update restrict;

alter table DETALLES_PEDIDOS add constraint PEDIDO_DETPEDIDOS foreign key (IDPEDIDO)
      references PEDIDOS (IDPEDIDO) on delete restrict on update restrict;

alter table DIRECCIONES add constraint COMUNAS_DIRECCIONES foreign key (IDCOMUNA)
      references COMUNAS (IDCOMUNA) on delete restrict on update restrict;

alter table DIRECCIONES add constraint USUARIOS_DIRECCIONES foreign key (IDUSUARIO)
      references USUARIOS (IDUSUARIO) on delete restrict on update restrict;

alter table IMAGENES_PRODUCTOS add constraint PRODUCTOS_IMAGPROD foreign key (IDPRODUCTO)
      references PRODUCTOS (IDPRODUCTO) on delete restrict on update restrict;

alter table MASCOTAS add constraint AVAMAS_MASCOTAS foreign key (IDAVATARMASCOTA)
      references AVATAR_MASCOTAS (IDAVATARMASCOTA) on delete restrict on update restrict;

alter table MASCOTAS add constraint RAZAS_MASCOTAS foreign key (IDRAZA)
      references RAZAS (IDRAZA) on delete restrict on update restrict;

alter table MASCOTAS_CONDALIMENTARIAS add constraint CONDICIONES_MASCONDALI foreign key (IDCONDICION)
      references CONDICIONES_ALIMENTARIAS (IDCONDICION) on delete restrict on update restrict;

alter table MASCOTAS_CONDALIMENTARIAS add constraint MASCOTAS_MASCONDALI foreign key (IDMASCOTA)
      references MASCOTAS (IDMASCOTA) on delete restrict on update restrict;

alter table MASCOTAS_ENFERMEDADES add constraint MASCOTAS_MASENF foreign key (IDMASCOTA)
      references MASCOTAS (IDMASCOTA) on delete restrict on update restrict;

alter table MASCOTAS_ENFERMEDADES add constraint ENFERBASE_MASENF foreign key (IDESNFERMEDAD)
      references ENFERMEDADES_BASE (IDESNFERMEDAD) on delete restrict on update restrict;

alter table MASCOTAS_VACUNAS add constraint VACUNAS_MASVAC foreign key (IDVACUNA)
      references VACUNAS (IDVACUNA) on delete restrict on update restrict;

alter table MASCOTAS_VACUNAS add constraint MASCOTAS_MASVAC foreign key (IDMASCOTA)
      references MASCOTAS (IDMASCOTA) on delete restrict on update restrict;

alter table PEDIDOS add constraint USUARIOS_PEDIDOS foreign key (IDUSUARIO)
      references USUARIOS (IDUSUARIO) on delete restrict on update restrict;

alter table PRESENTACIONES_PRODUCTO add constraint PRODUCTO_PRESPRO foreign key (IDPRODUCTO)
      references PRODUCTOS (IDPRODUCTO) on delete restrict on update restrict;

alter table PRODUCTOS add constraint PRODUCTO_CATPROD foreign key (IDCATEGORIA)
      references CATEGORIAS_PRODUCTO (IDCATEGORIA) on delete restrict on update restrict;

alter table PRODUCTOS add constraint MARCAPROD_PROD foreign key (IDMARCA)
      references MARCAS_PRODUCTO (IDMARCA) on delete restrict on update restrict;

alter table PRODUCTOS_CARRO add constraint CARROCOM_PRODAC foreign key (IDCARROCOMPRAS)
      references CARRO_COMPRAS (IDCARROCOMPRAS) on delete restrict on update restrict;

alter table PRODUCTOS_CARRO add constraint PRODUCTOS_PROCAR foreign key (IDPRODUCTO)
      references PRODUCTOS (IDPRODUCTO) on delete restrict on update restrict;

alter table PRODUCTOS_PEDIDOS add constraint PRODUCTO_PRODPED foreign key (IDPRODUCTO)
      references PRODUCTOS (IDPRODUCTO) on delete restrict on update restrict;

alter table PRODUCTOS_PEDIDOS add constraint PEDIDOS_PROPED foreign key (IDPEDIDO)
      references PEDIDOS (IDPEDIDO) on delete restrict on update restrict;

alter table RAZAS add constraint ESPECIES_RAZAS foreign key (IDESPECIE)
      references ESPECIES (IDESPECIE) on delete restrict on update restrict;

alter table REGISTROS_MEDICOS add constraint MASCOTAS_REGMED foreign key (IDMASCOTA)
      references MASCOTAS (IDMASCOTA) on delete restrict on update restrict;

alter table USUARIOS add constraint AVATARUSU_USUARIOS foreign key (IDIMAGENAVATAR)
      references AVATAR_USUARIOS (IDIMAGENAVATAR) on delete restrict on update restrict;

alter table USUARIOS add constraint ROLES_USUARIOS foreign key (IDROL)
      references ROLES (IDROL) on delete restrict on update restrict;

alter table USUARIOS_MASCOTAS add constraint USURIOS_USUMAS foreign key (IDUSUARIO)
      references USUARIOS (IDUSUARIO) on delete restrict on update restrict;

alter table USUARIOS_MASCOTAS add constraint MASCOTAS_USUMAS foreign key (IDMASCOTA)
      references MASCOTAS (IDMASCOTA) on delete restrict on update restrict;
