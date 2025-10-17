const db = require('../config/database');

exports.getAll = async (req, res) => {
  try {
    const result = await db.execute(
      `SELECT id_correlativo, fecha_correlativo, no_examen 
       FROM correlativo 
       ORDER BY fecha_correlativo DESC, no_examen`,
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
      `SELECT id_correlativo, fecha_correlativo, no_examen 
       FROM correlativo 
       WHERE id_correlativo = :id`,
      [id],
      { outFormat: db.OUT_FORMAT_OBJECT }
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Correlativo no encontrado' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { fecha_correlativo, no_examen } = req.body;
    
    const result = await db.execute(
      `INSERT INTO correlativo (id_correlativo, fecha_correlativo, no_examen) 
       VALUES (seq_correlativo.NEXTVAL, TO_DATE(:fecha, 'YYYY-MM-DD'), :no_examen)
       RETURNING id_correlativo INTO :id`,
      {
        fecha: fecha_correlativo,
        no_examen: no_examen,
        id: { dir: db.BIND_OUT, type: db.NUMBER }
      },
      { autoCommit: true }
    );
    
    res.status(201).json({
      success: true,
      data: { id_correlativo: result.outBinds.id[0], fecha_correlativo, no_examen }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha_correlativo, no_examen } = req.body;
    
    const result = await db.execute(
      `UPDATE correlativo 
       SET fecha_correlativo = TO_DATE(:fecha, 'YYYY-MM-DD'), no_examen = :no_examen 
       WHERE id_correlativo = :id`,
      { fecha: fecha_correlativo, no_examen: no_examen, id },
      { autoCommit: true }
    );
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, error: 'Correlativo no encontrado' });
    }
    
    res.json({ success: true, message: 'Correlativo actualizado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.execute(
      `DELETE FROM correlativo WHERE id_correlativo = :id`,
      [id],
      { autoCommit: true }
    );
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, error: 'Correlativo no encontrado' });
    }
    
    res.json({ success: true, message: 'Correlativo eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
