const db = require('../config/database');

exports.getAll = async (req, res) => {
  try {
    const result = await db.execute(
      `SELECT tipo_licencia, descripcion_licencia 
       FROM tipo_licencia 
       ORDER BY tipo_licencia`,
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
      `SELECT tipo_licencia, descripcion_licencia 
       FROM tipo_licencia 
       WHERE tipo_licencia = :id`,
      [id],
      { outFormat: db.OUT_FORMAT_OBJECT }
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Tipo de licencia no encontrado' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { tipo_licencia, descripcion_licencia } = req.body;
    
    await db.execute(
      `INSERT INTO tipo_licencia (tipo_licencia, descripcion_licencia) 
       VALUES (:tipo, :descripcion)`,
      { tipo: tipo_licencia, descripcion: descripcion_licencia },
      { autoCommit: true }
    );
    
    res.status(201).json({
      success: true,
      data: { tipo_licencia, descripcion_licencia }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion_licencia } = req.body;
    
    const result = await db.execute(
      `UPDATE tipo_licencia 
       SET descripcion_licencia = :descripcion 
       WHERE tipo_licencia = :id`,
      { descripcion: descripcion_licencia, id },
      { autoCommit: true }
    );
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, error: 'Tipo de licencia no encontrado' });
    }
    
    res.json({ success: true, message: 'Tipo de licencia actualizado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.execute(
      `DELETE FROM tipo_licencia WHERE tipo_licencia = :id`,
      [id],
      { autoCommit: true }
    );
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, error: 'Tipo de licencia no encontrado' });
    }
    
    res.json({ success: true, message: 'Tipo de licencia eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
