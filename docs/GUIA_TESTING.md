# 🧪 GUÍA DE TESTING Y VERIFICACIÓN: ¡Pruebas Completas del Sistema! 🚀

---

## ✨ ¿Qué encontrarás en esta guía?

<div align="center">
  
  > **"Manual completo de testing para verificar el correcto funcionamiento del Sistema de Evaluación de Manejo con pruebas automatizadas, validación de endpoints y verificación de base de datos"**
  
  🎯 **¡Todo lo que necesitas para probar y validar el sistema!** 🎯
  
</div>

<div align="center">

### 🔍 Métodos de Testing Disponibles

| Método | Herramienta | Uso Recomendado |
|:---:|:---:|:---:|
| 🖥️ **cURL** | Terminal/Bash | Testing rápido y scripts |
| 📬 **Postman** | GUI Desktop | Testing interactivo completo |
| 🗄️ **DBeaver** | SQL Client | Verificación de datos |
| 🐳 **Docker** | Contenedores | Verificación de servicios |

</div>

---

## 📋 Índice de Contenidos

<div align="center">

| Sección | Descripción |
|:---:|:---|
| [🚀 Inicialización](#-inicialización-del-sistema) | Levantar servicios y contenedores |
| [🖥️ Testing con cURL](#️-testing-con-curl) | Pruebas desde terminal |
| [📬 Testing con Postman](#-testing-con-postman) | Colección completa de 78 endpoints |
| [🗄️ Verificación de BD](#️-verificación-de-base-de-datos) | Consultas SQL y DBeaver |
| [🔧 Troubleshooting](#-troubleshooting) | Solución de problemas comunes |

</div>

---

## 🚀 Inicialización del Sistema

<div align="center">

### **Paso 1: Levantar los Contenedores**

</div>

```bash
# Navegar al directorio del proyecto
cd "/home/daaniieel/Escritorio/FASE2 BASES/BD1B_2S2025_proyecto"

# Ejecutar script de inicio automático
./scripts/start.sh
```

<div align="center">

⏱️ **Tiempo estimado:** 2-3 minutos (primera vez)  
📦 **Servicios:** Oracle Database + API REST  
🔄 **Auto-setup:** Crea tablas automáticamente si no existen

</div>

### 💡 **¿Qué hace `start.sh`?**

<div align="center">

| Paso | Acción | Descripción |
|:---:|:---:|:---|
| 1️⃣ | ✅ Verificar Docker | Comprueba que Docker esté instalado y corriendo |
| 2️⃣ | 🐳 Levantar servicios | `docker-compose up -d` |
| 3️⃣ | ⏰ Esperar Oracle | Aguarda 60s para que BD esté lista |
| 4️⃣ | 📊 Verificar tablas | Cuenta tablas, crea si falta |
| 5️⃣ | ✨ Ready | Sistema listo para usar |

</div>

<div align="center">

### **Paso 2: Verificar Estado de Contenedores**

</div>

```bash
docker-compose ps
```

### ✅ **Salida Esperada:**

<div align="center">

| Nombre | Estado | Puertos |
|:---:|:---:|:---:|
| `oracle-evaluacion-manejo` | 🟢 Up (healthy) | `0.0.0.0:1521→1521/tcp` |
| `api-evaluacion-manejo` | 🟢 Up | `0.0.0.0:3000→3000/tcp` |

</div>

<div align="center">

### **Paso 3: Cargar Datos de Prueba (Opcional)**

</div>

```bash
# Crear tablas (si start.sh no las creó automáticamente)
docker exec -i oracle-evaluacion-manejo sqlplus -S system/OraclePassword123@XE < database/init.sql

# Cargar datos de ejemplo
docker exec -i oracle-evaluacion-manejo sqlplus -S system/OraclePassword123@XE < database/datos_prueba.sql
```

<div align="center">

📊 **Datos cargados:** 3 centros, 3 escuelas, 25 preguntas teóricas, 10 prácticas  
⏱️ **Tiempo:** ~10 segundos

</div>

---

## �️ Testing con cURL

<div align="center">

### **Pruebas Rápidas desde Terminal**

**Requisito:** `curl` y opcionalmente `jq` para formatear JSON

</div>

### 🏥 **1. Health Check - Verificar Sistema**

```bash
curl http://localhost:3000/health
```

### ✅ **Respuesta Esperada:**
```json
{
  "status": "OK",
  "message": "API de Evaluación de Manejo funcionando correctamente",
  "database": "Conectado",
  "timestamp": "2025-10-16T02:51:12.709Z"
}
```

<div align="center">

✅ Si ves esto, el sistema está **100% funcional**

</div>

### 2. Endpoints CRUD

#### Listar Centros
```bash
curl http://localhost:3000/api/centros | jq .
```

#### Obtener Centro por ID
```bash
curl http://localhost:3000/api/centros/1 | jq .
```

#### Crear Centro
```bash
curl -X POST http://localhost:3000/api/centros \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_centro": "Centro de Evaluación Test"
  }' | jq .
```

#### Actualizar Centro
```bash
curl -X PUT http://localhost:3000/api/centros/4 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_centro": "Centro Actualizado"
  }' | jq .
```

#### Eliminar Centro
```bash
curl -X DELETE http://localhost:3000/api/centros/4 | jq .
```

### 3. Endpoints de Consultas SQL

#### Estadísticas por Centro
```bash
curl "http://localhost:3000/api/consultas/estadisticas-centros" | jq .
```

**Descripción:** Muestra promedios de punteos teóricos y prácticos por centro/escuela, y cantidad de aprobados.

#### Ranking de Evaluadores
```bash
curl "http://localhost:3000/api/consultas/ranking-evaluadores" | jq .
```

**Descripción:** Lista evaluadores ordenados por resultado (APROBADO/REPROBADO), punteo total y fecha.

#### Pregunta Más Difícil
```bash
curl "http://localhost:3000/api/consultas/pregunta-dificil" | jq .
```

**Descripción:** Identifica la pregunta con menor porcentaje de aciertos y su estadística.

### 4. Otros Endpoints

```bash
# Escuelas
curl http://localhost:3000/api/escuelas | jq .

# Departamentos
curl http://localhost:3000/api/departamentos | jq .

# Municipios
curl http://localhost:3000/api/municipios | jq .

# Preguntas Teóricas
curl http://localhost:3000/api/preguntas | jq .

# Preguntas Prácticas
curl http://localhost:3000/api/preguntas-practico | jq .
```

---

## 📬 Testing con Postman

### Importar la Colección

1. Abre Postman
2. Click en **Import**
3. Selecciona el archivo `postman/Evaluacion_Manejo.postman_collection.json`
4. La colección aparecerá en tu workspace

### Estructura de la Colección

```
📁 Evaluación de Manejo API
├── 🏥 Health Check
├── 📁 Centros (5 requests)
│   ├── GET All Centros
│   ├── GET Centro by ID
│   ├── POST Create Centro
│   ├── PUT Update Centro
│   └── DELETE Centro
├── 📁 Escuelas (5 requests)
├── 📁 Departamentos (5 requests)
├── 📁 Municipios (5 requests)
├── 📁 Preguntas (5 requests)
├── 📁 Preguntas Práctico (5 requests)
└── 📁 Consultas SQL (3 requests)
    ├── Estadísticas por Centro
    ├── Ranking Evaluadores
    └── Pregunta Más Difícil
```

### Ejecución de Tests

1. **Individual:** Click en un request → Send
2. **Folder completo:** Click derecho en folder → Run folder
3. **Toda la colección:** Click derecho en colección → Run collection

---

## 🗄️ Verificación de Base de Datos

### Conectar con DBeaver

Ver la guía completa en [`docs/GUIA_DBEAVER.md`](./GUIA_DBEAVER.md)

**Conexión rápida:**
```
Host: localhost
Port: 1521
Database: XE
User: evaluacion_manejo
Password: EvaluacionPass123
```

### Consultas SQL Directas

```bash
# Conectar a la base de datos
docker exec -it oracle-evaluacion-manejo sqlplus system/OraclePassword123@XE

# Verificar tablas
SELECT table_name FROM user_tables ORDER BY table_name;

# Contar registros
SELECT 'Centros: ' || COUNT(*) FROM centro;
SELECT 'Escuelas: ' || COUNT(*) FROM escuela;
SELECT 'Preguntas: ' || COUNT(*) FROM pregunta;
```

---

## 🔧 Troubleshooting

### Problema: "ORA-00942: table or view does not exist"

**Solución:** Las tablas no se crearon. Ejecuta:
```bash
docker exec -i oracle-evaluacion-manejo sqlplus -S system/OraclePassword123@XE < database/init.sql
```

### Problema: "Cannot connect to database"

**Solución 1:** Verifica que Oracle esté healthy
```bash
docker-compose ps
```

**Solución 2:** Espera 1-2 minutos más y vuelve a intentar

### Problema: "Port 3000 already in use"

**Solución:** Detén el proceso que usa el puerto o cambia el puerto en `.env`:
```bash
# Opción 1: Cambiar puerto
echo "API_PORT=3001" >> .env
docker-compose up -d

# Opción 2: Matar proceso
sudo lsof -ti:3000 | xargs kill -9
```

### Problema: Datos vacíos en consultas SQL

**Solución:** Las consultas SQL funcionan pero no hay datos de evaluaciones. Para probar con datos reales:

```bash
# Cargar datos de prueba
docker exec -i oracle-evaluacion-manejo sqlplus -S system/OraclePassword123@XE < database/datos_prueba.sql
```

### Ver Logs del API

```bash
docker-compose logs -f api
```

### Ver Logs de Oracle

```bash
docker-compose logs -f oracle-db
```

### Reiniciar todo desde cero

```bash
./scripts/stop.sh
docker volume rm bd1b_2s2025_proyecto_oracle-data
./scripts/start.sh
```

---

## 📊 Datos de Prueba Cargados

Después de ejecutar `datos_prueba.sql`:

- ✅ 3 Centros de Evaluación
- ✅ 3 Escuelas de Manejo
- ✅ 3 Departamentos
- ✅ 4 Municipios
- ✅ 25 Preguntas Teóricas
- ✅ 10 Preguntas Prácticas
- ✅ 6 Ubicaciones (relación escuela-centro)


---

## 🔗 Documentación Relacionada

<div align="center">

| 📚 Guía | 📝 Descripción |
|:---:|:---:|
| [🏠 README Principal](../README.md) | Inicio y overview del proyecto |
| [🔌 Guía de Endpoints](./GUIA_ENDPOINTS.md) | Referencia de 78 endpoints |
| [🗄️ Guía DBeaver](./GUIA_DBEAVER.md) | Conexión a base de datos |
| [🏗️ Arquitectura](./ARQUITECTURA.md) | Diseño del sistema |
| [🔧 Troubleshooting](./TROUBLESHOOTING.md) | Solución de problemas |

</div>

---

## 👥 Información del Proyecto

<div align="center">

**🎓 Universidad de San Carlos de Guatemala**  
**Facultad de Ingeniería - Ciencias y Sistemas**

---

**👨‍💻 Desarrollador:** Héctor Daniel Ortiz Osorio  
**📧 Carnet:** 202203806  
**📚 Curso:** Bases de Datos 1 - Sección B

---

**🔗 Repositorio**  
[![GitHub](https://img.shields.io/badge/GitHub-DaaNiieeL123/BD1B__2S2025__202203806-black?logo=github)](https://github.com/DaaNiieeL123/BD1B_2S2025_202203806)

</div>

---

<div align="center">

### 🧪 **¡Testing Completo - Verifica Todo el Sistema!** 🚀

*Manual de pruebas para Postman, cURL y DBeaver*

**Desarrollado con 💙 para garantizar calidad y funcionamiento**

---

**⭐ ¡Gracias por usar esta documentación! ⭐**

</div>
