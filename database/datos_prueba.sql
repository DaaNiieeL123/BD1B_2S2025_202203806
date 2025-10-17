-- ============================================
-- SCRIPT DE DATOS DE PRUEBA
-- Sistema de Centros de Evaluacion de Manejo
-- ============================================

-- Insertar Departamentos
INSERT INTO departamento (id_departamento, nombre_departamento, codigo_departamento) 
VALUES (seq_departamento.NEXTVAL, 'Guatemala', '01');

INSERT INTO departamento (id_departamento, nombre_departamento, codigo_departamento) 
VALUES (seq_departamento.NEXTVAL, 'Alta Verapaz', '16');

INSERT INTO departamento (id_departamento, nombre_departamento, codigo_departamento) 
VALUES (seq_departamento.NEXTVAL, 'Sacatepequez', '03');

-- Insertar Municipios
INSERT INTO municipio (id_municipio, id_departamento, nombre_municipio, codigo_municipio) 
VALUES (seq_municipio.NEXTVAL, 1, 'Guatemala', '0101');

INSERT INTO municipio (id_municipio, id_departamento, nombre_municipio, codigo_municipio) 
VALUES (seq_municipio.NEXTVAL, 1, 'Mixco', '0108');

INSERT INTO municipio (id_municipio, id_departamento, nombre_municipio, codigo_municipio) 
VALUES (seq_municipio.NEXTVAL, 2, 'Coban', '1601');

INSERT INTO municipio (id_municipio, id_departamento, nombre_municipio, codigo_municipio) 
VALUES (seq_municipio.NEXTVAL, 3, 'Antigua Guatemala', '0301');

-- Insertar Centros de Evaluacion
INSERT INTO centro (id_centro, nombre_centro) 
VALUES (seq_centro.NEXTVAL, 'Centro de Evaluacion Guatemala Norte');

INSERT INTO centro (id_centro, nombre_centro) 
VALUES (seq_centro.NEXTVAL, 'Centro de Evaluacion Guatemala Sur');

INSERT INTO centro (id_centro, nombre_centro) 
VALUES (seq_centro.NEXTVAL, 'Centro de Evaluacion Zona 10');

-- Insertar Escuelas de Manejo
INSERT INTO escuela (id_escuela, nombre_escuela, direccion_escuela, numero_acuerdo) 
VALUES (seq_escuela.NEXTVAL, 'Academia de Manejo Profesional GT', '5ta Avenida 10-50 Zona 1', 'ACU-2024-001');

INSERT INTO escuela (id_escuela, nombre_escuela, direccion_escuela, numero_acuerdo) 
VALUES (seq_escuela.NEXTVAL, 'Escuela de Conduccion El Piloto', 'Calzada Roosevelt 25-30 Zona 11', 'ACU-2024-002');

INSERT INTO escuela (id_escuela, nombre_escuela, direccion_escuela, numero_acuerdo) 
VALUES (seq_escuela.NEXTVAL, 'Centro de Capacitacion Vial', '12 Calle 3-45 Zona 9', 'ACU-2024-003');

-- Insertar Ubicaciones (Escuela-Centro)
INSERT INTO ubicacion (id_escuela, id_centro) VALUES (1, 1);
INSERT INTO ubicacion (id_escuela, id_centro) VALUES (1, 2);
INSERT INTO ubicacion (id_escuela, id_centro) VALUES (2, 1);
INSERT INTO ubicacion (id_escuela, id_centro) VALUES (2, 3);
INSERT INTO ubicacion (id_escuela, id_centro) VALUES (3, 2);
INSERT INTO ubicacion (id_escuela, id_centro) VALUES (3, 3);

-- Insertar Preguntas Teoricas
INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        'Cual es la velocidad maxima permitida en zona escolar?', 
        1, '20 km/h', '40 km/h', '60 km/h', '80 km/h');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        'Que significa una señal de transito octagonal de color rojo?', 
        2, 'Ceda el paso', 'Alto total', 'Prohibido estacionar', 'Zona escolar');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        'A que distancia debe colocar el triangulo de seguridad en carretera?', 
        3, '10 metros', '25 metros', '50 metros', '100 metros');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        'Que color de luz indica que puede avanzar en un semaforo?', 
        2, 'Rojo', 'Verde', 'Amarillo', 'Azul');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        'Cuando debe usar las luces altas del vehiculo?', 
        1, 'En carreteras oscuras sin trafico', 'En la ciudad', 'En lluvia intensa', 'Siempre');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        'Que debe hacer al llegar a un cruce sin senalizacion?', 
        3, 'Acelerar para pasar rapido', 'Tocar bocina', 'Ceder el paso al vehiculo de la derecha', 'Detenerse completamente');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        'Cual es el limite de alcohol permitido en sangre para conducir?', 
        1, '0.0%', '0.5%', '1.0%', '1.5%');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        'Que indica una linea amarilla continua en el pavimento?', 
        4, 'Puede adelantar', 'Estacionamiento permitido', 'Zona de descarga', 'Prohibido adelantar');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        'A que edad minima se puede obtener licencia tipo B?', 
        2, '16 años', '18 años', '21 años', '25 años');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        'Que documento NO es necesario para tramitar licencia?', 
        3, 'DPI', 'Certificado medico', 'Titulo universitario', 'Constancia de escuela');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        'Cuantos puntos tiene el examen teorico completo?', 
        4, '50 puntos', '75 puntos', '90 puntos', '100 puntos');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        'Que significa una señal triangular con borde rojo?', 
        1, 'Prevencion o advertencia', 'Prohibicion', 'Informacion', 'Reglamentacion');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        'En que lado debe adelantar a otro vehiculo?', 
        2, 'Por la derecha', 'Por la izquierda', 'Por cualquier lado', 'No se debe adelantar');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        'Que debe verificar antes de arrancar el vehiculo?', 
        4, 'Solo el combustible', 'Solo los frenos', 'Solo las llantas', 'Todos los anteriores');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        'Cuando debe ceder el paso a un peaton?', 
        1, 'Siempre', 'Solo en pasos de cebra', 'Solo si hay policia', 'Nunca');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        'Que hacer si el semaforo esta en amarillo?', 
        3, 'Acelerar', 'Detenerse bruscamente', 'Prepararse para detenerse', 'Ignorarlo');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        'Donde NO esta permitido estacionar?', 
        2, 'En parqueos publicos', 'Frente a hidrantes', 'En su garaje', 'En zona verde');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        'Que equipo de seguridad es obligatorio en el vehiculo?', 
        4, 'Radio', 'GPS', 'Aire acondicionado', 'Extinguidor y botiquin');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        'Cada cuanto debe renovar la licencia de conducir?', 
        3, '1 año', '3 años', '5 años', '10 años');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        'Que indica una luz intermitente amarilla en semaforo?', 
        2, 'Alto total', 'Precaucion, avanzar con cuidado', 'Via libre', 'Retroceder');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        'Cual es la distancia de frenado en lluvia?', 
        4, 'Igual que en seco', 'La mitad', 'El doble', 'El triple o mas');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        'Que hacer en caso de accidente de transito?', 
        1, 'Senalizar y llamar a emergencias', 'Huir del lugar', 'Mover los vehiculos inmediatamente', 'Discutir con el otro conductor');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        'Cuando debe usar el cinturon de seguridad?', 
        2, 'Solo en carretera', 'Siempre', 'Solo si hay trafico', 'Solo el conductor');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        'Que significa señal circular con fondo azul?', 
        3, 'Prohibicion', 'Advertencia', 'Informacion u obligacion', 'Alto');

INSERT INTO pregunta (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
VALUES (seq_pregunta.NEXTVAL, 
        'A que velocidad maxima puede circular en ciudad?', 
        2, '40 km/h', '60 km/h', '80 km/h', '100 km/h');

-- Insertar Preguntas Practicas
INSERT INTO pregunta_practico (id_pregunta_practico, pregunta_texto, punteo_maximo) 
VALUES (seq_pregunta_practico.NEXTVAL, 'Estacionamiento en paralelo', 10);

INSERT INTO pregunta_practico (id_pregunta_practico, pregunta_texto, punteo_maximo) 
VALUES (seq_pregunta_practico.NEXTVAL, 'Arranque en pendiente', 10);

INSERT INTO pregunta_practico (id_pregunta_practico, pregunta_texto, punteo_maximo) 
VALUES (seq_pregunta_practico.NEXTVAL, 'Giro en U controlado', 10);

INSERT INTO pregunta_practico (id_pregunta_practico, pregunta_texto, punteo_maximo) 
VALUES (seq_pregunta_practico.NEXTVAL, 'Marcha atras en linea recta', 10);

INSERT INTO pregunta_practico (id_pregunta_practico, pregunta_texto, punteo_maximo) 
VALUES (seq_pregunta_practico.NEXTVAL, 'Cambios de carril', 10);

INSERT INTO pregunta_practico (id_pregunta_practico, pregunta_texto, punteo_maximo) 
VALUES (seq_pregunta_practico.NEXTVAL, 'Frenado de emergencia', 10);

INSERT INTO pregunta_practico (id_pregunta_practico, pregunta_texto, punteo_maximo) 
VALUES (seq_pregunta_practico.NEXTVAL, 'Manejo en rotonda', 10);

INSERT INTO pregunta_practico (id_pregunta_practico, pregunta_texto, punteo_maximo) 
VALUES (seq_pregunta_practico.NEXTVAL, 'Respeto a señales de transito', 10);

INSERT INTO pregunta_practico (id_pregunta_practico, pregunta_texto, punteo_maximo) 
VALUES (seq_pregunta_practico.NEXTVAL, 'Uso de espejos retrovisores', 10);

INSERT INTO pregunta_practico (id_pregunta_practico, pregunta_texto, punteo_maximo) 
VALUES (seq_pregunta_practico.NEXTVAL, 'Conduccion en trafico urbano', 10);

COMMIT;

-- Mensaje de confirmacion
SELECT 'Datos de prueba insertados exitosamente' AS status FROM DUAL;
SELECT 'Centros: ' || COUNT(*) FROM centro UNION ALL
SELECT 'Escuelas: ' || COUNT(*) FROM escuela UNION ALL
SELECT 'Departamentos: ' || COUNT(*) FROM departamento UNION ALL
SELECT 'Municipios: ' || COUNT(*) FROM municipio UNION ALL
SELECT 'Preguntas teoricas: ' || COUNT(*) FROM pregunta UNION ALL
SELECT 'Preguntas practicas: ' || COUNT(*) FROM pregunta_practico;