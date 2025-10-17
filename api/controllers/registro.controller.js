const db = require('../config/database');

exports.getAll = async (req, res) => {
  try {
    const result = await db.execute(
      `SELECT r.id_registro, r.id_escuela, r.id_centro, r.id_municipio, r.id_departamento,
              r.fecha_registro, r.tipo_tramite, r.tipo_licencia, r.nombre_completo, r.genero,
              e.nombre_escuela, c.nombre_centro, m.nombre_municipio, d.nombre_departamento
       FROM registro r
       LEFT JOIN escuela e ON r.id_escuela = e.id_escuela
       LEFT JOIN centro c ON r.id_centro = c.id_centro
       LEFT JOIN municipio m ON r.id_municipio = m.id_municipio
       LEFT JOIN departamento d ON r.id_departamento = d.id_departamento
       ORDER BY r.fecha_registro DESC, r.id_registro DESC`,
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
      `SELECT r.id_registro, r.id_escuela, r.id_centro, r.id_municipio, r.id_departamento,
              r.fecha_registro, r.tipo_tramite, r.tipo_licencia, r.nombre_completo, r.genero,
              e.nombre_escuela, c.nombre_centro, m.nombre_municipio, d.nombre_departamento
       FROM registro r
       LEFT JOIN escuela e ON r.id_escuela = e.id_escuela
       LEFT JOIN centro c ON r.id_centro = c.id_centro
       LEFT JOIN municipio m ON r.id_municipio = m.id_municipio
       LEFT JOIN departamento d ON r.id_departamento = d.id_departamento
       WHERE r.id_registro = :id`,
      [id],
      { outFormat: db.OUT_FORMAT_OBJECT }
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Registro no encontrado' });
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
      fecha_registro, tipo_tramite, tipo_licencia, nombre_completo, genero 
    } = req.body;
    
    const result = await db.execute(
      `INSERT INTO registro (
         id_registro, id_escuela, id_centro, id_municipio, id_departamento,
         fecha_registro, tipo_tramite, tipo_licencia, nombre_completo, genero
       ) VALUES (
         seq_registro.NEXTVAL, :id_escuela, :id_centro, :id_municipio, :id_departamento,
         TO_DATE(:fecha_registro, 'YYYY-MM-DD'), :tipo_tramite, :tipo_licencia, 
         :nombre_completo, :genero
       ) RETURNING id_registro INTO :id`,
      {
        id_escuela, id_centro, id_municipio, id_departamento,
        fecha_registro, tipo_tramite, tipo_licencia, nombre_completo, genero,
        id: { dir: db.BIND_OUT, type: db.NUMBER }
      },
      { autoCommit: true }
    );
    
    res.status(201).json({
      success: true,
      data: { 
        id_registro: result.outBinds.id[0],
        id_escuela, id_centro, id_municipio, id_departamento,
        fecha_registro, tipo_tramite, tipo_licencia, nombre_completo, genero
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
      fecha_registro, tipo_tramite, tipo_licencia, nombre_completo, genero 
    } = req.body;
    
    const result = await db.execute(
      `UPDATE registro 
       SET id_escuela = :id_escuela, id_centro = :id_centro, 
           id_municipio = :id_municipio, id_departamento = :id_departamento,
           fecha_registro = TO_DATE(:fecha_registro, 'YYYY-MM-DD'),
           tipo_tramite = :tipo_tramite, tipo_licencia = :tipo_licencia,
           nombre_completo = :nombre_completo, genero = :genero
       WHERE id_registro = :id`,
      {
        id_escuela, id_centro, id_municipio, id_departamento,
        fecha_registro, tipo_tramite, tipo_licencia, nombre_completo, genero, id
      },
      { autoCommit: true }
    );
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, error: 'Registro no encontrado' });
    }
    
    res.json({ success: true, message: 'Registro actualizado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.execute(
      `DELETE FROM registro WHERE id_registro = :id`,
      [id],
      { autoCommit: true }
    );
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, error: 'Registro no encontrado' });
    }
    
    res.json({ success: true, message: 'Registro eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
