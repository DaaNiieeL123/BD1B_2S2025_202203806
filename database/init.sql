-- ============================================
-- PROYECTO FASE 2: CENTROS DE EVALUACIÓN DE MANEJO
-- Esquema DDL - Inicialización Automática
-- ============================================
-- Modelo Relacional completo de la Fase 1
-- ============================================

-- Eliminar tablas si existen (en orden inverso por dependencias)
BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE respuesta_practico_usuario CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/
BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE respuesta_usuario CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/
BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE examen CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/
BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE correlativo CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/
BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE registro CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/
BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE ubicacion CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/
BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE pregunta_practico CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/
BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE pregunta CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/
BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE municipio CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/
BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE departamento CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/
BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE escuela CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/
BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE centro CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/
BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE tipo_licencia CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/
BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE tipo_tramite CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/
BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE genero_catalogo CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

-- Eliminar secuencias si existen
BEGIN EXECUTE IMMEDIATE 'DROP SEQUENCE seq_centro'; EXCEPTION WHEN OTHERS THEN NULL; END;
/
BEGIN EXECUTE IMMEDIATE 'DROP SEQUENCE seq_escuela'; EXCEPTION WHEN OTHERS THEN NULL; END;
/
BEGIN EXECUTE IMMEDIATE 'DROP SEQUENCE seq_departamento'; EXCEPTION WHEN OTHERS THEN NULL; END;
/
BEGIN EXECUTE IMMEDIATE 'DROP SEQUENCE seq_municipio'; EXCEPTION WHEN OTHERS THEN NULL; END;
/
BEGIN EXECUTE IMMEDIATE 'DROP SEQUENCE seq_pregunta'; EXCEPTION WHEN OTHERS THEN NULL; END;
/
BEGIN EXECUTE IMMEDIATE 'DROP SEQUENCE seq_pregunta_practico'; EXCEPTION WHEN OTHERS THEN NULL; END;
/
BEGIN EXECUTE IMMEDIATE 'DROP SEQUENCE seq_registro'; EXCEPTION WHEN OTHERS THEN NULL; END;
/
BEGIN EXECUTE IMMEDIATE 'DROP SEQUENCE seq_correlativo'; EXCEPTION WHEN OTHERS THEN NULL; END;
/
BEGIN EXECUTE IMMEDIATE 'DROP SEQUENCE seq_examen'; EXCEPTION WHEN OTHERS THEN NULL; END;
/
BEGIN EXECUTE IMMEDIATE 'DROP SEQUENCE seq_respuesta_usuario'; EXCEPTION WHEN OTHERS THEN NULL; END;
/
BEGIN EXECUTE IMMEDIATE 'DROP SEQUENCE seq_respuesta_practico_usuario'; EXCEPTION WHEN OTHERS THEN NULL; END;
/

-- ============================================
-- CATÁLOGOS 
-- ============================================

CREATE TABLE tipo_licencia (
    tipo_licencia CHAR(1) NOT NULL,
    descripcion_licencia VARCHAR2(50) NOT NULL,
    CONSTRAINT pk_tipo_licencia PRIMARY KEY (tipo_licencia),
    CONSTRAINT chk_tipo_licencia CHECK (tipo_licencia IN ('M', 'B', 'A', 'E', 'C'))
);

COMMENT ON TABLE tipo_licencia IS 'Catálogo de tipos de licencia';
COMMENT ON COLUMN tipo_licencia.tipo_licencia IS 'Código: M=Moto, B=Liviana, A=Profesional, E=Agrícola, C=Otro';
COMMENT ON COLUMN tipo_licencia.descripcion_licencia IS 'Descripción del tipo de licencia';

CREATE TABLE tipo_tramite (
    tipo_tramite VARCHAR2(30) NOT NULL,
    descripcion_tramite VARCHAR2(100),
    CONSTRAINT pk_tipo_tramite PRIMARY KEY (tipo_tramite),
    CONSTRAINT chk_tipo_tramite CHECK (tipo_tramite IN ('PRIMER_LICENCIA', 'TRASPASO'))
);

COMMENT ON TABLE tipo_tramite IS 'Catálogo de tipos de trámite';

CREATE TABLE genero_catalogo (
    genero CHAR(1) NOT NULL,
    descripcion_genero VARCHAR2(20) NOT NULL,
    CONSTRAINT pk_genero PRIMARY KEY (genero),
    CONSTRAINT chk_genero CHECK (genero IN ('M','F'))
);

COMMENT ON TABLE genero_catalogo IS 'Catálogo de géneros (códigos M/F)';

-- ============================================
-- TABLAS PRINCIPALES
-- ============================================

-- 1. TABLA CENTRO
CREATE TABLE centro (
    id_centro NUMBER NOT NULL,
    nombre_centro VARCHAR2(100) NOT NULL,
    CONSTRAINT pk_centro PRIMARY KEY (id_centro)
);

COMMENT ON TABLE centro IS 'Centros de evaluación';

-- 2. TABLA ESCUELA
CREATE TABLE escuela (
    id_escuela NUMBER NOT NULL,
    nombre_escuela VARCHAR2(150) NOT NULL,
    direccion_escuela VARCHAR2(250) NOT NULL,
    numero_acuerdo VARCHAR2(50) NOT NULL,
    CONSTRAINT pk_escuela PRIMARY KEY (id_escuela)
);

COMMENT ON TABLE escuela IS 'Escuelas de automovilismo';

-- 3. TABLA DEPARTAMENTO
CREATE TABLE departamento (
    id_departamento NUMBER NOT NULL,
    nombre_departamento VARCHAR2(100) NOT NULL,
    codigo_departamento VARCHAR2(10),
    CONSTRAINT pk_departamento PRIMARY KEY (id_departamento)
);

COMMENT ON TABLE departamento IS 'Departamentos de Guatemala';

-- 4. TABLA MUNICIPIO
CREATE TABLE municipio (
    id_municipio NUMBER NOT NULL,
    id_departamento NUMBER NOT NULL,
    nombre_municipio VARCHAR2(100) NOT NULL,
    codigo_municipio VARCHAR2(10),
    CONSTRAINT pk_municipio PRIMARY KEY (id_municipio),
    CONSTRAINT fk_municipio_departamento FOREIGN KEY (id_departamento) 
        REFERENCES departamento(id_departamento)
);

COMMENT ON TABLE municipio IS 'Municipios por departamento';

-- 5. TABLA UBICACION (Relación escuela-centro)
CREATE TABLE ubicacion (
    id_escuela NUMBER NOT NULL,
    id_centro NUMBER NOT NULL,
    CONSTRAINT pk_ubicacion PRIMARY KEY (id_escuela, id_centro),
    CONSTRAINT fk_ubicacion_escuela FOREIGN KEY (id_escuela) 
        REFERENCES escuela(id_escuela),
    CONSTRAINT fk_ubicacion_centro FOREIGN KEY (id_centro) 
        REFERENCES centro(id_centro)
);

COMMENT ON TABLE ubicacion IS 'Relación de escuelas que operan en centros';

-- 6. TABLA PREGUNTA (Preguntas teóricas)
CREATE TABLE pregunta (
    id_pregunta NUMBER NOT NULL,
    pregunta_texto CLOB NOT NULL,
    respuesta_correcta NUMBER NOT NULL,
    opcion_1 VARCHAR2(500) NOT NULL,
    opcion_2 VARCHAR2(500) NOT NULL,
    opcion_3 VARCHAR2(500) NOT NULL,
    opcion_4 VARCHAR2(500) NOT NULL,
    CONSTRAINT pk_pregunta PRIMARY KEY (id_pregunta),
    CONSTRAINT chk_respuesta_correcta CHECK (respuesta_correcta IN (1, 2, 3, 4))
);

COMMENT ON TABLE pregunta IS 'Banco de preguntas teóricas con opciones múltiples';

-- 7. TABLA PREGUNTA_PRACTICO
CREATE TABLE pregunta_practico (
    id_pregunta_practico NUMBER NOT NULL,
    pregunta_texto VARCHAR2(500) NOT NULL,
    punteo_maximo NUMBER(2) DEFAULT 10 NOT NULL,
    CONSTRAINT pk_pregunta_practico PRIMARY KEY (id_pregunta_practico),
    CONSTRAINT chk_punteo_maximo CHECK (punteo_maximo > 0 AND punteo_maximo <= 10)
);

COMMENT ON TABLE pregunta_practico IS 'Procedimientos para evaluación práctica';

-- 8. TABLA REGISTRO
CREATE TABLE registro (
    id_registro NUMBER NOT NULL,
    id_escuela NUMBER NOT NULL,
    id_centro NUMBER NOT NULL,
    id_municipio NUMBER NOT NULL,
    id_departamento NUMBER NOT NULL,
    fecha_registro DATE NOT NULL,
    tipo_tramite VARCHAR2(30) NOT NULL,
    tipo_licencia CHAR(1) NOT NULL,
    nombre_completo VARCHAR2(200) NOT NULL,
    genero CHAR(1) NOT NULL,
    CONSTRAINT pk_registro PRIMARY KEY (id_registro),
    CONSTRAINT fk_registro_escuela FOREIGN KEY (id_escuela) 
        REFERENCES escuela(id_escuela),
    CONSTRAINT fk_registro_centro FOREIGN KEY (id_centro) 
        REFERENCES centro(id_centro),
    CONSTRAINT fk_registro_municipio FOREIGN KEY (id_municipio) 
        REFERENCES municipio(id_municipio),
    CONSTRAINT fk_registro_departamento FOREIGN KEY (id_departamento) 
        REFERENCES departamento(id_departamento),
    CONSTRAINT fk_registro_tipo_licencia FOREIGN KEY (tipo_licencia)
        REFERENCES tipo_licencia(tipo_licencia),
    CONSTRAINT fk_registro_tipo_tramite FOREIGN KEY (tipo_tramite)
        REFERENCES tipo_tramite(tipo_tramite),
    CONSTRAINT fk_registro_genero FOREIGN KEY (genero)
        REFERENCES genero_catalogo(genero)
);

COMMENT ON TABLE registro IS 'Registro de personas que solicitan examen';

-- 9. TABLA CORRELATIVO
CREATE TABLE correlativo (
    id_correlativo NUMBER NOT NULL,
    fecha_correlativo DATE NOT NULL,
    no_examen NUMBER NOT NULL,
    CONSTRAINT pk_correlativo PRIMARY KEY (id_correlativo),
    CONSTRAINT uk_correlativo_fecha_no UNIQUE (fecha_correlativo, no_examen)
);

COMMENT ON TABLE correlativo IS 'Correlativos diarios de exámenes';

-- 10. TABLA EXAMEN
CREATE TABLE examen (
    id_examen NUMBER NOT NULL,
    id_escuela NUMBER NOT NULL,
    id_centro NUMBER NOT NULL,
    id_municipio NUMBER NOT NULL,
    id_departamento NUMBER NOT NULL,
    id_registro NUMBER NOT NULL,
    id_correlativo NUMBER NOT NULL,
    CONSTRAINT pk_examen PRIMARY KEY (id_examen),
    CONSTRAINT fk_examen_escuela FOREIGN KEY (id_escuela) 
        REFERENCES escuela(id_escuela),
    CONSTRAINT fk_examen_centro FOREIGN KEY (id_centro) 
        REFERENCES centro(id_centro),
    CONSTRAINT fk_examen_municipio FOREIGN KEY (id_municipio) 
        REFERENCES municipio(id_municipio),
    CONSTRAINT fk_examen_departamento FOREIGN KEY (id_departamento) 
        REFERENCES departamento(id_departamento),
    CONSTRAINT fk_examen_registro FOREIGN KEY (id_registro) 
        REFERENCES registro(id_registro),
    CONSTRAINT fk_examen_correlativo FOREIGN KEY (id_correlativo) 
        REFERENCES correlativo(id_correlativo)
);

COMMENT ON TABLE examen IS 'Exámenes realizados';

-- 11. TABLA RESPUESTA_USUARIO (Respuestas teóricas)
CREATE TABLE respuesta_usuario (
    id_respuesta_usuario NUMBER NOT NULL,
    id_pregunta NUMBER NOT NULL,
    id_examen NUMBER NOT NULL,
    respuesta_seleccionada NUMBER NOT NULL,
    CONSTRAINT pk_respuesta_usuario PRIMARY KEY (id_respuesta_usuario),
    CONSTRAINT fk_respuesta_pregunta FOREIGN KEY (id_pregunta) 
        REFERENCES pregunta(id_pregunta),
    CONSTRAINT fk_respuesta_examen FOREIGN KEY (id_examen) 
        REFERENCES examen(id_examen),
    CONSTRAINT chk_respuesta_seleccionada CHECK (respuesta_seleccionada IN (1, 2, 3, 4))
);

COMMENT ON TABLE respuesta_usuario IS 'Respuestas del usuario en examen teórico';

-- 12. TABLA RESPUESTA_PRACTICO_USUARIO
CREATE TABLE respuesta_practico_usuario (
    id_respuesta_practico NUMBER NOT NULL,
    id_pregunta_practico NUMBER NOT NULL,
    id_examen NUMBER NOT NULL,
    nota_obtenida NUMBER(2) NOT NULL,
    CONSTRAINT pk_respuesta_practico_usuario PRIMARY KEY (id_respuesta_practico),
    CONSTRAINT fk_respuesta_practico_pregunta FOREIGN KEY (id_pregunta_practico) 
        REFERENCES pregunta_practico(id_pregunta_practico),
    CONSTRAINT fk_respuesta_practico_examen FOREIGN KEY (id_examen) 
        REFERENCES examen(id_examen),
    CONSTRAINT chk_nota_obtenida CHECK (nota_obtenida >= 0 AND nota_obtenida <= 10)
);

COMMENT ON TABLE respuesta_practico_usuario IS 'Calificaciones del usuario en examen práctico';

-- ============================================
-- ÍNDICES PARA MEJOR RENDIMIENTO
-- ============================================

CREATE INDEX idx_registro_fecha ON registro(fecha_registro);
CREATE INDEX idx_examen_registro ON examen(id_registro);
CREATE INDEX idx_respuesta_usuario_examen ON respuesta_usuario(id_examen);
CREATE INDEX idx_respuesta_practico_examen ON respuesta_practico_usuario(id_examen);

-- ============================================
-- SECUENCIAS PARA CLAVES PRIMARIAS
-- ============================================

CREATE SEQUENCE seq_centro START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_escuela START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_departamento START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_municipio START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_pregunta START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_pregunta_practico START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_registro START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_correlativo START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_examen START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_respuesta_usuario START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_respuesta_practico_usuario START WITH 1 INCREMENT BY 1;

-- ============================================
-- DATOS INICIALES PARA CATÁLOGOS
-- ============================================

-- Tipos de licencia
INSERT INTO tipo_licencia (tipo_licencia, descripcion_licencia) VALUES ('M', 'Motocicleta');
INSERT INTO tipo_licencia (tipo_licencia, descripcion_licencia) VALUES ('B', 'Liviana');
INSERT INTO tipo_licencia (tipo_licencia, descripcion_licencia) VALUES ('A', 'Profesional');
INSERT INTO tipo_licencia (tipo_licencia, descripcion_licencia) VALUES ('E', 'Agrícola');
INSERT INTO tipo_licencia (tipo_licencia, descripcion_licencia) VALUES ('C', 'Otro');

-- Tipos de trámite
INSERT INTO tipo_tramite (tipo_tramite, descripcion_tramite) VALUES ('PRIMER_LICENCIA', 'Primera vez solicitando licencia');
INSERT INTO tipo_tramite (tipo_tramite, descripcion_tramite) VALUES ('TRASPASO', 'Traspaso de licencia');

-- Géneros
INSERT INTO genero_catalogo (genero, descripcion_genero) VALUES ('M', 'Masculino');
INSERT INTO genero_catalogo (genero, descripcion_genero) VALUES ('F', 'Femenino');

COMMIT;

-- Mensaje de confirmación
SELECT 'Schema EVALUACION_MANEJO inicializado correctamente con ' || 
       (SELECT COUNT(*) FROM user_tables) || ' tablas' AS status FROM DUAL;
