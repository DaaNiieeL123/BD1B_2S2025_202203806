const db = require('../config/database');

// GET - Obtener todos los centros
exports.getAll = async (req, res) => {
  try {
    const result = await db.execute(
      `SELECT id_centro, nombre_centro 
       FROM centro 
       ORDER BY id_centro`,
      [],
      { outFormat: db.OUT_FORMAT_OBJECT }
    );
    
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Error al obtener centros:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener centros',
      message: error.message
    });
  }
};

// GET - Obtener un centro por ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await db.execute(
      `SELECT id_centro, nombre_centro 
       FROM centro 
       WHERE id_centro = :id`,
      [id],
      { outFormat: db.OUT_FORMAT_OBJECT }
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Centro no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error al obtener centro:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener centro',
      message: error.message
    });
  }
};

// POST - Crear un nuevo centro
exports.create = async (req, res) => {
  try {
    const data = req.body;
    const centros = Array.isArray(data) ? data : [data];
    
    // Validar que todos los centros tengan los campos requeridos
    for (const centro of centros) {
      if (!centro.id_centro || !centro.nombre_centro) {
        return res.status(400).json({
          success: false,
          error: 'Todos los campos son requeridos: id_centro, nombre_centro'
        });
      }
    }
    
    const insertedData = [];
    
    // Insertar cada centro
    for (const centro of centros) {
      await db.execute(
        `INSERT INTO centro (id_centro, nombre_centro) 
         VALUES (:id_centro, :nombre_centro)`,
        {
          id_centro: centro.id_centro,
          nombre_centro: centro.nombre_centro
        },
        { autoCommit: true }
      );
      
      insertedData.push({
        id_centro: centro.id_centro,
        nombre_centro: centro.nombre_centro
      });
    }
    
    res.status(201).json({
      success: true,
      data: Array.isArray(data) ? insertedData : insertedData[0],
      count: insertedData.length,
      message: `${insertedData.length} centro(s) creado(s) exitosamente`
    });
  } catch (error) {
    console.error('Error al crear centro:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear centro',
      message: error.message
    });
  }
};

// PUT - Actualizar un centro
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_centro } = req.body;
    
    if (!nombre_centro) {
      return res.status(400).json({
        success: false,
        error: 'El nombre del centro es requerido'
      });
    }
    
    const result = await db.execute(
      `UPDATE centro 
       SET nombre_centro = :nombre_centro 
       WHERE id_centro = :id`,
      { nombre_centro, id }
    );
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({
        success: false,
        error: 'Centro no encontrado'
      });
    }
    
    res.json({
      success: true,
      message: 'Centro actualizado exitosamente',
      data: { id_centro: id, nombre_centro }
    });
  } catch (error) {
    console.error('Error al actualizar centro:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar centro',
      message: error.message
    });
  }
};

// DELETE - Eliminar un centro
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await db.execute(
      `DELETE FROM centro WHERE id_centro = :id`,
      [id]
    );
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({
        success: false,
        error: 'Centro no encontrado'
      });
    }
    
    res.json({
      success: true,
      message: 'Centro eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar centro:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar centro',
      message: error.message
    });
  }
};
