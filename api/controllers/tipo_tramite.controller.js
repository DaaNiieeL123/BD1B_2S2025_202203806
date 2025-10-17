const db = require('../config/database');

exports.getAll = async (req, res) => {
  try {
    const result = await db.execute(
      `SELECT tipo_tramite, descripcion_tramite 
       FROM tipo_tramite 
       ORDER BY tipo_tramite`,
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
      `SELECT tipo_tramite, descripcion_tramite 
       FROM tipo_tramite 
       WHERE tipo_tramite = :id`,
      [id],
      { outFormat: db.OUT_FORMAT_OBJECT }
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Tipo de trámite no encontrado' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { tipo_tramite, descripcion_tramite } = req.body;
    
    await db.execute(
      `INSERT INTO tipo_tramite (tipo_tramite, descripcion_tramite) 
       VALUES (:tipo, :descripcion)`,
      { tipo: tipo_tramite, descripcion: descripcion_tramite },
      { autoCommit: true }
    );
    
    res.status(201).json({
      success: true,
      data: { tipo_tramite, descripcion_tramite }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion_tramite } = req.body;
    
    const result = await db.execute(
      `UPDATE tipo_tramite 
       SET descripcion_tramite = :descripcion 
       WHERE tipo_tramite = :id`,
      { descripcion: descripcion_tramite, id },
      { autoCommit: true }
    );
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, error: 'Tipo de trámite no encontrado' });
    }
    
    res.json({ success: true, message: 'Tipo de trámite actualizado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.execute(
      `DELETE FROM tipo_tramite WHERE tipo_tramite = :id`,
      [id],
      { autoCommit: true }
    );
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, error: 'Tipo de trámite no encontrado' });
    }
    
    res.json({ success: true, message: 'Tipo de trámite eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
