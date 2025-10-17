const db = require('../config/database');

exports.getAll = async (req, res) => {
  try {
    const result = await db.execute(
      `SELECT id_pregunta_practico, pregunta_texto, punteo_maximo
       FROM pregunta_practico
       ORDER BY id_pregunta_practico`
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
      `SELECT id_pregunta_practico, pregunta_texto, punteo_maximo
       FROM pregunta_practico
       WHERE id_pregunta_practico = :id`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Pregunta práctica no encontrada' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = req.body;
    const preguntas = Array.isArray(data) ? data : [data];
    
    // Validar que todas las preguntas tengan los campos requeridos
    for (const preg of preguntas) {
      if (!preg.id_pregunta_practico || !preg.titulo_pregunta || !preg.descripcion_pregunta) {
        return res.status(400).json({
          success: false,
          error: 'Todos los campos son requeridos: id_pregunta_practico, titulo_pregunta, descripcion_pregunta'
        });
      }
    }
    
    const insertedData = [];
    
    // Insertar cada pregunta práctica
    for (const preg of preguntas) {
      await db.execute(
        `INSERT INTO pregunta_practico (id_pregunta_practico, titulo_pregunta, descripcion_pregunta) 
         VALUES (:id_pregunta_practico, :titulo, :descripcion)`,
        {
          id_pregunta_practico: preg.id_pregunta_practico,
          titulo: preg.titulo_pregunta,
          descripcion: preg.descripcion_pregunta
        },
        { autoCommit: true }
      );
      
      insertedData.push({
        id_pregunta_practico: preg.id_pregunta_practico,
        titulo_pregunta: preg.titulo_pregunta,
        descripcion_pregunta: preg.descripcion_pregunta
      });
    }
    
    res.status(201).json({
      success: true,
      data: Array.isArray(data) ? insertedData : insertedData[0],
      count: insertedData.length,
      message: `${insertedData.length} pregunta(s) práctica(s) creada(s) exitosamente`
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { pregunta_texto, punteo_maximo } = req.body;
    
    const result = await db.execute(
      `UPDATE pregunta_practico 
       SET pregunta_texto = :texto, punteo_maximo = :punteo 
       WHERE id_pregunta_practico = :id`,
      { texto: pregunta_texto, punteo: punteo_maximo, id }
    );
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, error: 'Pregunta práctica no encontrada' });
    }
    
    res.json({ success: true, message: 'Pregunta práctica actualizada' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.execute(`DELETE FROM pregunta_practico WHERE id_pregunta_practico = :id`, [id]);
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, error: 'Pregunta práctica no encontrada' });
    }
    
    res.json({ success: true, message: 'Pregunta práctica eliminada' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
