const db = require('../config/database');

exports.getAll = async (req, res) => {
  try {
    const result = await db.execute(
      `SELECT rpu.id_respuesta_practico, rpu.id_pregunta_practico, rpu.id_examen, rpu.nota_obtenida,
              pp.pregunta_texto
       FROM respuesta_practico_usuario rpu
       LEFT JOIN pregunta_practico pp ON rpu.id_pregunta_practico = pp.id_pregunta_practico
       ORDER BY rpu.id_examen, rpu.id_respuesta_practico`,
      [],
      { outFormat: db.OUT_FORMAT_OBJECT }
    );
    
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.execute(
      `SELECT rpu.id_respuesta_practico, rpu.id_pregunta_practico, rpu.id_examen, rpu.nota_obtenida,
              pp.pregunta_texto
       FROM respuesta_practico_usuario rpu
       LEFT JOIN pregunta_practico pp ON rpu.id_pregunta_practico = pp.id_pregunta_practico
       WHERE rpu.id_respuesta_practico = :id`,
      [id],
      { outFormat: db.OUT_FORMAT_OBJECT }
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Respuesta práctica no encontrada' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = req.body;
    const respuestas = Array.isArray(data) ? data : [data];
    
    // Validar que todas las respuestas tengan los campos requeridos
    for (const resp of respuestas) {
      if (!resp.id_respuesta_practico || !resp.id_pregunta_practico || !resp.id_examen || resp.nota_obtenida === undefined) {
        return res.status(400).json({
          success: false,
          error: 'Todos los campos son requeridos: id_respuesta_practico, id_pregunta_practico, id_examen, nota_obtenida'
        });
      }
    }
    
    const insertedData = [];
    
    // Insertar cada respuesta práctica
    for (const resp of respuestas) {
      await db.execute(
        `INSERT INTO respuesta_practico_usuario (
           id_respuesta_practico, id_pregunta_practico, id_examen, nota_obtenida
         ) VALUES (
           :id_respuesta_practico, :id_pregunta_practico, :id_examen, :nota_obtenida
         )`,
        {
          id_respuesta_practico: resp.id_respuesta_practico,
          id_pregunta_practico: resp.id_pregunta_practico,
          id_examen: resp.id_examen,
          nota_obtenida: resp.nota_obtenida
        },
        { autoCommit: true }
      );
      
      insertedData.push({
        id_respuesta_practico: resp.id_respuesta_practico,
        id_pregunta_practico: resp.id_pregunta_practico,
        id_examen: resp.id_examen,
        nota_obtenida: resp.nota_obtenida
      });
    }
    
    res.status(201).json({
      success: true,
      data: Array.isArray(data) ? insertedData : insertedData[0],
      count: insertedData.length,
      message: `${insertedData.length} respuesta(s) práctica(s) creada(s) exitosamente`
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_pregunta_practico, id_examen, nota_obtenida } = req.body;
    
    const result = await db.execute(
      `UPDATE respuesta_practico_usuario 
       SET id_pregunta_practico = :id_pregunta_practico, id_examen = :id_examen, 
           nota_obtenida = :nota_obtenida
       WHERE id_respuesta_practico = :id`,
      { id_pregunta_practico, id_examen, nota_obtenida, id },
      { autoCommit: true }
    );
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, error: 'Respuesta práctica no encontrada' });
    }
    
    res.json({ success: true, message: 'Respuesta práctica actualizada' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.execute(
      `DELETE FROM respuesta_practico_usuario WHERE id_respuesta_practico = :id`,
      [id],
      { autoCommit: true }
    );
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, error: 'Respuesta práctica no encontrada' });
    }
    
    res.json({ success: true, message: 'Respuesta práctica eliminada' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
