-- ============================================
-- CREAR USUARIO Y SCHEMA PARA LA APLICACIÓN
-- ============================================
-- Script: create_schema.sql
-- Descripción: Crea el usuario/schema EVALUACION_MANEJO en Oracle PDB
-- Autor: Héctor Daniel Ortiz Osorio - 202203806
-- Fecha: Octubre 2025
-- Nota: Este script debe ejecutarse conectado a XEPDB1 (no a CDB$ROOT)
-- ============================================================================

-- Establecer formato de salida
SET SERVEROUTPUT ON
SET ECHO OFF
SET VERIFY OFF
SET FEEDBACK ON

-- Verificar que estamos en el PDB correcto
WHENEVER SQLERROR EXIT SQL.SQLCODE
DECLARE
    v_con_name VARCHAR2(30);
BEGIN
    SELECT SYS_CONTEXT('USERENV', 'CON_NAME') INTO v_con_name FROM DUAL;
    IF v_con_name = 'CDB$ROOT' THEN
        RAISE_APPLICATION_ERROR(-20001, 'ERROR: Debes conectarte a XEPDB1, no a CDB$ROOT');
    END IF;
    DBMS_OUTPUT.PUT_LINE('✅ Conectado a: ' || v_con_name);
END;
/
WHENEVER SQLERROR CONTINUE

-- Eliminar usuario si existe (incluye CASCADE para eliminar objetos)
BEGIN
    EXECUTE IMMEDIATE 'DROP USER evaluacion_manejo CASCADE';
    DBMS_OUTPUT.PUT_LINE('Usuario evaluacion_manejo eliminado');
EXCEPTION
    WHEN OTHERS THEN
        IF SQLCODE != -1918 THEN -- -1918 = user does not exist
            RAISE;
        END IF;
END;
/

-- Crear usuario (sin prefijo C## porque estamos en PDB)
CREATE USER evaluacion_manejo IDENTIFIED BY EvaluacionPass123
    DEFAULT TABLESPACE USERS
    TEMPORARY TABLESPACE TEMP
    QUOTA UNLIMITED ON USERS;

-- Otorgar permisos necesarios
GRANT CONNECT TO evaluacion_manejo;
GRANT RESOURCE TO evaluacion_manejo;
GRANT CREATE SESSION TO evaluacion_manejo;
GRANT CREATE TABLE TO evaluacion_manejo;
GRANT CREATE VIEW TO evaluacion_manejo;
GRANT CREATE SEQUENCE TO evaluacion_manejo;
GRANT CREATE PROCEDURE TO evaluacion_manejo;
GRANT CREATE TRIGGER TO evaluacion_manejo;

-- Permisos adicionales para desarrollo
GRANT SELECT ANY TABLE TO evaluacion_manejo;
GRANT INSERT ANY TABLE TO evaluacion_manejo;
GRANT UPDATE ANY TABLE TO evaluacion_manejo;
GRANT DELETE ANY TABLE TO evaluacion_manejo;

-- Confirmar creación
SELECT 'Usuario EVALUACION_MANEJO creado exitosamente' AS mensaje FROM dual;
SELECT username, default_tablespace, account_status 
FROM dba_users 
WHERE username = 'EVALUACION_MANEJO';

EXIT;
