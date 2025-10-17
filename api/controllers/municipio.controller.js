const db = require('../config/database');

exports.getAll = async (req, res) => {
  try {
    const result = await db.execute(
      `SELECT m.id_municipio, m.id_departamento, m.nombre_municipio, m.codigo_municipio,
              d.nombre_departamento
       FROM municipio m
       INNER JOIN departamento d ON m.id_departamento = d.id_departamento
       ORDER BY m.id_municipio`
    );
    
    res.json({ success: true, data: result.rows, count: result.rows.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.execute(
      `SELECT m.id_municipio, m.id_departamento, m.nombre_municipio, m.codigo_municipio,
              d.nombre_departamento
       FROM municipio m
       INNER JOIN departamento d ON m.id_departamento = d.id_departamento
       WHERE m.id_municipio = :id`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Municipio no encontrado' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = req.body;
    const municipios = Array.isArray(data) ? data : [data];
    
    // Validar que todos los municipios tengan los campos requeridos
    for (const muni of municipios) {
      if (!muni.id_municipio || !muni.id_departamento || !muni.nombre_municipio || !muni.codigo_municipio) {
        return res.status(400).json({
          success: false,
          error: 'Todos los campos son requeridos: id_municipio, id_departamento, nombre_municipio, codigo_municipio'
        });
      }
    }
    
    const insertedData = [];
    
    // Insertar cada municipio
    for (const muni of municipios) {
      await db.execute(
        `INSERT INTO municipio (id_municipio, id_departamento, nombre_municipio, codigo_municipio) 
         VALUES (:id_municipio, :id_departamento, :nombre_municipio, :codigo_municipio)`,
        {
          id_municipio: muni.id_municipio,
          id_departamento: muni.id_departamento,
          nombre_municipio: muni.nombre_municipio,
          codigo_municipio: muni.codigo_municipio
        },
        { autoCommit: true }
      );
      
      insertedData.push({
        id_municipio: muni.id_municipio,
        id_departamento: muni.id_departamento,
        nombre_municipio: muni.nombre_municipio,
        codigo_municipio: muni.codigo_municipio
      });
    }
    
    res.status(201).json({
      success: true,
      data: Array.isArray(data) ? insertedData : insertedData[0],
      count: insertedData.length,
      message: `${insertedData.length} municipio(s) creado(s) exitosamente`
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_departamento, nombre_municipio, codigo_municipio } = req.body;
    
    const result = await db.execute(
      `UPDATE municipio 
       SET id_departamento = :id_dep, nombre_municipio = :nombre, codigo_municipio = :codigo 
       WHERE id_municipio = :id`,
      { id_dep: id_departamento, nombre: nombre_municipio, codigo: codigo_municipio, id }
    );
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, error: 'Municipio no encontrado' });
    }
    
    res.json({ success: true, message: 'Municipio actualizado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.execute(`DELETE FROM municipio WHERE id_municipio = :id`, [id]);
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, error: 'Municipio no encontrado' });
    }
    
    res.json({ success: true, message: 'Municipio eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
