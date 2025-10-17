const db = require('../config/database');

exports.getAll = async (req, res) => {
  try {
    const result = await db.execute(
      `SELECT ru.id_respuesta_usuario, ru.id_pregunta, ru.id_examen, ru.respuesta_seleccionada,
              p.pregunta_texto, p.respuesta_correcta
       FROM respuesta_usuario ru
       LEFT JOIN pregunta p ON ru.id_pregunta = p.id_pregunta
       ORDER BY ru.id_examen, ru.id_respuesta_usuario`,
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
      `SELECT ru.id_respuesta_usuario, ru.id_pregunta, ru.id_examen, ru.respuesta_seleccionada,
              p.pregunta_texto, p.respuesta_correcta
       FROM respuesta_usuario ru
       LEFT JOIN pregunta p ON ru.id_pregunta = p.id_pregunta
       WHERE ru.id_respuesta_usuario = :id`,
      [id],
      { outFormat: db.OUT_FORMAT_OBJECT }
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Respuesta no encontrada' });
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
      if (!resp.id_respuesta_usuario || !resp.id_pregunta || !resp.id_examen || resp.respuesta_seleccionada === undefined) {
        return res.status(400).json({
          success: false,
          error: 'Todos los campos son requeridos: id_respuesta_usuario, id_pregunta, id_examen, respuesta_seleccionada'
        });
      }
    }
    
    const insertedData = [];
    
    // Insertar cada respuesta
    for (const resp of respuestas) {
      await db.execute(
        `INSERT INTO respuesta_usuario (
           id_respuesta_usuario, id_pregunta, id_examen, respuesta_seleccionada
         ) VALUES (
           :id_respuesta_usuario, :id_pregunta, :id_examen, :respuesta_seleccionada
         )`,
        {
          id_respuesta_usuario: resp.id_respuesta_usuario,
          id_pregunta: resp.id_pregunta,
          id_examen: resp.id_examen,
          respuesta_seleccionada: resp.respuesta_seleccionada
        },
        { autoCommit: true }
      );
      
      insertedData.push({
        id_respuesta_usuario: resp.id_respuesta_usuario,
        id_pregunta: resp.id_pregunta,
        id_examen: resp.id_examen,
        respuesta_seleccionada: resp.respuesta_seleccionada
      });
    }
    
    res.status(201).json({
      success: true,
      data: Array.isArray(data) ? insertedData : insertedData[0],
      count: insertedData.length,
      message: `${insertedData.length} respuesta(s) creada(s) exitosamente`
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_pregunta, id_examen, respuesta_seleccionada } = req.body;
    
    const result = await db.execute(
      `UPDATE respuesta_usuario 
       SET id_pregunta = :id_pregunta, id_examen = :id_examen, 
           respuesta_seleccionada = :respuesta_seleccionada
       WHERE id_respuesta_usuario = :id`,
      { id_pregunta, id_examen, respuesta_seleccionada, id },
      { autoCommit: true }
    );
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, error: 'Respuesta no encontrada' });
    }
    
    res.json({ success: true, message: 'Respuesta actualizada' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.execute(
      `DELETE FROM respuesta_usuario WHERE id_respuesta_usuario = :id`,
      [id],
      { autoCommit: true }
    );
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, error: 'Respuesta no encontrada' });
    }
    
    res.json({ success: true, message: 'Respuesta eliminada' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
