const db = require('../config/database');

exports.getAll = async (req, res) => {
  try {
    const result = await db.execute(
      `SELECT u.id_escuela, u.id_centro, 
              e.nombre_escuela, c.nombre_centro
       FROM ubicacion u
       LEFT JOIN escuela e ON u.id_escuela = e.id_escuela
       LEFT JOIN centro c ON u.id_centro = c.id_centro
       ORDER BY u.id_escuela, u.id_centro`,
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
    const { id_escuela, id_centro } = req.params;
    const result = await db.execute(
      `SELECT u.id_escuela, u.id_centro, 
              e.nombre_escuela, c.nombre_centro
       FROM ubicacion u
       LEFT JOIN escuela e ON u.id_escuela = e.id_escuela
       LEFT JOIN centro c ON u.id_centro = c.id_centro
       WHERE u.id_escuela = :id_escuela AND u.id_centro = :id_centro`,
      { id_escuela, id_centro },
      { outFormat: db.OUT_FORMAT_OBJECT }
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Ubicación no encontrada' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = req.body;
    const items = Array.isArray(data) ? data : [data];
    
    // Validar que todos los items tengan los campos requeridos
    for (const item of items) {
      if (!item.id_escuela || !item.id_centro) {
        return res.status(400).json({
          success: false,
          error: 'Todos los campos son requeridos: id_escuela, id_centro'
        });
      }
    }
    
    const insertedData = [];
    
    for (const item of items) {
      await db.execute(
        `INSERT INTO ubicacion (id_escuela, id_centro) 
         VALUES (:id_escuela, :id_centro)`,
        { 
          id_escuela: item.id_escuela, 
          id_centro: item.id_centro 
        },
        { autoCommit: true }
      );
      
      insertedData.push({
        id_escuela: item.id_escuela,
        id_centro: item.id_centro
      });
    }
    
    res.status(201).json({
      success: true,
      data: Array.isArray(data) ? insertedData : insertedData[0],
      count: insertedData.length,
      message: `${insertedData.length} ubicacion(es) creada(s) exitosamente`
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    // Para tabla con PK compuesta, no tiene mucho sentido UPDATE
    // pero lo incluimos para cumplir con CRUD completo
    res.status(400).json({ 
      success: false, 
      error: 'No se puede actualizar ubicación. Use DELETE + CREATE.' 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id_escuela, id_centro } = req.params;
    const result = await db.execute(
      `DELETE FROM ubicacion 
       WHERE id_escuela = :id_escuela AND id_centro = :id_centro`,
      { id_escuela, id_centro },
      { autoCommit: true }
    );
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, error: 'Ubicación no encontrada' });
    }
    
    res.json({ success: true, message: 'Ubicación eliminada' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
