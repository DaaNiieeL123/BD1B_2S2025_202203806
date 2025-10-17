-- ============================================
-- Script para LIMPIAR todos los datos
-- Mantiene la estructura (tablas, secuencias)
-- Borra SOLO los datos
-- ============================================

-- Deshabilitar constraints temporalmente
BEGIN
  FOR c IN (SELECT table_name, constraint_name 
            FROM user_constraints 
            WHERE constraint_type = 'R') 
  LOOP
    EXECUTE IMMEDIATE 'ALTER TABLE ' || c.table_name || 
                      ' DISABLE CONSTRAINT ' || c.constraint_name;
  END LOOP;
END;
/

-- Borrar datos de todas las tablas (en orden para evitar conflictos)
DELETE FROM respuesta_practico_usuario;
DELETE FROM respuesta_usuario;
DELETE FROM examen;
DELETE FROM registro;
DELETE FROM ubicacion;
DELETE FROM pregunta_practico;
DELETE FROM pregunta;
DELETE FROM correlativo;
DELETE FROM municipio;
DELETE FROM departamento;
DELETE FROM escuela;
DELETE FROM centro;
DELETE FROM tipo_tramite;
DELETE FROM tipo_licencia;
DELETE FROM genero_catalogo;

COMMIT;

-- Habilitar constraints nuevamente
BEGIN
  FOR c IN (SELECT table_name, constraint_name 
            FROM user_constraints 
            WHERE constraint_type = 'R') 
  LOOP
    EXECUTE IMMEDIATE 'ALTER TABLE ' || c.table_name || 
                      ' ENABLE CONSTRAINT ' || c.constraint_name;
  END LOOP;
END;
/

-- Reiniciar secuencias a 1
BEGIN
  FOR s IN (SELECT sequence_name FROM user_sequences) 
  LOOP
    EXECUTE IMMEDIATE 'DROP SEQUENCE ' || s.sequence_name;
  END LOOP;
END;
/

-- Recrear secuencias
CREATE SEQUENCE seq_centro START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_escuela START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_departamento START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_municipio START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_pregunta START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_pregunta_practico START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_correlativo START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_registro START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_examen START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_respuesta_usuario START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_respuesta_practico START WITH 1 INCREMENT BY 1;

COMMIT;

-- Verificar que las tablas están vacías
SELECT 'CENTRO' AS tabla, COUNT(*) AS registros FROM centro
UNION ALL
SELECT 'ESCUELA', COUNT(*) FROM escuela
UNION ALL
SELECT 'DEPARTAMENTO', COUNT(*) FROM departamento
UNION ALL
SELECT 'MUNICIPIO', COUNT(*) FROM municipio
UNION ALL
SELECT 'PREGUNTA', COUNT(*) FROM pregunta
UNION ALL
SELECT 'PREGUNTA_PRACTICO', COUNT(*) FROM pregunta_practico
UNION ALL
SELECT 'CORRELATIVO', COUNT(*) FROM correlativo
UNION ALL
SELECT 'REGISTRO', COUNT(*) FROM registro
UNION ALL
SELECT 'EXAMEN', COUNT(*) FROM examen
UNION ALL
SELECT 'RESPUESTA_USUARIO', COUNT(*) FROM respuesta_usuario
UNION ALL
SELECT 'RESPUESTA_PRACTICO_USUARIO', COUNT(*) FROM respuesta_practico_usuario
UNION ALL
SELECT 'UBICACION', COUNT(*) FROM ubicacion
UNION ALL
SELECT 'TIPO_LICENCIA', COUNT(*) FROM tipo_licencia
UNION ALL
SELECT 'TIPO_TRAMITE', COUNT(*) FROM tipo_tramite
UNION ALL
SELECT 'GENERO_CATALOGO', COUNT(*) FROM genero_catalogo
ORDER BY tabla;
