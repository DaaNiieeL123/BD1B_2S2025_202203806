const db = require('../config/database');

exports.getAll = async (req, res) => {
  try {
    const result = await db.execute(
      `SELECT id_departamento, nombre_departamento, codigo_departamento 
       FROM departamento 
       ORDER BY id_departamento`,
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
      `SELECT id_departamento, nombre_departamento, codigo_departamento 
       FROM departamento 
       WHERE id_departamento = :id`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Departamento no encontrado' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = req.body;
    
    // Verificar si es un array o un objeto individual
    const departamentos = Array.isArray(data) ? data : [data];
    
    // Validar que todos los registros tengan los campos requeridos
    for (const dept of departamentos) {
      if (!dept.id_departamento || !dept.nombre_departamento || !dept.codigo_departamento) {
        return res.status(400).json({ 
          success: false, 
          error: 'Todos los campos son requeridos: id_departamento, nombre_departamento, codigo_departamento' 
        });
      }
    }
    
    const insertedData = [];
    
    // Insertar cada departamento
    for (const dept of departamentos) {
      await db.execute(
        `INSERT INTO departamento (id_departamento, nombre_departamento, codigo_departamento) 
         VALUES (:id, :nombre, :codigo)`,
        {
          id: dept.id_departamento,
          nombre: dept.nombre_departamento,
          codigo: dept.codigo_departamento
        },
        { autoCommit: true }
      );
      
      insertedData.push({
        id_departamento: dept.id_departamento,
        nombre_departamento: dept.nombre_departamento,
        codigo_departamento: dept.codigo_departamento
      });
    }
    
    res.status(201).json({
      success: true,
      data: Array.isArray(data) ? insertedData : insertedData[0],
      count: insertedData.length,
      message: `${insertedData.length} departamento(s) creado(s) exitosamente`
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_departamento, codigo_departamento } = req.body;
    
    const result = await db.execute(
      `UPDATE departamento 
       SET nombre_departamento = :nombre, codigo_departamento = :codigo 
       WHERE id_departamento = :id`,
      { nombre: nombre_departamento, codigo: codigo_departamento, id }
    );
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, error: 'Departamento no encontrado' });
    }
    
    res.json({ success: true, message: 'Departamento actualizado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.execute(`DELETE FROM departamento WHERE id_departamento = :id`, [id]);
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, error: 'Departamento no encontrado' });
    }
    
    res.json({ success: true, message: 'Departamento eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
