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
    const { id_departamento, nombre_municipio, codigo_municipio } = req.body;
    
    const result = await db.execute(
      `INSERT INTO municipio (id_municipio, id_departamento, nombre_municipio, codigo_municipio) 
       VALUES (seq_municipio.NEXTVAL, :id_dep, :nombre, :codigo)
       RETURNING id_municipio INTO :id`,
      {
        id_dep: id_departamento,
        nombre: nombre_municipio,
        codigo: codigo_municipio,
        id: { dir: db.BIND_OUT, type: db.NUMBER }
      }
    );
    
    res.status(201).json({
      success: true,
      data: { id_municipio: result.outBinds.id[0], id_departamento, nombre_municipio, codigo_municipio }
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
