const oracledb = require('oracledb');

const dbConfig = {
  user: process.env.DB_USER || 'system',
  password: process.env.DB_PASSWORD || 'OraclePassword123',
  connectString: `${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '1521'}/${process.env.DB_SERVICE_NAME || 'XE'}`
};

async function initialize() {
  try {
    await oracledb.createPool({
      user: dbConfig.user,
      password: dbConfig.password,
      connectString: dbConfig.connectString,
      poolMin: 2,
      poolMax: 10,
      poolIncrement: 2
    });
    console.log('✅ Pool de conexiones Oracle creado exitosamente');
  } catch (err) {
    console.error('❌ Error al crear pool de conexiones Oracle:', err);
    process.exit(1);
  }
}

async function close() {
  try {
    await oracledb.getPool().close(10);
    console.log('✅ Pool de conexiones Oracle cerrado');
  } catch (err) {
    console.error('❌ Error al cerrar pool de conexiones:', err);
  }
}

async function execute(sql, binds = [], opts = {}) {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(sql, binds, opts);
    return result;
  } catch (err) {
    console.error('❌ Error ejecutando query:', err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('❌ Error cerrando conexión:', err);
      }
    }
  }
}

module.exports = {
  initialize,
  close,
  execute,
  BIND_OUT: oracledb.BIND_OUT,
  BIND_IN: oracledb.BIND_IN,
  NUMBER: oracledb.NUMBER,
  STRING: oracledb.STRING,
  DATE: oracledb.DATE,
  OUT_FORMAT_OBJECT: oracledb.OUT_FORMAT_OBJECT
};
