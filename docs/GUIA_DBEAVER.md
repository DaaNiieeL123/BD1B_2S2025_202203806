# 📘 GUÍA DE CONEXIÓN DBEAVER: ¡Administra tu Base de Datos! 🚀

---

## ✨ ¿Qué encontrarás en esta guía?

<div align="center">
  
  > **"Manual paso a paso para conectar DBeaver al contenedor Oracle, visualizar la estructura de la base de datos y ejecutar consultas SQL de verificación"**
  
  🎯 **¡Administra y visualiza tus 15 tablas de forma profesional!** 🎯
  
</div>

<div align="center">

### 🗄️ ¿Por qué usar DBeaver?

| Característica | Beneficio |
|:---:|:---:|
| 🖥️ **Interfaz Gráfica** | Visualización intuitiva de tablas |
| 📊 **Diagramas ER** | Generación automática de relaciones |
| 🔍 **Explorador SQL** | Consultas con autocompletado |
| 📈 **Visualización de Datos** | Tablas, gráficos y exportación |
| 🆓 **Gratuito** | Community Edition sin costo |

</div>

---

## 📋 Requisitos Previos

<div align="center">

| Requisito | Estado | Acción |
|:---:|:---:|:---:|
| 🖥️ **DBeaver Community** | ⏳ | [Descargar aquí](https://dbeaver.io/download/) |
| 🐳 **Docker Desktop** | 🟢 Running | `docker ps` para verificar |
| 📦 **Contenedores Activos** | 🟢 Up | `docker-compose ps` |
| 🗄️ **Oracle Database** | 🟢 Healthy | Puerto 1521 disponible |

</div>

---

## 🔌 Paso 1: Crear Nueva Conexión

1. Abrir **DBeaver**
2. Click en menú **Database** → **New Database Connection**
3. Seleccionar **Oracle** de la lista
4. Click en **Next**

---

## ⚙️ Paso 2: Configurar Conexión

### **Datos de Conexión:**

| Campo | Valor |
|-------|-------|
| **Host** | `localhost` |
| **Port** | `1521` |
| **Database** | `XE` |
| **Service name** | `XE` |
| **Username** | `system` |
| **Password** | `OraclePassword123` |

### **Configuración Detallada:**

```
Connection name: Oracle - Evaluación Manejo
Connect by: Service name
Service name: XE
Authentication: Database Native
Username: system
Password: OraclePassword123
Save password: ✓ (opcional)
```

---

## 🧪 Paso 3: Probar Conexión

1. Click en **Test Connection**
2. Si es la primera vez, DBeaver descargará los drivers de Oracle
3. Debe aparecer: **Connected** ✅
4. Click en **Finish**

---

## 📂 Paso 4: Explorar la Base de Datos

### **⚠️ PROBLEMA COMÚN: Demasiadas tablas del sistema de Oracle**

Oracle crea automáticamente muchas tablas del sistema (LOGMNR_*, MVIEW$_*, AQ$_*, etc.) que se mezclan con tus tablas personales. Esto dificulta encontrar tus 15 tablas.

### **✅ SOLUCIÓN 1: Filtrar tablas por nombre (RECOMENDADO PARA EVIDENCIA)**

**Método A: Usar el filtro de búsqueda**

1. En el **Database Navigator** (panel izquierdo)
2. Expande: **XE** → **Schemas** → **SYSTEM** → **Tables**
3. Arriba de la lista de tablas verás un campo de búsqueda
4. Escribe uno de los nombres de tus tablas, por ejemplo: `CENTRO`
5. Presiona Enter
6. Verás solo esa tabla
7. Para ver todas tus tablas, borra el filtro

**Método B: Configurar filtro permanente para ocultar tablas del sistema**

1. Click derecho en **Tables** (bajo SYSTEM)
2. Selecciona **Filter Settings** o **Configure Filters**
3. En la ventana de filtros:
   - Click en **Add** o **+**
   - **Attribute:** `Name`
   - **Condition:** `NOT LIKE`
   - **Value:** `LOGMNR%`
4. Agregar más filtros:
   - Click **Add** → Name → NOT LIKE → `MVIEW$%`
   - Click **Add** → Name → NOT LIKE → `AQ$%`
   - Click **Add** → Name → NOT LIKE → `LOGSTDBY$%`
   - Click **Add** → Name → NOT LIKE → `ROLLING$%`
   - Click **Add** → Name → NOT LIKE → `SCHEDULER%`
   - Click **Add** → Name → NOT LIKE → `REPL_%`
   - Click **Add** → Name → NOT LIKE → `OL$%`
   - Click **Add** → Name → NOT LIKE → `REDO_%`
   - Click **Add** → Name → NOT LIKE → `SQLPLUS%`
5. Click **OK**
6. Click derecho en **Tables** → **Refresh**

Ahora deberías ver SOLO tus 15 tablas + las 3 de catálogo:
- ✅ CENTRO
- ✅ CORRELATIVO
- ✅ DEPARTAMENTO
- ✅ ESCUELA
- ✅ EXAMEN
- ✅ GENERO_CATALOGO
- ✅ MUNICIPIO
- ✅ PREGUNTA
- ✅ PREGUNTA_PRACTICO
- ✅ REGISTRO
- ✅ RESPUESTA_PRACTICO_USUARIO
- ✅ RESPUESTA_USUARIO
- ✅ TIPO_LICENCIA
- ✅ TIPO_TRAMITE
- ✅ UBICACION

### **✅ SOLUCIÓN 2: Crear una carpeta personalizada (MEJOR PARA SCREENSHOTS)**

1. En DBeaver, click en **Window** → **Preferences**
2. Ve a: **Database** → **Metadata**
3. Marca: **Read table statistics on open**
4. Click **Apply and Close**

Ahora para ver tus tablas claramente:

1. Click derecho en **XE** (la base de datos)
2. Selecciona **SQL Editor** → **New SQL Script**
3. Pega este código:

```sql
-- Script para listar solo tus tablas del proyecto
SELECT table_name, num_rows
FROM user_tables
WHERE table_name IN (
    'CENTRO', 'ESCUELA', 'UBICACION', 'DEPARTAMENTO', 'MUNICIPIO',
    'PREGUNTA', 'PREGUNTA_PRACTICO', 'REGISTRO', 'EXAMEN',
    'RESPUESTA_USUARIO', 'RESPUESTA_PRACTICO_USUARIO', 'CORRELATIVO',
    'TIPO_LICENCIA', 'TIPO_TRAMITE', 'GENERO_CATALOGO'
)
ORDER BY table_name;
```

4. Ejecuta (Ctrl+Enter)
5. En los resultados, puedes ver cada tabla con su cantidad de filas
6. Para ver datos de una tabla: Click derecho en el nombre de la tabla en los resultados → **Navigate** → **Table**

### **✅ SOLUCIÓN 3: Usar el Data Transfer de DBeaver**

1. Click derecho en **SYSTEM** schema
2. **Tools** → **Database Export**
3. Selecciona solo tus 15 tablas
4. Esto te permite exportar o simplemente visualizar tus tablas agrupadas

### **🎯 PARA LA EVIDENCIA DEL PROYECTO:**

**Screenshot 1: Tablas filtradas**
- Usa el filtro de nombre (escribe `CENTRO`) 
- Captura mostrando la tabla CENTRO con su estructura

**Screenshot 2: Ver datos de una tabla**
1. Expande **SYSTEM** → **Tables**
2. Busca la tabla **CENTRO** (puede estar entre las demás)
3. Click derecho en **CENTRO** → **View Data**
4. Captura la ventana mostrando los 3 centros

**Screenshot 3: Lista completa usando SQL**
```sql
SELECT table_name, num_rows 
FROM user_tables 
WHERE table_name IN (
    'CENTRO', 'ESCUELA', 'DEPARTAMENTO', 'MUNICIPIO',
    'PREGUNTA', 'PREGUNTA_PRACTICO', 'UBICACION'
)
ORDER BY table_name;
```

Esto muestra profesionalmente que tienes tus tablas con datos.

### **Estructura de Navegación (después de aplicar filtros):**

```
Oracle - Evaluación Manejo
└── XE
    └── Schemas
        └── SYSTEM (filtrado)
            ├── Tables (solo 15 tablas visibles)
            │   ├── CENTRO ⭐
            │   ├── CORRELATIVO ⭐
            │   ├── DEPARTAMENTO ⭐
            │   ├── ESCUELA ⭐
            │   ├── EXAMEN ⭐
            │   ├── GENERO_CATALOGO ⭐
            │   ├── MUNICIPIO ⭐
            │   ├── PREGUNTA ⭐
            │   ├── PREGUNTA_PRACTICO ⭐
            │   ├── REGISTRO ⭐
            │   ├── RESPUESTA_PRACTICO_USUARIO ⭐
            │   ├── RESPUESTA_USUARIO ⭐
            │   ├── TIPO_LICENCIA ⭐
            │   ├── TIPO_TRAMITE ⭐
            │   └── UBICACION ⭐
            ├── Sequences (11 secuencias)
            └── Indexes
```

---

## 🔍 Paso 5: Verificar Datos

### **💡 Trabajar SIN el navegador de tablas**

No necesitas el navegador lateral para trabajar. Usa estas consultas directamente en el SQL Editor:

### **Consultas Útiles para Explorar:**

**1. Ver todas las tablas creadas:**
```sql
SELECT table_name, num_rows
FROM user_tables
ORDER BY table_name;
```

**2. Ver estructura de una tabla:**
```sql
-- Reemplaza CENTRO con la tabla que quieras ver
SELECT column_name, data_type, data_length, nullable
FROM user_tab_columns
WHERE table_name = 'CENTRO'
ORDER BY column_id;
```

**3. Ver datos de las tablas principales:**
```sql
-- Ver centros
SELECT * FROM centro;

-- Ver escuelas
SELECT * FROM escuela;

-- Ver departamentos
SELECT * FROM departamento;

-- Ver municipios
SELECT * FROM municipio;

-- Ver preguntas (primeras 10)
SELECT id_pregunta, pregunta_texto, respuesta_correcta
FROM pregunta
WHERE ROWNUM <= 10;
```

**4. Ver relaciones (Foreign Keys):**
```sql
SELECT 
    a.table_name AS tabla_hija,
    a.constraint_name AS fk_nombre,
    c_pk.table_name AS tabla_padre
FROM user_constraints a
JOIN user_constraints c_pk ON a.r_constraint_name = c_pk.constraint_name
WHERE a.constraint_type = 'R'
ORDER BY a.table_name;
```

**5. Ver secuencias:**
```sql
SELECT sequence_name, last_number
FROM user_sequences
ORDER BY sequence_name;
```

**6. Contar registros en todas las tablas:**
```sql
SELECT 'CENTRO' AS tabla, COUNT(*) AS registros FROM centro
UNION ALL
SELECT 'ESCUELA', COUNT(*) FROM escuela
UNION ALL
SELECT 'DEPARTAMENTO', COUNT(*) FROM departamento
UNION ALL
SELECT 'MUNICIPIO', COUNT(*) FROM municipio
UNION ALL
SELECT 'PREGUNTA', COUNT(*) FROM pregunta
UNION ALL
SELECT 'PREGUNTA_PRACTICO', COUNT(*) FROM pregunta_practico
UNION ALL
SELECT 'UBICACION', COUNT(*) FROM ubicacion
ORDER BY tabla;
```

### **Ver datos de una tabla (método alternativo):**

Si quieres ver datos como en el navegador:

1. En el SQL Editor, escribe el nombre de la tabla: `centro`
2. Selecciona la palabra `centro` con el mouse
3. Click derecho → **View Data**
4. O presiona **Ctrl+Alt+Shift+D**

---

## 📊 Paso 6: Generar Diagrama ER

1. Click derecho en **SYSTEM** schema
2. **View Diagram**
3. Seleccionar las tablas que deseas visualizar
4. DBeaver generará el diagrama automáticamente

---

## 🔧 Solución de Problemas

### **❌ PROBLEMA 1: "No veo las tablas en el navegador lateral"**

**Causa:** Oracle tiene muchos schemas del sistema (ANONYMOUS, AUDSYS, DBSFWUSER, etc.) y SYSTEM se mezcla entre ellos.

**✅ SOLUCIONES:**

**Solución A: Usar el filtro**
1. En el campo de búsqueda superior del Database Navigator
2. Escribe: `SYSTEM`
3. Presiona Enter
4. Ahora solo verás el schema SYSTEM
5. Expandir → Tables

**Solución B: Trabajar directamente con SQL (RECOMENDADO)**
```sql
-- Esta consulta te muestra todas tus tablas
SELECT table_name FROM user_tables ORDER BY table_name;
```

Luego usa:
```sql
SELECT * FROM nombre_tabla;
```

**Solución C: Cambiar la configuración de DBeaver**
1. Click derecho en la conexión → **Edit Connection**
2. Pestaña **Oracle properties**
3. Marcar: **Show only current schema**
4. Click **OK**
5. Refresh de la conexión

### **❌ PROBLEMA 2: "Error: Cannot connect to database"**

**Solución:**
```bash
# Verificar que el contenedor esté corriendo
docker ps | grep oracle

# Ver logs del contenedor
docker logs oracle-evaluacion-manejo

# Reiniciar contenedor si es necesario
docker-compose restart oracle-db
```

### **❌ PROBLEMA 3: "Access denied for user 'system'"**

**Solución:**
- Verificar contraseña en `.env`
- Asegurarse de usar `OraclePassword123`
- Revisar que el puerto sea `1521`

### **❌ PROBLEMA 4: "No suitable driver found"**

**Solución:**
- En DBeaver: **Database** → **Driver Manager**
- Seleccionar **Oracle**
- Click en **Download/Update**
- Esperar a que descargue el driver JDBC

### **❌ PROBLEMA 5: "Las tablas aparecen vacías (0 rows)"**

**Causa:** No se han cargado los datos de prueba.

**Solución:**
```bash
# Cargar datos de prueba
cd "/home/daaniieel/Escritorio/FASE2 BASES/BD1B_2S2025_proyecto"
docker exec -i oracle-evaluacion-manejo sqlplus -S system/OraclePassword123@XE < database/datos_prueba.sql
```

### **❌ PROBLEMA 6: "No encuentro el schema SYSTEM entre tantos"**

**Solución:** Ejecuta esta consulta para verificar que las tablas existen:
```sql
-- Verificar que las tablas están creadas
SELECT COUNT(*) AS total_tablas FROM user_tables;
-- Debe retornar: 15

-- Listar todas las tablas
SELECT table_name FROM user_tables ORDER BY table_name;
```

Si retorna 15, las tablas están ahí. No necesitas el navegador lateral para trabajar.

---

## 📸 Capturas Recomendadas para Documentación

1. **Conexión exitosa** (Test Connection)
2. **Lista de tablas** en el explorador
3. **Diagrama ER** del modelo completo
4. **Consulta SELECT** en una tabla
5. **Estructura de tabla** (columnas, tipos, constraints)

---

## 🎯 Verificación de Estructura

### **🚀 Método Rápido: Script de Verificación Automática**

Hemos creado un script SQL que verifica todo automáticamente:

**Pasos:**
1. En DBeaver, abre el **SQL Editor** (F3)
2. Click en **File** → **Open SQL Script**
3. Navega a: `database/scripts/verificar_estructura.sql`
4. Click en **Execute SQL Script** (▶ botón de play)
5. Verás un reporte completo con:
   - ✅ Tablas creadas (debe ser 15)
   - ✅ Secuencias creadas (debe ser 11)
   - ✅ Datos cargados en cada tabla
   - ✅ Relaciones (Foreign Keys)
   - ✅ Índices creados

### **Comando de Validación Manual:**

Si prefieres hacerlo manualmente:

```sql
-- Contar tablas creadas
SELECT COUNT(*) AS total_tablas 
FROM user_tables;
-- Debe retornar: 15

-- Contar secuencias
SELECT COUNT(*) AS total_secuencias 
FROM user_sequences;
-- Debe retornar: 11

-- Ver constraints (foreign keys)
SELECT constraint_name, constraint_type, table_name
FROM user_constraints
WHERE constraint_type IN ('P', 'R')
ORDER BY table_name;
```

---

## 📚 Recursos Adicionales

- [Documentación DBeaver](https://dbeaver.io/docs/)
- [Oracle SQL Reference](https://docs.oracle.com/en/database/oracle/oracle-database/21/sqlrf/)

---

## ✨ Tips Útiles

1. **Autocompletado:** Ctrl+Space para sugerencias
2. **Formato SQL:** Ctrl+Shift+F para formatear
3. **Exportar datos:** Click derecho → Export Data
4. **Ver estructura:** Alt+Click en tabla


---

## 🔗 Documentación Relacionada

<div align="center">

| 📚 Guía | 📝 Descripción |
|:---:|:---:|
| [🏠 README Principal](../README.md) | Inicio y overview del proyecto |
| [🔌 Guía de Endpoints](./GUIA_ENDPOINTS.md) | Referencia de 78 endpoints |
| [🧪 Guía de Testing](./GUIA_TESTING.md) | Pruebas del sistema |
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

### 📘 **¡Administra tu Base de Datos con DBeaver!** 🚀

*Conexión profesional a Oracle Database*

**Desarrollado con 💙 para facilitar la administración de datos**

---

**⭐ ¡Gracias por usar esta documentación! ⭐**

</div>
