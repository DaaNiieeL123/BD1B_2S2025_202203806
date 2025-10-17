-- ============================================
-- SCRIPT DE DATOS DE PRUEBA
-- Sistema de Centros de Evaluación de Manejo
-- ============================================

-- Insertar Departamentos
INSERT INTO departamento (id_departamento, nombre_departamento, codigo_departamento) 
VALUES (seq_departamento.NEXTVAL, 'Guatemala', '01');

INSERT INTO departamento (id_departamento, nombre_departamento, codigo_departamento) 
VALUES (seq_departamento.NEXTVAL, 'Alta Verapaz', '16');

INSERT INTO departamento (id_departamento, nombre_departamento, codigo_departamento) 
VALUES (seq_departamento.NEXTVAL, 'Sacatepéquez', '03');

-- Insertar Municipios
INSERT INTO municipio (id_municipio, id_departamento, nombre_municipio, codigo_municipio) 
VALUES (seq_municipio.NEXTVAL, 1, 'Guatemala', '0101');

INSERT INTO municipio (id_municipio, id_departamento, nombre_municipio, codigo_municipio) 
VALUES (seq_municipio.NEXTVAL, 1, 'Mixco', '0108');

INSERT INTO municipio (id_municipio, id_departamento, nombre_municipio, codigo_municipio) 
VALUES (seq_municipio.NEXTVAL, 2, 'Cobán', '1601');

INSERT INTO municipio (id_municipio, id_departamento, nombre_municipio, codigo_municipio) 
VALUES (seq_municipio.NEXTVAL, 3, 'Antigua Guatemala', '0301');

-- Insertar Centros de Evaluación
INSERT INTO centro (id_centro, nombre_centro) 
VALUES (seq_centro.NEXTVAL, 'Centro de Evaluación Guatemala Norte');

INSERT INTO centro (id_centro, nombre_centro) 
VALUES (seq_centro.NEXTVAL, 'Centro de Evaluación Guatemala Sur');

INSERT INTO centro (id_centro, nombre_centro) 
VALUES (seq_centro.NEXTVAL, 'Centro de Evaluación Zona 10');

-- Insertar Escuelas de Manejo
INSERT INTO escuela (id_escuela, nombre_escuela, direccion_escuela, numero_acuerdo) 
VALUES (seq_escuela.NEXTVAL, 'Academia de Manejo Profesional GT', '5ta Avenida 10-50 Zona 1', 'ACU-2024-001');

INSERT INTO escuela (id_escuela, nombre_escuela, direccion_escuela, numero_acuerdo) 
VALUES (seq_escuela.NEXTVAL, 'Escuela de Conducción El Piloto', 'Calzada Roosevelt 25-30 Zona 11', 'ACU-2024-002');

INSERT INTO escuela (id_escuela, nombre_escuela, direccion_escuela, numero_acuerdo) 
VALUES (seq_escuela.NEXTVAL, 'Centro de Capacitación Vial', '12 Calle 3-45 Zona 9', 'ACU-2024-003');

-- Insertar Ubicaciones (Escuela-Centro)
INSERT INTO ubicacion (id_escuela, id_centro) VALUES (1, 1);
INSERT INTO ubicacion (id_escuela, id_centro) VALUES (1, 2);
INSERT INTO ubicacion (id_escuela, id_centro) VALUES (2, 1);
INSERT INTO ubicacion (id_escuela, id_centro) VALUES (2, 3);
INSERT INTO ubicacion (id_escuela, id_centro) VALUES (3, 2);
INSERT INTO ubicacion (id_escuela, id_centro) VALUES (3, 3);

-- Insertar Preguntas Teóricas
INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        '¿Cuál es la velocidad máxima permitida en zona escolar?', 
        1, '20 km/h', '40 km/h', '60 km/h', '80 km/h');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        '¿Qué significa una señal de tránsito octagonal de color rojo?', 
        2, 'Ceda el paso', 'Alto total', 'Prohibido estacionar', 'Zona escolar');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        '¿A qué distancia debe colocar el triángulo de seguridad en carretera?', 
        3, '10 metros', '25 metros', '50 metros', '100 metros');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        '¿Qué color de luz indica que puede avanzar en un semáforo?', 
        2, 'Rojo', 'Verde', 'Amarillo', 'Azul');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        '¿Cuándo debe usar las luces altas del vehículo?', 
        1, 'En carreteras oscuras sin tráfico', 'En la ciudad', 'En lluvia intensa', 'Siempre');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        '¿Qué debe hacer al llegar a un cruce sin señalización?', 
        3, 'Acelerar para pasar rápido', 'Tocar bocina', 'Ceder el paso al vehículo de la derecha', 'Detenerse completamente');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        '¿Cuál es el límite de alcohol permitido en sangre para conducir?', 
        1, '0.0%', '0.5%', '1.0%', '1.5%');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        '¿Qué indica una línea amarilla continua en el pavimento?', 
        4, 'Puede adelantar', 'Estacionamiento permitido', 'Zona de descarga', 'Prohibido adelantar');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        '¿A qué edad mínima se puede obtener licencia tipo B?', 
        2, '16 años', '18 años', '21 años', '25 años');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        '¿Qué documento NO es necesario para tramitar licencia?', 
        3, 'DPI', 'Certificado médico', 'Título universitario', 'Constancia de escuela');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        '¿Cuántos puntos tiene el examen teórico completo?', 
        4, '50 puntos', '75 puntos', '90 puntos', '100 puntos');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        '¿Qué significa una señal triangular con borde rojo?', 
        1, 'Prevención o advertencia', 'Prohibición', 'Información', 'Reglamentación');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        '¿En qué lado debe adelantar a otro vehículo?', 
        2, 'Por la derecha', 'Por la izquierda', 'Por cualquier lado', 'No se debe adelantar');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        '¿Qué debe verificar antes de arrancar el vehículo?', 
        4, 'Solo el combustible', 'Solo los frenos', 'Solo las llantas', 'Todos los anteriores');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        '¿Cuándo debe ceder el paso a un peatón?', 
        1, 'Siempre', 'Solo en pasos de cebra', 'Solo si hay policía', 'Nunca');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        '¿Qué hacer si el semáforo está en amarillo?', 
        3, 'Acelerar', 'Detenerse bruscamente', 'Prepararse para detenerse', 'Ignorarlo');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        '¿Dónde NO está permitido estacionar?', 
        2, 'En parqueos públicos', 'Frente a hidrantes', 'En su garaje', 'En zona verde');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        '¿Qué equipo de seguridad es obligatorio en el vehículo?', 
        4, 'Radio', 'GPS', 'Aire acondicionado', 'Extinguidor y botiquín');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        '¿Cada cuánto debe renovar la licencia de conducir?', 
        3, '1 año', '3 años', '5 años', '10 años');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        '¿Qué indica una luz intermitente amarilla en semáforo?', 
        2, 'Alto total', 'Precaución, avanzar con cuidado', 'Vía libre', 'Retroceder');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        '¿Cuál es la distancia de frenado en lluvia?', 
        4, 'Igual que en seco', 'La mitad', 'El doble', 'El triple o más');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        '¿Qué hacer en caso de accidente de tránsito?', 
        1, 'Señalizar y llamar a emergencias', 'Huir del lugar', 'Mover los vehículos inmediatamente', 'Discutir con el otro conductor');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        '¿Cuándo debe usar el cinturón de seguridad?', 
        2, 'Solo en carretera', 'Siempre', 'Solo si hay tráfico', 'Solo el conductor');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        '¿Qué significa señal circular con fondo azul?', 
        3, 'Prohibición', 'Advertencia', 'Información u obligación', 'Alto');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        '¿A qué velocidad máxima puede circular en ciudad?', 
        2, '40 km/h', '60 km/h', '80 km/h', '100 km/h');

-- Insertar Preguntas Prácticas
INSERT INTO pregunta_practico (id_pregunta_practico, pregunta_texto, punteo_maximo) 
VALUES (seq_pregunta_practico.NEXTVAL, 'Estacionamiento en paralelo', 10);

INSERT INTO pregunta_practico (id_pregunta_practico, pregunta_texto, punteo_maximo) 
VALUES (seq_pregunta_practico.NEXTVAL, 'Arranque en pendiente', 10);

INSERT INTO pregunta_practico (id_pregunta_practico, pregunta_texto, punteo_maximo) 
VALUES (seq_pregunta_practico.NEXTVAL, 'Giro en U controlado', 10);

INSERT INTO pregunta_practico (id_pregunta_practico, pregunta_texto, punteo_maximo) 
VALUES (seq_pregunta_practico.NEXTVAL, 'Marcha atrás en línea recta', 10);

INSERT INTO pregunta_practico (id_pregunta_practico, pregunta_texto, punteo_maximo) 
VALUES (seq_pregunta_practico.NEXTVAL, 'Cambios de carril', 10);

INSERT INTO pregunta_practico (id_pregunta_practico, pregunta_texto, punteo_maximo) 
VALUES (seq_pregunta_practico.NEXTVAL, 'Frenado de emergencia', 10);

INSERT INTO pregunta_practico (id_pregunta_practico, pregunta_texto, punteo_maximo) 
VALUES (seq_pregunta_practico.NEXTVAL, 'Manejo en rotonda', 10);

INSERT INTO pregunta_practico (id_pregunta_practico, pregunta_texto, punteo_maximo) 
VALUES (seq_pregunta_practico.NEXTVAL, 'Respeto a señales de tránsito', 10);

INSERT INTO pregunta_practico (id_pregunta_practico, pregunta_texto, punteo_maximo) 
VALUES (seq_pregunta_practico.NEXTVAL, 'Uso de espejos retrovisores', 10);

INSERT INTO pregunta_practico (id_pregunta_practico, pregunta_texto, punteo_maximo) 
VALUES (seq_pregunta_practico.NEXTVAL, 'Conducción en tráfico urbano', 10);

COMMIT;

-- Mensaje de confirmación
SELECT 'Datos de prueba insertados exitosamente' AS status FROM DUAL;
SELECT 'Centros: ' || COUNT(*) FROM centro UNION ALL
SELECT 'Escuelas: ' || COUNT(*) FROM escuela UNION ALL
SELECT 'Departamentos: ' || COUNT(*) FROM departamento UNION ALL
SELECT 'Municipios: ' || COUNT(*) FROM municipio UNION ALL
SELECT 'Preguntas teóricas: ' || COUNT(*) FROM pregunta UNION ALL
SELECT 'Preguntas prácticas: ' || COUNT(*) FROM pregunta_practico;
