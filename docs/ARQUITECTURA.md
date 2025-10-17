# 🏗️ ARQUITECTURA DEL SISTEMA: ¡Diseño Técnico Completo! 🚀

---

## ✨ ¿Qué encontrarás en esta guía?

<div align="center">
  
  > **"Documentación técnica de la arquitectura del Sistema de Centros de Evaluación de Manejo: capas, patrones de diseño, flujos de datos y decisiones arquitectónicas"**
  
  🎯 **¡Comprende el diseño completo del sistema backend!** 🎯
  
</div>

<div align="center">

### 🎨 Características de la Arquitectura

| Característica | Tecnología | Beneficio |
|:---:|:---:|:---:|
| 🏗️ **Patrón MVC** | Express.js | Separación de responsabilidades |
| 🗄️ **Base de Datos** | Oracle 21c | Robustez empresarial |
| 🐳 **Contenedores** | Docker Compose | Portabilidad total |
| 🔄 **API REST** | Node.js + Express | Escalabilidad y rendimiento |
| 📊 **Pool de Conexiones** | node-oracledb | Eficiencia en BD |
| 🔐 **Validación** | Middleware | Seguridad en cada capa |

</div>

---

## 📋 Índice de Contenidos

<div align="center">

| Sección | Descripción |
|:---:|:---|
| [📐 Diagrama General](#-diagrama-general-de-arquitectura) | Vista completa del sistema |
| [🔄 Flujo de Datos](#-flujo-de-datos) | Cómo viajan las peticiones |
| [🗂️ Modelo de Capas](#️-modelo-de-capas) | Arquitectura en capas |
| [🗄️ Modelo de Datos](#️-modelo-de-datos) | Estructura de la BD |
| [🔐 Seguridad](#-seguridad) | Medidas implementadas |
| [⚡ Rendimiento](#-rendimiento-y-optimización) | Optimizaciones aplicadas |
| [🎯 Patrones](#-patrones-de-diseño) | Patrones utilizados |

</div>

---

## 📐 Diagrama General de Arquitectura

<div align="center">

### **Vista de 3 Capas: Cliente → API → Base de Datos**

</div>

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENTE                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                       │
│  │ Postman  │  │ Browser  │  │ Mobile   │                       │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘                       │
└───────┼─────────────┼─────────────┼────────────────────────────┘
        │             │             │
        └─────────────┴─────────────┘
                      │
                 HTTP/REST
                      │
        ┌─────────────▼─────────────┐
        │      API REST (Node.js)    │
        │    Puerto: 3000            │
        │                            │
        │  ┌──────────────────────┐  │
        │  │   Express Router     │  │
        │  └──────────┬───────────┘  │
        │             │              │
        │  ┌──────────▼───────────┐  │
        │  │   Controllers        │  │
        │  │  - centro            │  │
        │  │  - escuela           │  │
        │  │  - departamento      │  │
        │  │  - municipio         │  │
        │  │  - pregunta          │  │
        │  │  - consultas         │  │
        │  └──────────┬───────────┘  │
        │             │              │
        │  ┌──────────▼───────────┐  │
        │  │   Database Config    │  │
        │  │  (oracledb driver)   │  │
        │  └──────────┬───────────┘  │
        └─────────────┼──────────────┘
                      │
                 TCP/1521
                      │
        ┌─────────────▼─────────────┐
        │   Oracle Database XE      │
        │    Puerto: 1521           │
        │                           │
        │  Schema: SYSTEM           │
        │                           │
        │  ┌─────────────────────┐  │
        │  │  Tablas (15)        │  │
        │  │  - centro           │  │
        │  │  - escuela          │  │
        │  │  - departamento     │  │
        │  │  - municipio        │  │
        │  │  - pregunta         │  │
        │  │  - examen           │  │
        │  │  - registro         │  │
        │  │  - etc...           │  │
        │  └─────────────────────┘  │
        │                           │
        │  ┌─────────────────────┐  │
        │  │  Secuencias (11)    │  │
        │  └─────────────────────┘  │
        │                           │
        │  ┌─────────────────────┐  │
        │  │  Índices            │  │
        │  └─────────────────────┘  │
        └───────────────────────────┘
                      │
                      │
        ┌─────────────▼─────────────┐
        │       DBeaver             │
        │  (Administración)         │
        │   Puerto: 1521            │
        └───────────────────────────┘
```

---

## 🔄 Flujo de Datos

### **1. Operación CRUD (Ejemplo: Crear Centro)**

```
Cliente (Postman)
    │
    │ POST /api/centros
    │ { "nombre_centro": "Centro Norte" }
    ▼
API REST (server.js)
    │
    │ Middleware: cors, json, morgan
    ▼
Router (centro.routes.js)
    │
    │ POST /
    ▼
Controller (centro.controller.js)
    │
    │ create(req, res)
    │ - Validar datos
    │ - Llamar a database.execute()
    ▼
Database Config (database.js)
    │
    │ execute(sql, params)
    │ - Obtener conexión del pool
    │ - Ejecutar query
    ▼
Oracle Database
    │
    │ INSERT INTO centro...
    │ USING seq_centro.NEXTVAL
    │ RETURNING id_centro
    ▼
Respuesta
    │
    │ { "success": true, "data": {...} }
    ▼
Cliente recibe JSON
```

---

### **2. Consulta SQL Compleja**

```
Cliente
    │
    │ GET /api/consultas/estadisticas-centros
    ▼
API REST
    │
    ▼
Router (consultas.routes.js)
    │
    ▼
Controller (consultas.controller.js)
    │
    │ estadisticasPorCentro()
    │ - Query SQL con JOINs y agregaciones
    │ - Cálculo de promedios
    │ - Agrupación por centro/escuela
    ▼
Database
    │
    │ SELECT con múltiples tablas:
    │ - examen
    │ - centro
    │ - escuela
    │ - respuesta_usuario
    │ - respuesta_practico_usuario
    │ - pregunta
    ▼
Respuesta con estadísticas agregadas
```

---

## 🗂 Modelo de Capas

### **Capa de Presentación**
- **Clientes:** Postman, Navegador, Apps móviles
- **Protocolo:** HTTP/REST
- **Formato:** JSON

### **Capa de Aplicación**
- **Framework:** Express.js
- **Responsabilidades:**
  - Routing de peticiones
  - Validación de entrada
  - Manejo de errores
  - Lógica de negocio

### **Capa de Acceso a Datos**
- **Driver:** oracledb (node-oracledb)
- **Patrón:** Connection Pool
- **Responsabilidades:**
  - Gestión de conexiones
  - Ejecución de queries
  - Transacciones

### **Capa de Persistencia**
- **SGBD:** Oracle Express Edition 21c
- **Responsabilidades:**
  - Almacenamiento de datos
  - Integridad referencial
  - Secuencias y generación de IDs
  - Índices para rendimiento

---

## 🔐 Seguridad

### **Variables de Entorno**
```env
# Credenciales NO en código fuente
DB_USER=system
DB_PASSWORD=OraclePassword123
DB_HOST=oracle-db
```

### **Validación de Entrada**
- Todos los controllers validan parámetros
- Uso de bind variables (prevención SQL injection)
- Constraints a nivel de BD

### **Manejo de Errores**
- Try-catch en todos los endpoints
- Mensajes de error genéricos al cliente
- Logs detallados en servidor

---

## ⚡ Rendimiento

### **Connection Pooling**
```javascript
poolMin: 2,
poolMax: 10,
poolIncrement: 2
```
- Reutilización de conexiones
- Reducción de overhead
- Escalabilidad

### **Índices en Base de Datos**
```sql
CREATE INDEX idx_registro_fecha ON registro(fecha_registro);
CREATE INDEX idx_examen_registro ON examen(id_registro);
CREATE INDEX idx_respuesta_usuario_examen ON respuesta_usuario(id_examen);
```

### **Secuencias para IDs**
- Generación eficiente de claves primarias
- Sin colisiones
- Rendimiento optimizado

---

## 🐳 Contenerización

### **Docker Compose**
```yaml
services:
  oracle-db:    # Base de datos
  api:          # API REST
```

### **Ventajas:**
- ✅ Portabilidad
- ✅ Reproducibilidad
- ✅ Aislamiento
- ✅ Fácil despliegue

### **Volúmenes:**
- `oracle-data`: Persistencia de datos
- `./database/init.sql`: Auto-carga del esquema

---

## 📊 Modelo de Datos

### **Entidades Principales:**
1. **centro** - Centros de evaluación
2. **escuela** - Escuelas de manejo
3. **departamento** - División territorial
4. **municipio** - División territorial
5. **pregunta** - Banco de preguntas teóricas
6. **pregunta_practico** - Procedimientos prácticos
7. **registro** - Solicitudes de examen
8. **examen** - Exámenes realizados
9. **respuesta_usuario** - Respuestas teóricas
10. **respuesta_practico_usuario** - Calificaciones prácticas

### **Catálogos:**
- tipo_licencia (M, B, A, E, C)
- tipo_tramite (PRIMER_LICENCIA, TRASPASO)
- genero_catalogo (M, F)

### **Relaciones Clave:**
- escuela ↔ centro (muchos a muchos vía ubicacion)
- municipio → departamento (uno a muchos)
- examen → registro (uno a uno)
- respuesta_usuario → pregunta (muchos a uno)
- respuesta_usuario → examen (muchos a uno)

---

## 🔧 Configuración de Desarrollo

### **Hot Reload**
```json
"dev": "nodemon server.js"
```
- Reinicio automático al cambiar código
- Desarrollo ágil

### **Logging**
```javascript
app.use(morgan('dev'));
```
- Trazabilidad de requests
- Debugging facilitado

---

## 📈 Escalabilidad

### **Horizontal:**
- Múltiples instancias del API
- Load balancer (Nginx/HAProxy)

### **Vertical:**
- Incrementar recursos del contenedor
- Ajustar pool de conexiones

---

## 🎯 Patrones de Diseño

1. **MVC** (Modelo-Vista-Controlador)
   - Routes: Routing
   - Controllers: Lógica
   - Database: Modelo

2. **Repository Pattern**
   - Abstracción del acceso a datos
   - Database config como repositorio

3. **Dependency Injection**
   - Controllers reciben database config
   - Testabilidad mejorada


---

## 🔗 Documentación Relacionada

<div align="center">

| 📚 Guía | 📝 Descripción |
|:---:|:---:|
| [🏠 README Principal](../README.md) | Inicio y overview del proyecto |
| [🔌 Guía de Endpoints](./GUIA_ENDPOINTS.md) | Referencia de 78 endpoints |
| [🧪 Guía de Testing](./GUIA_TESTING.md) | Pruebas del sistema |
| [🗄️ Guía DBeaver](./GUIA_DBEAVER.md) | Conexión a base de datos |
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

### 🏗️ **¡Arquitectura Profesional - Sistema Backend Completo!** 🚀

*Documentación técnica del diseño del sistema*

**Desarrollado con 💙 siguiendo mejores prácticas y patrones de diseño**

---

**⭐ ¡Gracias por usar esta documentación! ⭐**

</div>
