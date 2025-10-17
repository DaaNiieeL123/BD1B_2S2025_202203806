const db = require('../config/database');

exports.getAll = async (req, res) => {
  try {
    const result = await db.execute(
      `SELECT ex.id_examen, ex.id_escuela, ex.id_centro, ex.id_municipio, ex.id_departamento,
              ex.id_registro, ex.id_correlativo,
              e.nombre_escuela, c.nombre_centro, m.nombre_municipio, d.nombre_departamento,
              r.nombre_completo, cor.no_examen, cor.fecha_correlativo
       FROM examen ex
       LEFT JOIN escuela e ON ex.id_escuela = e.id_escuela
       LEFT JOIN centro c ON ex.id_centro = c.id_centro
       LEFT JOIN municipio m ON ex.id_municipio = m.id_municipio
       LEFT JOIN departamento d ON ex.id_departamento = d.id_departamento
       LEFT JOIN registro r ON ex.id_registro = r.id_registro
       LEFT JOIN correlativo cor ON ex.id_correlativo = cor.id_correlativo
       ORDER BY ex.id_examen DESC`,
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
      `SELECT ex.id_examen, ex.id_escuela, ex.id_centro, ex.id_municipio, ex.id_departamento,
              ex.id_registro, ex.id_correlativo,
              e.nombre_escuela, c.nombre_centro, m.nombre_municipio, d.nombre_departamento,
              r.nombre_completo, cor.no_examen, cor.fecha_correlativo
       FROM examen ex
       LEFT JOIN escuela e ON ex.id_escuela = e.id_escuela
       LEFT JOIN centro c ON ex.id_centro = c.id_centro
       LEFT JOIN municipio m ON ex.id_municipio = m.id_municipio
       LEFT JOIN departamento d ON ex.id_departamento = d.id_departamento
       LEFT JOIN registro r ON ex.id_registro = r.id_registro
       LEFT JOIN correlativo cor ON ex.id_correlativo = cor.id_correlativo
       WHERE ex.id_examen = :id`,
      [id],
      { outFormat: db.OUT_FORMAT_OBJECT }
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Examen no encontrado' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { 
      id_escuela, id_centro, id_municipio, id_departamento,
      id_registro, id_correlativo
    } = req.body;
    
    const result = await db.execute(
      `INSERT INTO examen (
         id_examen, id_escuela, id_centro, id_municipio, id_departamento,
         id_registro, id_correlativo
       ) VALUES (
         seq_examen.NEXTVAL, :id_escuela, :id_centro, :id_municipio, :id_departamento,
         :id_registro, :id_correlativo
       ) RETURNING id_examen INTO :id`,
      {
        id_escuela, id_centro, id_municipio, id_departamento,
        id_registro, id_correlativo,
        id: { dir: db.BIND_OUT, type: db.NUMBER }
      },
      { autoCommit: true }
    );
    
    res.status(201).json({
      success: true,
      data: { 
        id_examen: result.outBinds.id[0],
        id_escuela, id_centro, id_municipio, id_departamento,
        id_registro, id_correlativo
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      id_escuela, id_centro, id_municipio, id_departamento,
      id_registro, id_correlativo
    } = req.body;
    
    const result = await db.execute(
      `UPDATE examen 
       SET id_escuela = :id_escuela, id_centro = :id_centro, 
           id_municipio = :id_municipio, id_departamento = :id_departamento,
           id_registro = :id_registro, id_correlativo = :id_correlativo
       WHERE id_examen = :id`,
      {
        id_escuela, id_centro, id_municipio, id_departamento,
        id_registro, id_correlativo, id
      },
      { autoCommit: true }
    );
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, error: 'Examen no encontrado' });
    }
    
    res.json({ success: true, message: 'Examen actualizado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.execute(
      `DELETE FROM examen WHERE id_examen = :id`,
      [id],
      { autoCommit: true }
    );
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, error: 'Examen no encontrado' });
    }
    
    res.json({ success: true, message: 'Examen eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
