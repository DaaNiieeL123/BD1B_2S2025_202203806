const db = require('../config/database');

exports.getAll = async (req, res) => {
  try {
    const result = await db.execute(
      `SELECT p.id_pregunta, 
              DBMS_LOB.SUBSTR(p.pregunta_texto, 4000, 1) as pregunta_texto,
              p.respuesta_correcta,
              p.opcion_1, p.opcion_2, p.opcion_3, p.opcion_4
       FROM pregunta p
       ORDER BY p.id_pregunta`
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
      `SELECT id_pregunta, 
              DBMS_LOB.SUBSTR(pregunta_texto, 4000, 1) as pregunta_texto,
              respuesta_correcta,
              opcion_1, opcion_2, opcion_3, opcion_4
       FROM pregunta
       WHERE id_pregunta = :id`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Pregunta no encontrada' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4 } = req.body;
    
    if (!pregunta_texto || !respuesta_correcta || !opcion_1 || !opcion_2 || !opcion_3 || !opcion_4) {
      return res.status(400).json({ success: false, error: 'Todos los campos son requeridos' });
    }
    
    const result = await db.execute(
      `INSERT INTO pregunta 
       (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
       VALUES (seq_pregunta.NEXTVAL, :texto, :correcta, :op1, :op2, :op3, :op4)
       RETURNING id_pregunta INTO :id`,
      {
        texto: pregunta_texto,
        correcta: respuesta_correcta,
        op1: opcion_1,
        op2: opcion_2,
        op3: opcion_3,
        op4: opcion_4,
        id: { dir: db.BIND_OUT, type: db.NUMBER }
      }
    );
    
    res.status(201).json({
      success: true,
      data: {
        id_pregunta: result.outBinds.id[0],
        pregunta_texto,
        respuesta_correcta,
        opcion_1,
        opcion_2,
        opcion_3,
        opcion_4
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4 } = req.body;
    
    const result = await db.execute(
      `UPDATE pregunta 
       SET pregunta_texto = :texto,
           respuesta_correcta = :correcta,
           opcion_1 = :op1,
           opcion_2 = :op2,
           opcion_3 = :op3,
           opcion_4 = :op4
       WHERE id_pregunta = :id`,
      {
        texto: pregunta_texto,
        correcta: respuesta_correcta,
        op1: opcion_1,
        op2: opcion_2,
        op3: opcion_3,
        op4: opcion_4,
        id
      }
    );
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, error: 'Pregunta no encontrada' });
    }
    
    res.json({ success: true, message: 'Pregunta actualizada' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.execute(`DELETE FROM pregunta WHERE id_pregunta = :id`, [id]);
    
    if (result.rowsAffected === 0) {
      return res.status(404).json({ success: false, error: 'Pregunta no encontrada' });
    }
    
    res.json({ success: true, message: 'Pregunta eliminada' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
