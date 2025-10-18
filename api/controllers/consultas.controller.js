const db = require('../config/database');

// ============================================
// CONSULTA 1: Estadísticas por Centro y Escuela
// ============================================
exports.estadisticasPorCentro = async (req, res) => {
  try {
    const query = `
      SELECT 
        c.nombre_centro AS centro,
        e.nombre_escuela AS escuela,
        COUNT(DISTINCT ex.id_examen) AS total_examenes,
        
        -- Promedio teórico (4 puntos por respuesta correcta)
        ROUND(AVG(
          (SELECT COUNT(*) * 4
           FROM respuesta_usuario ru
           INNER JOIN pregunta p ON ru.id_pregunta = p.id_pregunta
           WHERE ru.id_examen = ex.id_examen
           AND ru.respuesta_seleccionada = p.respuesta_correcta)
        ), 2) AS promedio_teorico,
        
        -- Promedio práctico (suma de notas prácticas)
        ROUND(AVG(
          (SELECT SUM(rpu.nota_obtenida)
           FROM respuesta_practico_usuario rpu
           WHERE rpu.id_examen = ex.id_examen)
        ), 2) AS promedio_practico,
        
        -- Total aprobados (ambos >= 70)
        SUM(
          CASE 
            WHEN (
              (SELECT COUNT(*) * 4
               FROM respuesta_usuario ru
               INNER JOIN pregunta p ON ru.id_pregunta = p.id_pregunta
               WHERE ru.id_examen = ex.id_examen
               AND ru.respuesta_seleccionada = p.respuesta_correcta) >= 70
              AND
              (SELECT SUM(rpu.nota_obtenida)
               FROM respuesta_practico_usuario rpu
               WHERE rpu.id_examen = ex.id_examen) >= 70
            )
            THEN 1
            ELSE 0
          END
        ) AS total_aprobados
        
      FROM examen ex
      INNER JOIN centro c ON ex.id_centro = c.id_centro
      INNER JOIN escuela e ON ex.id_escuela = e.id_escuela
      GROUP BY c.nombre_centro, e.nombre_escuela
      ORDER BY c.nombre_centro, e.nombre_escuela
    `;
    
    const result = await db.execute(query);
    
    res.json({
      success: true,
      consulta: 'Estadísticas de evaluaciones por centro y escuela',
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Error en consulta 1:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener estadísticas',
      message: error.message
    });
  }
};

// ============================================
// CONSULTA 2: Ranking de Evaluadores
// ============================================
exports.rankingEvaluadores = async (req, res) => {
  try {
    const query = `
      WITH punteos AS (
        SELECT 
          ex.id_examen,
          r.nombre_completo,
          tl.descripcion_licencia AS tipo_licencia,
          gc.descripcion_genero AS genero,
          r.fecha_registro AS fecha,
          
          -- Punteo teórico
          (SELECT COUNT(*) * 4
           FROM respuesta_usuario ru
           INNER JOIN pregunta p ON ru.id_pregunta = p.id_pregunta
           WHERE ru.id_examen = ex.id_examen
           AND ru.respuesta_seleccionada = p.respuesta_correcta) AS punteo_teorico,
          
          -- Punteo práctico
          (SELECT SUM(rpu.nota_obtenida)
           FROM respuesta_practico_usuario rpu
           WHERE rpu.id_examen = ex.id_examen) AS punteo_practico,
          
          -- Ubicación
          c.nombre_centro || ', ' || e.nombre_escuela || ', ' || 
          m.nombre_municipio || ', ' || d.nombre_departamento AS ubicacion
          
        FROM examen ex
        INNER JOIN registro r ON ex.id_registro = r.id_registro
        INNER JOIN tipo_licencia tl ON r.tipo_licencia = tl.tipo_licencia
        INNER JOIN genero_catalogo gc ON r.genero = gc.genero
        INNER JOIN centro c ON ex.id_centro = c.id_centro
        INNER JOIN escuela e ON ex.id_escuela = e.id_escuela
        INNER JOIN municipio m ON ex.id_municipio = m.id_municipio
        INNER JOIN departamento d ON ex.id_departamento = d.id_departamento
      )
      SELECT 
        nombre_completo,
        tipo_licencia,
        genero,
        fecha,
        punteo_teorico,
        punteo_practico,
        (punteo_teorico + punteo_practico) AS punteo_total,
        CASE 
          WHEN punteo_teorico >= 70 AND punteo_practico >= 70 THEN 'APROBADO'
          ELSE 'REPROBADO'
        END AS resultado_final,
        ubicacion
      FROM punteos
      ORDER BY 
        CASE WHEN punteo_teorico >= 70 AND punteo_practico >= 70 THEN 0 ELSE 1 END,
        (punteo_teorico + punteo_practico) DESC,
        fecha ASC
    `;
    
    const result = await db.execute(query);
    
    res.json({
      success: true,
      consulta: 'Ranking de evaluadores por resultado final',
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Error en consulta 2:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener ranking',
      message: error.message
    });
  }
};

// ============================================
// CONSULTA 3: Pregunta Más Difícil
// ============================================
exports.preguntaMasDificil = async (req, res) => {
  try {
    const query = `
      WITH estadisticas_preguntas AS (
        SELECT 
          p.id_pregunta,
          DBMS_LOB.SUBSTR(p.pregunta_texto, 200, 1) AS pregunta_texto,
          p.opcion_1,
          p.opcion_2,
          p.opcion_3,
          p.opcion_4,
          p.respuesta_correcta,
          
          -- Estadísticas de respuestas
          COUNT(*) AS total_respuestas,
          SUM(CASE WHEN ru.respuesta_seleccionada = 1 THEN 1 ELSE 0 END) AS respuestas_A,
          SUM(CASE WHEN ru.respuesta_seleccionada = 2 THEN 1 ELSE 0 END) AS respuestas_B,
          SUM(CASE WHEN ru.respuesta_seleccionada = 3 THEN 1 ELSE 0 END) AS respuestas_C,
          SUM(CASE WHEN ru.respuesta_seleccionada = 4 THEN 1 ELSE 0 END) AS respuestas_D,
          
          -- Aciertos
          SUM(CASE WHEN ru.respuesta_seleccionada = p.respuesta_correcta THEN 1 ELSE 0 END) AS total_aciertos,
          
          -- Porcentaje de aciertos
          ROUND(
            (SUM(CASE WHEN ru.respuesta_seleccionada = p.respuesta_correcta THEN 1 ELSE 0 END) / 
             COUNT(*)) * 100, 
            2
          ) AS porcentaje_aciertos
          
        FROM pregunta p
        LEFT JOIN respuesta_usuario ru ON p.id_pregunta = ru.id_pregunta
        GROUP BY 
          p.id_pregunta, 
          DBMS_LOB.SUBSTR(p.pregunta_texto, 200, 1),
          p.opcion_1,
          p.opcion_2,
          p.opcion_3,
          p.opcion_4,
          p.respuesta_correcta
        HAVING COUNT(*) > 0
      )
      SELECT 
        id_pregunta,
        pregunta_texto,
        opcion_1 AS opcion_A,
        opcion_2 AS opcion_B,
        opcion_3 AS opcion_C,
        opcion_4 AS opcion_D,
        CASE respuesta_correcta
          WHEN 1 THEN 'A'
          WHEN 2 THEN 'B'
          WHEN 3 THEN 'C'
          WHEN 4 THEN 'D'
        END AS respuesta_correcta,
        respuestas_A,
        respuestas_B,
        respuestas_C,
        respuestas_D,
        total_aciertos,
        porcentaje_aciertos,
        CASE 
          WHEN porcentaje_aciertos < 50 THEN 'REVISAR URGENTE'
          WHEN porcentaje_aciertos < 70 THEN 'REVISAR'
          ELSE 'ACEPTABLE'
        END AS estado_recomendacion
      FROM estadisticas_preguntas
      WHERE porcentaje_aciertos = (SELECT MIN(porcentaje_aciertos) FROM estadisticas_preguntas)
      FETCH FIRST 1 ROWS ONLY
    `;
    
    const result = await db.execute(query);
    
    res.json({
      success: true,
      consulta: 'Pregunta con menor porcentaje de aciertos',
      data: result.rows[0] || null,
      descripcion: 'Pregunta más difícil que requiere revisión'
    });
  } catch (error) {
    console.error('Error en consulta 3:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener pregunta difícil',
      message: error.message
    });
  }
};

// ============================================
// CONSULTA GENERAL: Ejecutar SQL personalizado
// ============================================
exports.consultaGeneral = async (req, res) => {
  try {
    const { query, limit } = req.body;
    
    // Validación básica
    if (!query || typeof query !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Debe proporcionar una consulta SQL en el campo "query"'
      });
    }
    
    // Solo permitir SELECT (seguridad básica)
    const queryTrimmed = query.trim().toUpperCase();
    if (!queryTrimmed.startsWith('SELECT') && !queryTrimmed.startsWith('WITH')) {
      return res.status(403).json({
        success: false,
        error: 'Solo se permiten consultas SELECT y CTEs (WITH)'
      });
    }
    
    // Prevenir comandos peligrosos dentro del SELECT
    const forbiddenKeywords = ['DROP', 'DELETE', 'INSERT', 'UPDATE', 'TRUNCATE', 'ALTER', 'CREATE'];
    const hasForbidenCommand = forbiddenKeywords.some(keyword => 
      queryTrimmed.includes(keyword)
    );
    
    if (hasForbidenCommand) {
      return res.status(403).json({
        success: false,
        error: 'La consulta contiene comandos no permitidos (solo lectura)'
      });
    }
    
    // Aplicar límite opcional
    let finalQuery = query.trim();
    const maxLimit = limit && !isNaN(limit) ? Math.min(parseInt(limit), 10000) : 1000;
    
    // Si no tiene FETCH FIRST, agregarlo
    if (!queryTrimmed.includes('FETCH FIRST') && !queryTrimmed.includes('ROWNUM')) {
      finalQuery += ` FETCH FIRST ${maxLimit} ROWS ONLY`;
    }
    
    // Ejecutar consulta con timeout de 30 segundos
    const startTime = Date.now();
    const result = await db.execute(finalQuery, [], { 
      outFormat: db.OUT_FORMAT_OBJECT,
      maxRows: 10000 // Protección adicional
    });
    const executionTime = Date.now() - startTime;
    
    res.json({
      success: true,
      consulta: 'Consulta personalizada ejecutada',
      query: finalQuery,
      data: result.rows,
      count: result.rows.length,
      execution_time_ms: executionTime,
      hint: result.rows.length >= maxLimit ? 
        `Resultados limitados a ${maxLimit} filas. Use FETCH FIRST para personalizar.` : null
    });
  } catch (error) {
    console.error('Error en consulta general:', error);
    res.status(500).json({
      success: false,
      error: 'Error al ejecutar consulta',
      message: error.message,
      hint: 'Verifique la sintaxis SQL y que las tablas/columnas existan'
    });
  }
};
