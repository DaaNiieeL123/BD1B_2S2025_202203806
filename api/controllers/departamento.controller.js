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
    const { nombre_departamento, codigo_departamento } = req.body;
    
    const result = await db.execute(
      `INSERT INTO departamento (id_departamento, nombre_departamento, codigo_departamento) 
       VALUES (seq_departamento.NEXTVAL, :nombre, :codigo)
       RETURNING id_departamento INTO :id`,
      {
        nombre: nombre_departamento,
        codigo: codigo_departamento,
        id: { dir: db.BIND_OUT, type: db.NUMBER }
      }
    );
    
    res.status(201).json({
      success: true,
      data: { id_departamento: result.outBinds.id[0], nombre_departamento, codigo_departamento }
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
