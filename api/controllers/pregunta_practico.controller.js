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
    const { pregunta_texto, punteo_maximo = 10 } = req.body;
    
    if (!pregunta_texto) {
      return res.status(400).json({ success: false, error: 'El texto de la pregunta es requerido' });
    }
    
    const result = await db.execute(
      `INSERT INTO pregunta_practico (id_pregunta_practico, pregunta_texto, punteo_maximo) 
       VALUES (seq_pregunta_practico.NEXTVAL, :texto, :punteo)
       RETURNING id_pregunta_practico INTO :id`,
      {
        texto: pregunta_texto,
        punteo: punteo_maximo,
        id: { dir: db.BIND_OUT, type: db.NUMBER }
      }
    );
    
    res.status(201).json({
      success: true,
      data: {
        id_pregunta_practico: result.outBinds.id[0],
        pregunta_texto,
        punteo_maximo
      }
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
