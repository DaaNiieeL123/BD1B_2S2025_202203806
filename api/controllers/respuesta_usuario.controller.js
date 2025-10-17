const db = require('../config/database');

exports.getAll = async (req, res) => {
  try {
    const result = await db.execute(
      `SELECT ru.id_respuesta_usuario, ru.id_pregunta, ru.id_examen, ru.respuesta_seleccionada,
              p.texto_pregunta, p.respuesta_correcta
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
              p.texto_pregunta, p.respuesta_correcta
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
    const { id_pregunta, id_examen, respuesta_seleccionada } = req.body;
    
    const result = await db.execute(
      `INSERT INTO respuesta_usuario (
         id_respuesta_usuario, id_pregunta, id_examen, respuesta_seleccionada
       ) VALUES (
         seq_respuesta_usuario.NEXTVAL, :id_pregunta, :id_examen, :respuesta_seleccionada
       ) RETURNING id_respuesta_usuario INTO :id`,
      {
        id_pregunta, id_examen, respuesta_seleccionada,
        id: { dir: db.BIND_OUT, type: db.NUMBER }
      },
      { autoCommit: true }
    );
    
    res.status(201).json({
      success: true,
      data: { 
        id_respuesta_usuario: result.outBinds.id[0],
        id_pregunta, id_examen, respuesta_seleccionada
      }
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
