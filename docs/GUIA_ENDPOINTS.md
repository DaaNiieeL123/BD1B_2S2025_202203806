# 🔌 GUÍA COMPLETA DE ENDPOINTS API: ¡78 Endpoints Documentados! 🚀

---

## ✨ ¿Qué encontrarás en esta guía?

<div align="center">
  
  > **"Documentación técnica completa de los 78 endpoints REST del Sistema de Centros de Evaluación de Manejo con ejemplos de request/response para cada operación"**
  
  🎯 **¡Referencia definitiva para desarrolladores y testers!** 🎯
  
</div>

<div align="center">

### 📊 Resumen de la API

| Categoría | Cantidad | Descripción |
|:---:|:---:|:---:|
| 🏥 **Health Check** | 1 | Verificación del sistema |
| 📋 **Catálogos** | 25 | 5 tablas × 5 operaciones |
| 🏢 **Entidades** | 20 | 4 tablas × 5 operaciones |
| 📝 **Transaccionales** | 25 | 5 tablas × 5 operaciones |
| 🔗 **Relaciones** | 3 | 1 tabla × 3 operaciones |
| 📊 **Consultas SQL** | 4 | 3 obligatorias + 1 personalizada |
| **🎯 TOTAL** | **78** | **API REST completa** |

</div>

---

## 📋 Tabla de Contenidos

<div align="center">

| Sección | Descripción |
|:---:|:---|
| [🌐 Base URL](#-base-url) | URL base de la API |
| [🏥 Health Check](#-health-check) | Verificación del sistema |
| [📋 Catálogos](#-catálogos-25-endpoints) | Géneros, Licencias, Trámites, Geografía |
| [🏢 Entidades Principales](#-entidades-principales-20-endpoints) | Centros, Escuelas, Preguntas |
| [📝 Transaccionales](#-transaccionales-25-endpoints) | Correlativos, Registros, Exámenes, Respuestas |
| [🔗 Relaciones](#-relaciones-3-endpoints) | Ubicaciones Escuela-Centro |
| [📊 Consultas SQL](#-consultas-sql-4-endpoints) | Análisis y estadísticas |
| [📏 Orden de Inserción](#-orden-recomendado-de-inserción) | Secuencia para cargar datos |

</div>

---

## 🌐 Base URL

<div align="center">

```
http://localhost:3000
```

**Puerto por defecto:** `3000`  
**Protocolo:** `HTTP`  
**Formato de respuesta:** `JSON`

</div>

---

## 🏥 Health Check

<div align="center">

### **Verificar Estado del Sistema**

| Método | Ruta | Descripción |
|:---:|:---:|:---:|
| `GET` | `/health` | Verifica API y conexión a BD |

</div>

### 📡 **Request**
```http
GET http://localhost:3000/health
```

### ✅ **Respuesta Exitosa (200 OK)**
```json
{
  "status": "OK",
  "message": "API de Evaluación de Manejo funcionando correctamente",
  "database": "Conectado",
  "timestamp": "2025-10-16T02:51:12.709Z"
}
```

### ⚠️ **Respuesta con Error de BD (500)**
```json
{
  "status": "ERROR",
  "message": "Error en la conexión a la base de datos",
  "database": "Desconectado"
}
```

---

## 📋 Catálogos (25 Endpoints)

<div align="center">

### **5 Tablas Maestras del Sistema**

| Tabla | Endpoints | Descripción |
|:---:|:---:|:---:|
| 🚻 **Géneros** | 5 | Catálogo de géneros (M/F) |
| 🪪 **Tipos Licencia** | 5 | Tipos de licencias (A, B, C, M, E) |
| 📄 **Tipos Trámite** | 5 | Tipos de trámites (Primera vez, Renovación) |
| 🌎 **Departamentos** | 5 | División territorial nivel 1 |
| 🏘️ **Municipios** | 5 | División territorial nivel 2 |

</div>

#### 1️⃣ Géneros

```http
GET    /api/generos           # Listar todos
GET    /api/generos/:id       # Obtener por ID
POST   /api/generos           # Crear nuevo
PUT    /api/generos/:id       # Actualizar
DELETE /api/generos/:id       # Eliminar
```

**Ejemplo POST:**
```json
{
  "genero": "M",
  "descripcion_genero": "Masculino"
}
```

---

#### 2️⃣ Tipos de Licencia

```http
GET    /api/tipos-licencia    # Listar todos
GET    /api/tipos-licencia/:id # Obtener por ID
POST   /api/tipos-licencia    # Crear nuevo
PUT    /api/tipos-licencia/:id # Actualizar
DELETE /api/tipos-licencia/:id # Eliminar
```

**Ejemplo POST:**
```json
{
  "tipo_licencia": "B",
  "descripcion_licencia": "Liviana (automóviles)"
}
```

**Valores válidos:** A (Motocicleta), B (Liviana), C (Pesada), M (Maquinaria), E (Especial)

---

#### 3️⃣ Tipos de Trámite

```http
GET    /api/tipos-tramite     # Listar todos
GET    /api/tipos-tramite/:id # Obtener por ID
POST   /api/tipos-tramite     # Crear nuevo
PUT    /api/tipos-tramite/:id # Actualizar
DELETE /api/tipos-tramite/:id # Eliminar
```

**Ejemplo POST:**
```json
{
  "tipo_tramite": "PRIMER_LICENCIA",
  "descripcion_tramite": "Primera vez que solicita licencia"
}
```

**Valores válidos:** PRIMER_LICENCIA, TRASPASO, REPOSICION

---

#### 4️⃣ Departamentos

```http
GET    /api/departamentos     # Listar todos
GET    /api/departamentos/:id # Obtener por ID
POST   /api/departamentos     # Crear nuevo
PUT    /api/departamentos/:id # Actualizar
DELETE /api/departamentos/:id # Eliminar
```

**Ejemplo POST:**
```json
{
  "nombre_departamento": "Guatemala",
  "codigo_departamento": "01"
}
```

---

#### 5️⃣ Municipios

```http
GET    /api/municipios        # Listar todos
GET    /api/municipios/:id    # Obtener por ID
POST   /api/municipios        # Crear nuevo
PUT    /api/municipios/:id    # Actualizar
DELETE /api/municipios/:id    # Eliminar
```

**Ejemplo POST:**
```json
{
  "id_departamento": 1,
  "nombre_municipio": "Guatemala",
  "codigo_municipio": "0101"
}
```

---

### Entidades Principales (4 tablas)

#### 6️⃣ Centros de Evaluación

```http
GET    /api/centros           # Listar todos
GET    /api/centros/:id       # Obtener por ID
POST   /api/centros           # Crear nuevo
PUT    /api/centros/:id       # Actualizar
DELETE /api/centros/:id       # Eliminar
```

**Ejemplo POST:**
```json
{
  "nombre_centro": "Centro Evaluación Guatemala Norte"
}
```

---

#### 7️⃣ Escuelas de Manejo

```http
GET    /api/escuelas          # Listar todas
GET    /api/escuelas/:id      # Obtener por ID
POST   /api/escuelas          # Crear nueva
PUT    /api/escuelas/:id      # Actualizar
DELETE /api/escuelas/:id      # Eliminar
```

**Ejemplo POST:**
```json
{
  "nombre_escuela": "Academia de Manejo Profesional",
  "direccion_escuela": "5ta Avenida 10-50 Zona 1",
  "numero_acuerdo": "ACU-2024-001"
}
```

---

#### 8️⃣ Preguntas Teóricas

```http
GET    /api/preguntas         # Listar todas
GET    /api/preguntas/:id     # Obtener por ID
POST   /api/preguntas         # Crear nueva
PUT    /api/preguntas/:id     # Actualizar
DELETE /api/preguntas/:id     # Eliminar
```

**Ejemplo POST:**
```json
{
  "pregunta_texto": "¿Cuál es la velocidad máxima permitida en zona escolar?",
  "respuesta_correcta": 1,
  "opcion_1": "20 km/h",
  "opcion_2": "40 km/h",
  "opcion_3": "60 km/h",
  "opcion_4": "80 km/h"
}
```

**Nota:** `respuesta_correcta` puede ser 1, 2, 3 o 4 (corresponde a las opciones)

---

#### 9️⃣ Preguntas Prácticas

```http
GET    /api/preguntas-practicas     # Listar todas
GET    /api/preguntas-practicas/:id # Obtener por ID
POST   /api/preguntas-practicas     # Crear nueva
PUT    /api/preguntas-practicas/:id # Actualizar
DELETE /api/preguntas-practicas/:id # Eliminar
```

**Ejemplo POST:**
```json
{
  "pregunta_texto": "Estacionamiento en paralelo",
  "punteo_maximo": 10
}
```

---

### Transaccionales (5 tablas)

#### 🔟 Correlativos

```http
GET    /api/correlativos      # Listar todos
GET    /api/correlativos/:id  # Obtener por ID
POST   /api/correlativos      # Crear nuevo
PUT    /api/correlativos/:id  # Actualizar
DELETE /api/correlativos/:id  # Eliminar
```

**Ejemplo POST:**
```json
{
  "fecha_correlativo": "2024-10-16",
  "no_examen": 1
}
```

**Descripción:** Numeración secuencial diaria para exámenes.

---

#### 1️⃣1️⃣ Registros (Aspirantes)

```http
GET    /api/registros         # Listar todos
GET    /api/registros/:id     # Obtener por ID
POST   /api/registros         # Crear nuevo
PUT    /api/registros/:id     # Actualizar
DELETE /api/registros/:id     # Eliminar
```

**Ejemplo POST:**
```json
{
  "nombre_completo": "Juan Carlos Pérez García",
  "fecha_nacimiento": "1995-05-15",
  "genero": "M",
  "tipo_licencia": "B",
  "tipo_tramite": "PRIMER_LICENCIA",
  "fecha_registro": "2024-10-16",
  "direccion": "5ta Avenida 10-50 Zona 1",
  "telefono": "55551234",
  "correo_electronico": "juan.perez@email.com"
}
```

---

#### 1️⃣2️⃣ Exámenes

```http
GET    /api/examenes          # Listar todos
GET    /api/examenes/:id      # Obtener por ID
POST   /api/examenes          # Crear nuevo
PUT    /api/examenes/:id      # Actualizar
DELETE /api/examenes/:id      # Eliminar
```

**Ejemplo POST:**
```json
{
  "id_registro": 1,
  "id_correlativo": 1,
  "id_centro": 1,
  "id_escuela": 1,
  "id_municipio": 1,
  "id_departamento": 1,
  "fecha_examen": "2024-10-16"
}
```

**Descripción:** Relaciona un aspirante con un examen en fecha, centro y ubicación específicos.

---

#### 1️⃣3️⃣ Respuestas de Usuario (Teórico)

```http
GET    /api/respuestas-usuario        # Listar todas
GET    /api/respuestas-usuario/:id    # Obtener por ID
POST   /api/respuestas-usuario        # Crear nueva
PUT    /api/respuestas-usuario/:id    # Actualizar
DELETE /api/respuestas-usuario/:id    # Eliminar
```

**Ejemplo POST:**
```json
{
  "id_examen": 1,
  "id_pregunta": 1,
  "respuesta_seleccionada": 3
}
```

**Descripción:** Registra la respuesta seleccionada (1-4) para cada pregunta teórica del examen.

---

#### 1️⃣4️⃣ Respuestas Prácticas de Usuario

```http
GET    /api/respuestas-practicas        # Listar todas
GET    /api/respuestas-practicas/:id    # Obtener por ID
POST   /api/respuestas-practicas        # Crear nueva
PUT    /api/respuestas-practicas/:id    # Actualizar
DELETE /api/respuestas-practicas/:id    # Eliminar
```

**Ejemplo POST:**
```json
{
  "id_examen": 1,
  "id_pregunta_practico": 1,
  "nota_obtenida": 8.5
}
```

**Descripción:** Calificación (0-10) obtenida en cada maniobra práctica.

---

### Relaciones (1 tabla)

#### 1️⃣5️⃣ Ubicaciones (Escuela-Centro)

```http
GET    /api/ubicaciones                              # Listar todas
GET    /api/ubicaciones/:id_escuela/:id_centro       # Obtener por IDs
POST   /api/ubicaciones                              # Crear nueva
DELETE /api/ubicaciones/:id_escuela/:id_centro       # Eliminar
```

**⚠️ Nota:** No tiene PUT porque usa llave primaria compuesta (id_escuela, id_centro)

**Ejemplo POST:**
```json
{
  "id_escuela": 1,
  "id_centro": 1
}
```

**Descripción:** Define qué escuelas pueden evaluar en qué centros.

---

## Consultas SQL

### CONSULTA 1: Estadísticas por Centro y Escuela

```http
GET /api/consultas/estadisticas-centros
```

**Descripción:** Promedios de punteos teóricos y prácticos agrupados por centro y escuela.

**Campos devueltos:**
- `centro`: Nombre del centro
- `escuela`: Nombre de la escuela
- `total_examenes`: Cantidad de exámenes
- `promedio_teorico`: Promedio teórico (4pts por correcta)
- `promedio_practico`: Promedio práctico
- `total_aprobados`: Aprobados (ambos >= 70)

**Ejemplo de respuesta:**
```json
{
  "success": true,
  "consulta": "Estadísticas de evaluaciones por centro y escuela",
  "data": [
    {
      "CENTRO": "Centro Guatemala Norte",
      "ESCUELA": "Academia Profesional",
      "TOTAL_EXAMENES": 150,
      "PROMEDIO_TEORICO": 78.5,
      "PROMEDIO_PRACTICO": 82.3,
      "TOTAL_APROBADOS": 120
    }
  ]
}
```

---

### CONSULTA 2: Ranking de Evaluadores

```http
GET /api/consultas/ranking-evaluadores
```

**Descripción:** Lista ordenada de evaluados por puntaje total y resultado.

**Campos devueltos:**
- `nombre_completo`: Nombre del evaluado
- `tipo_licencia`: Tipo solicitado
- `genero`: Género
- `fecha`: Fecha del examen
- `punteo_teorico`: Puntaje teórico
- `punteo_practico`: Puntaje práctico
- `punteo_total`: Suma total
- `resultado_final`: APROBADO / REPROBADO
- `ubicacion`: Centro, escuela, municipio, departamento

**Ordenamiento:**
1. Aprobados primero
2. Punteo total DESC
3. Fecha ASC

---

### CONSULTA 3: Pregunta Más Difícil

```http
GET /api/consultas/pregunta-dificil
```

**Descripción:** Identifica la pregunta con menor % de aciertos.

**Campos devueltos:**
- `id_pregunta`: ID
- `pregunta_texto`: Texto
- `opcion_A/B/C/D`: Opciones
- `respuesta_correcta`: Correcta (A/B/C/D)
- `respuestas_A/B/C/D`: Cantidad seleccionada
- `total_aciertos`: Total correctas
- `porcentaje_aciertos`: % de aciertos
- `estado_recomendacion`: REVISAR URGENTE / REVISAR / ACEPTABLE

---

### CONSULTA GENERAL: SQL Personalizado

```http
POST /api/consultas/general
```

**Descripción:** Ejecuta consultas SELECT personalizadas.

**Body:**
```json
{
  "query": "SELECT * FROM centro WHERE ROWNUM <= 5"
}
```

**Seguridad:** Solo permite SELECT

**Ejemplo - Contar exámenes por centro:**
```json
{
  "query": "SELECT c.nombre_centro, COUNT(e.id_examen) as total FROM centro c LEFT JOIN examen e ON c.id_centro = e.id_centro GROUP BY c.nombre_centro"
}
```

---

## 📊 Resumen de Endpoints

| Recurso | Endpoints | Total |
|---------|-----------|-------|
| Health Check | 1 | 1 |
| Géneros | 5 | 5 |
| Tipos Licencia | 5 | 5 |
| Tipos Trámite | 5 | 5 |
| Departamentos | 5 | 5 |
| Municipios | 5 | 5 |
| Centros | 5 | 5 |
| Escuelas | 5 | 5 |
| Preguntas Teóricas | 5 | 5 |
| Preguntas Prácticas | 5 | 5 |
| Correlativos | 5 | 5 |
| Registros | 5 | 5 |
| Exámenes | 5 | 5 |
| Respuestas Teóricas | 5 | 5 |
| Respuestas Prácticas | 5 | 5 |
| Ubicaciones | 3 | 3 |
| Consultas SQL | 4 | 4 |
| **TOTAL** | | **78** |

---

## 🔄 Orden Recomendado de Inserción

Para insertar datos correctamente (respetando FK):

1. **Catálogos** (sin dependencias)
   - Géneros
   - Tipos de Licencia
   - Tipos de Trámite
   - Departamentos

2. **Ubicaciones Geográficas**
   - Municipios (requiere Departamentos)

3. **Entidades Principales**
   - Centros
   - Escuelas
   - Preguntas Teóricas
   - Preguntas Prácticas

4. **Relaciones**
   - Ubicaciones (requiere Escuelas y Centros)

5. **Transaccionales**
   - Correlativos
   - Registros (requiere Géneros, Tipos Licencia, Tipos Trámite)
   - Exámenes (requiere Registros, Correlativos, Centros, Escuelas, Municipios, Departamentos)
   - Respuestas Teóricas (requiere Exámenes, Preguntas)
   - Respuestas Prácticas (requiere Exámenes, Preguntas Prácticas)

---

## 🔗 Documentación Relacionada

<div align="center">

| 📚 Guía | 📝 Descripción |
|:---:|:---:|
| [🏠 README Principal](../README.md) | Inicio y overview del proyecto |
| [🧪 Guía de Testing](./GUIA_TESTING.md) | Pruebas con Postman y cURL |
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

### 🔌 **¡78 Endpoints Documentados - API REST Completa!** 🚀

*Referencia técnica para desarrolladores y testers*

**Desarrollado con 💙 para el aprendizaje de APIs REST y bases de datos**

---

**⭐ ¡Gracias por usar esta documentación! ⭐**

</div>
