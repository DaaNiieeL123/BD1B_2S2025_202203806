const db = require('../config/database');

exports.getAll = async (req, res) => {
  try {
    const result = await db.execute(
      `SELECT genero, descripcion_genero 
       FROM genero_catalogo 
       ORDER BY genero`,
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
      `SELECT genero, descripcion_genero 
       FROM genero_catalogo 
       WHERE genero = :id`,
      [id],
      { outFormat: db.OUT_FORMAT_OBJECT }
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Género no encontrado' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { genero, descripcion_genero } = req.body;
    
    await db.execute(
      `INSERT INTO genero_catalogo (genero, descripcion_genero) 
       VALUES (:genero, :descripcion)`,
      { genero, descripcion: descripcion_genero },
      { autoCommit: true }
    );
    
    res.status(201).json({
      success: true,
      data: { genero, descripcion_genero }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion_genero } = req.body;
    
    const result = await db.execute(
      `UPDATE genero_catalogo 
       SET descripcion_genero = :descripcion 
       WHERE genero = :id`,
      { descripcion: descripcion_genero, id },
      { autoCommit: true }
    );
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, error: 'Género no encontrado' });
    }
    
    res.json({ success: true, message: 'Género actualizado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.execute(
      `DELETE FROM genero_catalogo WHERE genero = :id`,
      [id],
      { autoCommit: true }
    );
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, error: 'Género no encontrado' });
    }
    
    res.json({ success: true, message: 'Género eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
