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
    const data = req.body;
    const preguntas = Array.isArray(data) ? data : [data];
    
    // Validar que todas las preguntas tengan los campos requeridos
    for (const preg of preguntas) {
      if (!preg.id_pregunta || !preg.pregunta_texto || !preg.respuesta_correcta || 
          !preg.opcion_1 || !preg.opcion_2 || !preg.opcion_3 || !preg.opcion_4) {
        return res.status(400).json({
          success: false,
          error: 'Todos los campos son requeridos: id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4'
        });
      }
    }
    
    const insertedData = [];
    
    // Insertar cada pregunta
    for (const preg of preguntas) {
      await db.execute(
        `INSERT INTO pregunta 
         (id_pregunta, pregunta_texto, respuesta_correcta, opcion_1, opcion_2, opcion_3, opcion_4) 
         VALUES (:id_pregunta, :texto, :correcta, :op1, :op2, :op3, :op4)`,
        {
          id_pregunta: preg.id_pregunta,
          texto: preg.pregunta_texto,
          correcta: preg.respuesta_correcta,
          op1: preg.opcion_1,
          op2: preg.opcion_2,
          op3: preg.opcion_3,
          op4: preg.opcion_4
        },
        { autoCommit: true }
      );
      
      insertedData.push({
        id_pregunta: preg.id_pregunta,
        pregunta_texto: preg.pregunta_texto,
        respuesta_correcta: preg.respuesta_correcta,
        opcion_1: preg.opcion_1,
        opcion_2: preg.opcion_2,
        opcion_3: preg.opcion_3,
        opcion_4: preg.opcion_4
      });
    }
    
    res.status(201).json({
      success: true,
      data: Array.isArray(data) ? insertedData : insertedData[0],
      count: insertedData.length,
      message: `${insertedData.length} pregunta(s) creada(s) exitosamente`
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
