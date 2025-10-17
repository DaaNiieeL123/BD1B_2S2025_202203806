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
    const data = req.body;
    const tipos = Array.isArray(data) ? data : [data];
    
    // Validar que todos los tipos tengan los campos requeridos
    for (const tipo of tipos) {
      if (!tipo.tipo_tramite || !tipo.descripcion_tramite) {
        return res.status(400).json({
          success: false,
          error: 'Todos los campos son requeridos: tipo_tramite, descripcion_tramite'
        });
      }
    }
    
    const insertedData = [];
    
    // Insertar cada tipo de trámite
    for (const tipo of tipos) {
      await db.execute(
        `INSERT INTO tipo_tramite (tipo_tramite, descripcion_tramite) 
         VALUES (:tipo, :descripcion)`,
        { tipo: tipo.tipo_tramite, descripcion: tipo.descripcion_tramite },
        { autoCommit: true }
      );
      
      insertedData.push({
        tipo_tramite: tipo.tipo_tramite,
        descripcion_tramite: tipo.descripcion_tramite
      });
    }
    
    res.status(201).json({
      success: true,
      data: Array.isArray(data) ? insertedData : insertedData[0],
      count: insertedData.length,
      message: `${insertedData.length} tipo(s) de trámite creado(s) exitosamente`
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
