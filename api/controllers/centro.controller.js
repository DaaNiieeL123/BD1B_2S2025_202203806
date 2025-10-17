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
    const { nombre_centro } = req.body;
    
    if (!nombre_centro) {
      return res.status(400).json({
        success: false,
        error: 'El nombre del centro es requerido'
      });
    }
    
    const result = await db.execute(
      `INSERT INTO centro (id_centro, nombre_centro) 
       VALUES (seq_centro.NEXTVAL, :nombre_centro)
       RETURNING id_centro INTO :id`,
      {
        nombre_centro,
        id: { dir: db.BIND_OUT, type: db.NUMBER }
      }
    );
    
    res.status(201).json({
      success: true,
      message: 'Centro creado exitosamente',
      data: {
        id_centro: result.outBinds.id[0],
        nombre_centro
      }
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
