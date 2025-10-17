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
    const data = req.body;
    const correlativos = Array.isArray(data) ? data : [data];
    
    // Validar que todos los correlativos tengan los campos requeridos
    for (const corr of correlativos) {
      if (!corr.id_correlativo || !corr.fecha_correlativo || !corr.no_examen) {
        return res.status(400).json({
          success: false,
          error: 'Todos los campos son requeridos: id_correlativo, fecha_correlativo, no_examen'
        });
      }
    }
    
    const insertedData = [];
    
    // Insertar cada correlativo
    for (const corr of correlativos) {
      await db.execute(
        `INSERT INTO correlativo (id_correlativo, fecha_correlativo, no_examen) 
         VALUES (:id_correlativo, TO_DATE(:fecha, 'YYYY-MM-DD'), :no_examen)`,
        {
          id_correlativo: corr.id_correlativo,
          fecha: corr.fecha_correlativo,
          no_examen: corr.no_examen
        },
        { autoCommit: true }
      );
      
      insertedData.push({
        id_correlativo: corr.id_correlativo,
        fecha_correlativo: corr.fecha_correlativo,
        no_examen: corr.no_examen
      });
    }
    
    res.status(201).json({
      success: true,
      data: Array.isArray(data) ? insertedData : insertedData[0],
      count: insertedData.length,
      message: `${insertedData.length} correlativo(s) creado(s) exitosamente`
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
