const db = require('../config/database');

exports.getAll = async (req, res) => {
  try {
    const result = await db.execute(
      `SELECT rpu.id_respuesta_practico, rpu.id_pregunta_practico, rpu.id_examen, rpu.nota_obtenida,
              pp.titulo_pregunta
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
              pp.titulo_pregunta
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
    const { id_pregunta_practico, id_examen, nota_obtenida } = req.body;
    
    const result = await db.execute(
      `INSERT INTO respuesta_practico_usuario (
         id_respuesta_practico, id_pregunta_practico, id_examen, nota_obtenida
       ) VALUES (
         seq_respuesta_practico.NEXTVAL, :id_pregunta_practico, :id_examen, :nota_obtenida
       ) RETURNING id_respuesta_practico INTO :id`,
      {
        id_pregunta_practico, id_examen, nota_obtenida,
        id: { dir: db.BIND_OUT, type: db.NUMBER }
      },
      { autoCommit: true }
    );
    
    res.status(201).json({
      success: true,
      data: { 
        id_respuesta_practico: result.outBinds.id[0],
        id_pregunta_practico, id_examen, nota_obtenida
      }
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
