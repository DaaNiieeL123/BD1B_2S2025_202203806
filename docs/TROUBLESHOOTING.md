# 🔧 TROUBLESHOOTING: ¡Soluciona Cualquier Problema! 🚀

---

## ✨ ¿Qué encontrarás en esta guía?

<div align="center">
  
  > **"Guía completa de solución de problemas comunes del Sistema de Evaluación de Manejo con diagnósticos, causas y soluciones paso a paso"**
  
  🎯 **¡Resuelve errores rápidamente y mantén el sistema funcionando!** 🎯
  
</div>

<div align="center">

### 🛠️ Categorías de Problemas

| Categoría | Problemas Cubiertos | Soluciones |
|:---:|:---:|:---:|
| 🐳 **Docker** | Contenedores, puertos, volúmenes | 8 soluciones |
| 🗄️ **Oracle Database** | Conexión, tablas, usuarios | 6 soluciones |
| 🚀 **API REST** | Puerto, errores 500, logs | 5 soluciones |
| 🔌 **DBeaver** | Conexión, drivers, credenciales | 4 soluciones |
| 📊 **Datos** | Queries vacías, inserts fallidos | 3 soluciones |

</div>

---

## 📋 Índice de Problemas

<div align="center">

| # | Problema | Gravedad |
|:---:|:---|:---:|
| 1 | [Oracle no inicia / Se reinicia](#1-oracle-no-inicia--contenedor-se-reinicia-constantemente) | 🔴 Alta |
| 2 | [API no conecta a Oracle](#2-api-no-puede-conectar-a-oracle) | 🔴 Alta |
| 3 | [Error al ejecutar queries](#3-error-al-ejecutar-queries) | 🟠 Media |
| 4 | [Puerto 3000 ocupado](#4-puerto-3000-ya-está-en-uso) | 🟠 Media |
| 5 | [DBeaver no conecta](#5-dbeaver-no-puede-conectar) | 🟡 Baja |
| 6 | [Postman devuelve 500](#6-postman-devuelve-errores-500) | 🟠 Media |
| 7 | [Consultas SQL vacías](#7-consultas-sql-devuelven-datos-vacíos) | 🟡 Baja |
| 8 | [Docker Compose no encuentra archivo](#8-docker-compose-no-encuentra-archivo) | 🟠 Media |
| 9 | [Cambios no se reflejan](#9-cambios-en-código-no-se-reflejan) | 🟡 Baja |
| 10 | [Error de permisos en Linux](#10-error-de-permisos-en-linux) | 🟡 Baja |

</div>

---

## 🚨 Problemas Comunes y Soluciones

### **1. Oracle no inicia / Contenedor se reinicia constantemente**

#### **Síntomas:**
```bash
docker ps
# oracle-evaluacion-manejo: Restarting
```

#### **Causas posibles:**
- RAM insuficiente (Oracle requiere mínimo 2GB)
- Puerto 1521 ocupado
- Volumen corrupto

#### **Soluciones:**

**A. Verificar recursos:**
```bash
# Ver uso de memoria
docker stats

# Si es poco, aumentar RAM en Docker Desktop
# Settings → Resources → Memory → 8GB mínimo
```

**B. Liberar puerto:**
```bash
# Ver qué usa el puerto 1521
sudo lsof -i :1521
# o
sudo netstat -tulpn | grep 1521

# Detener proceso que use el puerto
```

**C. Resetear volumen:**
```bash
# ⚠️ Esto borrará todos los datos
docker-compose down -v
docker volume prune
docker-compose up -d
```

---

### **2. API no puede conectar a Oracle**

#### **Síntomas:**
```
Error: ORA-12154: TNS:could not resolve the connect identifier
Error: Connection pool failed
```

#### **Soluciones:**

**A. Verificar que Oracle esté listo:**
```bash
# Ver logs de Oracle
docker-compose logs oracle-db

# Buscar: "DATABASE IS READY TO USE!"
```

**B. Esperar más tiempo:**
```bash
# Oracle puede tardar 1-2 minutos en iniciar
# Reiniciar API después de que Oracle esté listo
docker-compose restart api
```

**C. Verificar variables de entorno:**
```bash
# Ver variables del contenedor API
docker exec api-evaluacion-manejo env | grep DB_

# Deben coincidir con Oracle
```

**D. Verificar conectividad:**
```bash
# Desde el contenedor API
docker exec -it api-evaluacion-manejo sh
ping oracle-db
# Debe responder
```

---

### **3. Error al ejecutar queries**

#### **Síntomas:**
```
ORA-00942: table or view does not exist
ORA-02289: sequence does not exist
```

#### **Soluciones:**

**A. Verificar que el DDL se ejecutó:**
```bash
# Conectar a Oracle
docker exec -it oracle-evaluacion-manejo sqlplus system/OraclePassword123@XE

# Listar tablas
SELECT table_name FROM user_tables;

# Debe mostrar 15 tablas
```

**B. Ejecutar DDL manualmente:**
```bash
docker exec -i oracle-evaluacion-manejo sqlplus system/OraclePassword123@XE < database/init.sql
```

**C. Verificar schema:**
```sql
-- En SQLPlus
SHOW USER;
-- Debe ser: USER is "SYSTEM"

-- Ver schema actual
SELECT SYS_CONTEXT('USERENV', 'CURRENT_SCHEMA') FROM DUAL;
```

---

### **4. Puerto 3000 ya está en uso**

#### **Síntomas:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

#### **Soluciones:**

**A. Cambiar puerto en .env:**
```env
API_PORT=3001
```

**B. Liberar puerto 3000:**
```bash
# Linux/Mac
sudo lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

### **5. DBeaver no puede conectar**

#### **Síntomas:**
```
IO Error: The Network Adapter could not establish the connection
```

#### **Soluciones:**

**A. Verificar que Oracle esté corriendo:**
```bash
docker ps | grep oracle
# Debe estar "Up" y "healthy"
```

**B. Verificar configuración en DBeaver:**
```
Host: localhost (NO oracle-db desde fuera de Docker)
Port: 1521
Service name: XE (NO ORCL)
Username: system
Password: OraclePassword123
```

**C. Descargar drivers en DBeaver:**
- Database → Driver Manager → Oracle
- Download/Update drivers

**D. Probar conexión desde terminal:**
```bash
docker exec -it oracle-evaluacion-manejo sqlplus system/OraclePassword123@XE
# Si funciona, el problema es DBeaver
```

---

### **6. Postman devuelve errores 500**

#### **Síntomas:**
```json
{
  "success": false,
  "error": "Error interno del servidor"
}
```

#### **Soluciones:**

**A. Ver logs del API:**
```bash
docker-compose logs -f api

# Revisar el stack trace del error
```

**B. Verificar formato del request:**
```json
// ✅ Correcto
{
  "nombre_centro": "Centro Norte"
}

// ❌ Incorrecto
{
  "nombre": "Centro Norte"  // campo incorrecto
}
```

**C. Verificar Content-Type:**
```
Headers:
Content-Type: application/json
```

---

### **7. Consultas SQL devuelven datos vacíos**

#### **Síntomas:**
```json
{
  "success": true,
  "data": [],
  "count": 0
}
```

#### **Soluciones:**

**A. Verificar que hay datos:**
```sql
-- En SQLPlus o DBeaver
SELECT COUNT(*) FROM centro;
SELECT COUNT(*) FROM pregunta;
SELECT COUNT(*) FROM examen;
```

**B. Cargar datos de prueba:**
```bash
docker exec -i oracle-evaluacion-manejo sqlplus system/OraclePassword123@XE < database/datos_prueba.sql
```

**C. Insertar datos vía API:**
- Usar Postman para hacer POST a las tablas
- Verificar que se crearon con GET

---

### **8. Docker Compose no encuentra archivo**

#### **Síntomas:**
```
ERROR: Couldn't find env file: .env
ERROR: Cannot find file: database/init.sql
```

#### **Soluciones:**

**A. Verificar ruta actual:**
```bash
pwd
# Debe estar en: /ruta/a/BD1B_2S2025_proyecto
```

**B. Crear archivo .env:**
```bash
cp .env.example .env
```

**C. Verificar estructura:**
```bash
ls -la
# Debe mostrar:
# docker-compose.yml
# .env
# database/
# api/
```

---

### **9. Cambios en código no se reflejan**

#### **Síntomas:**
- Edito archivo .js pero no cambia comportamiento

#### **Soluciones:**

**A. Verificar volumen en docker-compose:**
```yaml
volumes:
  - ./api:/usr/src/app  # ✅ Correcto
```

**B. Reiniciar contenedor:**
```bash
docker-compose restart api
```

**C. Verificar nodemon:**
```bash
# Ver logs
docker-compose logs -f api

# Debe mostrar:
# [nodemon] restarting due to changes...
```

---

### **10. Error de permisos en Linux**

#### **Síntomas:**
```
Permission denied: './scripts/start.sh'
```

#### **Soluciones:**

```bash
# Dar permisos de ejecución
chmod +x scripts/start.sh scripts/stop.sh

# Ejecutar
./scripts/start.sh
```

---

## 🔍 Comandos de Diagnóstico

### **Estado General:**
```bash
# Ver todos los contenedores
docker ps -a

# Ver logs de todos los servicios
docker-compose logs

# Ver uso de recursos
docker stats

# Ver redes
docker network ls
```

### **Base de Datos:**
```bash
# Verificar conexión
docker exec -it oracle-evaluacion-manejo sqlplus system/OraclePassword123@XE

# Ver tablas
SELECT table_name FROM user_tables;

# Ver secuencias
SELECT sequence_name, last_number FROM user_sequences;

# Ver constraints
SELECT constraint_name, constraint_type, table_name 
FROM user_constraints 
WHERE constraint_type IN ('P','R');
```

### **API:**
```bash
# Ver variables de entorno
docker exec api-evaluacion-manejo env

# Entrar al contenedor
docker exec -it api-evaluacion-manejo sh

# Ver archivos
ls -la

# Probar conexión a Oracle desde API
ping oracle-db
```

---

## 📞 Obtener Ayuda

### **Logs Completos:**
```bash
# Guardar logs en archivo
docker-compose logs > logs_completos.txt

# Solo errores
docker-compose logs 2> errores.txt
```

### **Información del Sistema:**
```bash
# Versión Docker
docker --version
docker-compose --version

# Sistema operativo
uname -a

# Recursos disponibles
free -h
df -h
```

---

## 🆘 Últimos Recursos

### **Reseteo Completo:**
```bash
# ⚠️ Esto eliminará TODOS los datos

# 1. Detener y eliminar contenedores
docker-compose down -v

# 2. Eliminar imágenes
docker rmi $(docker images -q 'bd1b_2s2025*')

# 3. Limpiar sistema
docker system prune -a

# 4. Iniciar desde cero
docker-compose up -d
```

### **Recrear solo Oracle:**
```bash
# Detener Oracle
docker-compose stop oracle-db

# Eliminar contenedor y volumen
docker-compose rm -v oracle-db

# Volver a crear
docker-compose up -d oracle-db
```

---

**Proyecto:** Fase 2 - Bases de Datos 1  
**Última actualización:** Octubre 2024

¿Problema no resuelto? Revisa:
- Logs completos
- Documentación de Oracle
- GitHub Issues del proyecto

---

## 🔗 Documentación Relacionada

<div align="center">

| 📚 Guía | 📝 Descripción |
|:---:|:---:|
| [🏠 README Principal](../README.md) | Inicio y overview del proyecto |
| [🔌 Guía de Endpoints](./GUIA_ENDPOINTS.md) | Referencia de 78 endpoints |
| [🧪 Guía de Testing](./GUIA_TESTING.md) | Pruebas del sistema |
| [🗄️ Guía DBeaver](./GUIA_DBEAVER.md) | Conexión a base de datos |
| [🏗️ Arquitectura](./ARQUITECTURA.md) | Diseño del sistema |

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

### 🔧 **¡Resuelve Cualquier Problema Rápidamente!** 🚀

*Guía completa de troubleshooting*

**Desarrollado con 💙 para mantener el sistema funcionando correctamente**

---

**⭐ ¡Gracias por usar esta documentación! ⭐**

</div>
