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
    const data = req.body;
    const tipos = Array.isArray(data) ? data : [data];
    
    // Validar que todos los tipos tengan los campos requeridos
    for (const tipo of tipos) {
      if (!tipo.tipo_licencia || !tipo.descripcion_licencia) {
        return res.status(400).json({
          success: false,
          error: 'Todos los campos son requeridos: tipo_licencia, descripcion_licencia'
        });
      }
    }
    
    const insertedData = [];
    
    // Insertar cada tipo de licencia
    for (const tipo of tipos) {
      await db.execute(
        `INSERT INTO tipo_licencia (tipo_licencia, descripcion_licencia) 
         VALUES (:tipo, :descripcion)`,
        { tipo: tipo.tipo_licencia, descripcion: tipo.descripcion_licencia },
        { autoCommit: true }
      );
      
      insertedData.push({
        tipo_licencia: tipo.tipo_licencia,
        descripcion_licencia: tipo.descripcion_licencia
      });
    }
    
    res.status(201).json({
      success: true,
      data: Array.isArray(data) ? insertedData : insertedData[0],
      count: insertedData.length,
      message: `${insertedData.length} tipo(s) de licencia creado(s) exitosamente`
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
