const db = require('../config/database');

// GET - Obtener todas las escuelas
exports.getAll = async (req, res) => {
  try {
    const result = await db.execute(
      `SELECT id_escuela, nombre_escuela, direccion_escuela, numero_acuerdo 
       FROM escuela 
       ORDER BY id_escuela`,
      [],
      { outFormat: db.OUT_FORMAT_OBJECT }
    );
    
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Error al obtener escuelas:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener escuelas',
      message: error.message
    });
  }
};

// GET - Obtener una escuela por ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await db.execute(
      `SELECT id_escuela, nombre_escuela, direccion_escuela, numero_acuerdo 
       FROM escuela 
       WHERE id_escuela = :id`,
      [id],
      { outFormat: db.OUT_FORMAT_OBJECT }
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Escuela no encontrada'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error al obtener escuela:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener escuela',
      message: error.message
    });
  }
};

// POST - Crear una nueva escuela
exports.create = async (req, res) => {
  try {
    const data = req.body;
    const escuelas = Array.isArray(data) ? data : [data];
    
    // Validar que todas las escuelas tengan los campos requeridos
    for (const esc of escuelas) {
      if (!esc.id_escuela || !esc.nombre_escuela || !esc.direccion_escuela || !esc.numero_acuerdo) {
        return res.status(400).json({
          success: false,
          error: 'Todos los campos son requeridos: id_escuela, nombre_escuela, direccion_escuela, numero_acuerdo'
        });
      }
    }
    
    const insertedData = [];
    
    // Insertar cada escuela
    for (const esc of escuelas) {
      await db.execute(
        `INSERT INTO escuela (id_escuela, nombre_escuela, direccion_escuela, numero_acuerdo) 
         VALUES (:id_escuela, :nombre_escuela, :direccion_escuela, :numero_acuerdo)`,
        {
          id_escuela: esc.id_escuela,
          nombre_escuela: esc.nombre_escuela,
          direccion_escuela: esc.direccion_escuela,
          numero_acuerdo: esc.numero_acuerdo
        },
        { autoCommit: true }
      );
      
      insertedData.push({
        id_escuela: esc.id_escuela,
        nombre_escuela: esc.nombre_escuela,
        direccion_escuela: esc.direccion_escuela,
        numero_acuerdo: esc.numero_acuerdo
      });
    }
    
    res.status(201).json({
      success: true,
      data: Array.isArray(data) ? insertedData : insertedData[0],
      count: insertedData.length,
      message: `${insertedData.length} escuela(s) creada(s) exitosamente`
    });
  } catch (error) {
    console.error('Error al crear escuela:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear escuela',
      message: error.message
    });
  }
};

// PUT - Actualizar una escuela
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_escuela, direccion_escuela, numero_acuerdo } = req.body;
    
    if (!nombre_escuela || !direccion_escuela || !numero_acuerdo) {
      return res.status(400).json({
        success: false,
        error: 'Todos los campos son requeridos'
      });
    }
    
    const result = await db.execute(
      `UPDATE escuela 
       SET nombre_escuela = :nombre_escuela,
           direccion_escuela = :direccion_escuela,
           numero_acuerdo = :numero_acuerdo
       WHERE id_escuela = :id`,
      { nombre_escuela, direccion_escuela, numero_acuerdo, id }
    );
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({
        success: false,
        error: 'Escuela no encontrada'
      });
    }
    
    res.json({
      success: true,
      message: 'Escuela actualizada exitosamente',
      data: { id_escuela: id, nombre_escuela, direccion_escuela, numero_acuerdo }
    });
  } catch (error) {
    console.error('Error al actualizar escuela:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar escuela',
      message: error.message
    });
  }
};

// DELETE - Eliminar una escuela
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await db.execute(
      `DELETE FROM escuela WHERE id_escuela = :id`,
      [id]
    );
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({
        success: false,
        error: 'Escuela no encontrada'
      });
    }
    
    res.json({
      success: true,
      message: 'Escuela eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar escuela:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar escuela',
      message: error.message
    });
  }
};
