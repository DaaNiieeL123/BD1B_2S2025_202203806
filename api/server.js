require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const oracledb = require('oracledb');

const app = express();
const PORT = process.env.API_PORT || 3000;

// Configuración de OracleDB
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Inicializar pool de conexiones
const database = require('./config/database');
database.initialize();

// Ruta de health check
app.get('/health', async (req, res) => {
  try {
    await database.execute('SELECT 1 FROM DUAL');
    res.status(200).json({
      status: 'OK',
      message: 'API de Evaluación de Manejo funcionando correctamente',
      database: 'Conectado',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Error de conexión a base de datos',
      database: 'Desconectado',
      error: error.message
    });
  }
});

// Importar rutas
const centroRoutes = require('./routes/centro.routes');
const escuelaRoutes = require('./routes/escuela.routes');
const departamentoRoutes = require('./routes/departamento.routes');
const municipioRoutes = require('./routes/municipio.routes');
const preguntaRoutes = require('./routes/pregunta.routes');
const preguntaPracticoRoutes = require('./routes/pregunta_practico.routes');
const consultasRoutes = require('./routes/consultas.routes');
// Nuevas rutas - Todas las tablas
const correlativoRoutes = require('./routes/correlativo.routes');
const generoCatalogoRoutes = require('./routes/genero_catalogo.routes');
const tipoLicenciaRoutes = require('./routes/tipo_licencia.routes');
const tipoTramiteRoutes = require('./routes/tipo_tramite.routes');
const ubicacionRoutes = require('./routes/ubicacion.routes');
const registroRoutes = require('./routes/registro.routes');
const examenRoutes = require('./routes/examen.routes');
const respuestaUsuarioRoutes = require('./routes/respuesta_usuario.routes');
const respuestaPracticoUsuarioRoutes = require('./routes/respuesta_practico_usuario.routes');

// Registrar rutas
app.use('/api/centros', centroRoutes);
app.use('/api/escuelas', escuelaRoutes);
app.use('/api/departamentos', departamentoRoutes);
app.use('/api/municipios', municipioRoutes);
app.use('/api/preguntas', preguntaRoutes);
app.use('/api/preguntas-practicas', preguntaPracticoRoutes);
app.use('/api/consultas', consultasRoutes);
// Nuevas rutas - Todas las tablas
app.use('/api/correlativos', correlativoRoutes);
app.use('/api/generos', generoCatalogoRoutes);
app.use('/api/tipos-licencia', tipoLicenciaRoutes);
app.use('/api/tipos-tramite', tipoTramiteRoutes);
app.use('/api/ubicaciones', ubicacionRoutes);
app.use('/api/registros', registroRoutes);
app.use('/api/examenes', examenRoutes);
app.use('/api/respuestas-usuario', respuestaUsuarioRoutes);
app.use('/api/respuestas-practico', respuestaPracticoUsuarioRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'API REST - Sistema de Centros de Evaluación de Manejo',
    version: '2.0.0',
    description: 'CRUD completo para todas las 15 tablas del modelo',
    endpoints: {
      health: '/health',
      // CRUD Principal
      centros: '/api/centros',
      escuelas: '/api/escuelas',
      departamentos: '/api/departamentos',
      municipios: '/api/municipios',
      preguntas: '/api/preguntas',
      preguntasPracticas: '/api/preguntas-practicas',
      // CRUD Catálogos
      correlativos: '/api/correlativos',
      generos: '/api/generos',
      tiposLicencia: '/api/tipos-licencia',
      tiposTramite: '/api/tipos-tramite',
      ubicaciones: '/api/ubicaciones',
      // CRUD Transaccional
      registros: '/api/registros',
      examenes: '/api/examenes',
      respuestasUsuario: '/api/respuestas-usuario',
      respuestasPractico: '/api/respuestas-practico',
      // Consultas SQL
      consultas: {
        estadisticas: '/api/consultas/estadisticas-centros',
        ranking: '/api/consultas/ranking-evaluadores',
        preguntaDificil: '/api/consultas/pregunta-dificil',
        general: 'POST /api/consultas/general (SQL personalizado)'
      }
    },
    totalTablas: 15,
    totalEndpoints: '75+ endpoints CRUD + 4 consultas SQL'
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: err.message
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor API corriendo en puerto ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
});

module.exports = app;
