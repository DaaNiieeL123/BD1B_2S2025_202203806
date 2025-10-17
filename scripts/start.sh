#!/bin/bash

# ============================================
# Script de Inicio Rápido
# Sistema de Centros de Evaluación de Manejo
# ============================================

# Obtener el directorio del script y cambiar al directorio raíz del proyecto
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Cambiar al directorio del proyecto
cd "$PROJECT_DIR" || exit 1

echo "🚗 Sistema de Centros de Evaluación de Manejo"
echo "=============================================="
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar si Docker está corriendo
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Error: Docker no está corriendo${NC}"
    echo "Por favor inicia Docker Desktop primero"
    exit 1
fi

echo -e "${GREEN}✅ Docker está corriendo${NC}"
echo ""

# Verificar si existe .env
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  Archivo .env no encontrado${NC}"
    echo "Copiando desde .env.example..."
    cp .env.example .env
    echo -e "${GREEN}✅ Archivo .env creado${NC}"
fi

echo ""
echo "📦 Levantando contenedores..."
echo ""

# Levantar contenedores
docker-compose up -d

echo ""
echo "⏳ Esperando que los servicios estén listos..."
echo "   (Oracle puede tardar 1-2 minutos en iniciar)"
echo ""

# Esperar a que Oracle esté listo
echo "Verificando Oracle Database..."
sleep 10

MAX_TRIES=30
TRIES=0

while [ $TRIES -lt $MAX_TRIES ]; do
    if docker exec oracle-evaluacion-manejo sqlplus -s system/OraclePassword123@XEPDB1 <<< "SELECT 1 FROM DUAL;" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Oracle Database está listo${NC}"
        break
    fi
    TRIES=$((TRIES+1))
    echo "Intento $TRIES/$MAX_TRIES..."
    sleep 5
done

if [ $TRIES -eq $MAX_TRIES ]; then
    echo -e "${RED}❌ Timeout esperando Oracle${NC}"
    echo "Revisa los logs con: docker-compose logs oracle-db"
    exit 1
fi

echo ""
echo "� Creando usuario/schema de la aplicación..."

# Crear usuario evaluacion_manejo si no existe
docker exec -i oracle-evaluacion-manejo sqlplus -S system/OraclePassword123@XEPDB1 < database/create_schema.sql > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Schema EVALUACION_MANEJO configurado${NC}"
else
    echo -e "${YELLOW}⚠️  Schema ya existe o hubo un error (continuando...)${NC}"
fi

echo ""
echo "�🔍 Verificando estructura de base de datos..."

# Verificar si las tablas existen en el schema evaluacion_manejo
TABLE_COUNT=$(docker exec oracle-evaluacion-manejo sqlplus -S evaluacion_manejo/EvaluacionPass123@XEPDB1 <<EOF
SET PAGESIZE 0 FEEDBACK OFF VERIFY OFF HEADING OFF ECHO OFF
SELECT COUNT(*) FROM user_tables;
EXIT;
EOF
)

# Limpiar espacios y caracteres especiales
TABLE_COUNT=$(echo "$TABLE_COUNT" | tr -d '[:space:]' | grep -o '[0-9]*')

if [ -z "$TABLE_COUNT" ]; then
    TABLE_COUNT=0
fi

if [ "$TABLE_COUNT" -lt 15 ]; then
    echo -e "${YELLOW}⚠️  Base de datos vacía o incompleta (tablas: $TABLE_COUNT/15)${NC}"
    echo "Ejecutando script de inicialización..."
    
    docker exec -i oracle-evaluacion-manejo sqlplus -S evaluacion_manejo/EvaluacionPass123@XEPDB1 < database/init.sql > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Tablas creadas exitosamente en schema EVALUACION_MANEJO${NC}"
    else
        echo -e "${RED}❌ Error al crear tablas${NC}"
        echo "Revisa: docker exec -i oracle-evaluacion-manejo sqlplus evaluacion_manejo/EvaluacionPass123@XEPDB1 < database/init.sql"
    fi
else
    echo -e "${GREEN}✅ Base de datos OK (15 tablas encontradas en EVALUACION_MANEJO)${NC}"
fi

echo ""
echo "Verificando API..."
sleep 5

if curl -s http://localhost:3000/health > /dev/null; then
    echo -e "${GREEN}✅ API está funcionando${NC}"
else
    echo -e "${YELLOW}⚠️  API aún no está lista${NC}"
    echo "Puedes verificar con: docker-compose logs api"
fi

echo ""
echo "=============================================="
echo -e "${GREEN}🎉 ¡Sistema iniciado correctamente!${NC}"
echo "=============================================="
echo ""
echo "📌 Servicios disponibles:"
echo ""
echo "  🌐 API REST:        http://localhost:3000"
echo "  💚 Health Check:    http://localhost:3000/health"
echo "  🗄️  Oracle DB:       localhost:1521/XEPDB1"
echo ""
echo "📚 Endpoints principales:"
echo ""
echo "  GET  /api/centros"
echo "  GET  /api/escuelas"
echo "  GET  /api/preguntas"
echo "  GET  /api/consultas/estadisticas-centros"
echo "  GET  /api/consultas/ranking-evaluadores"
echo "  GET  /api/consultas/pregunta-dificil"
echo ""
echo "=============================================="
echo ""
echo "📖 Comandos útiles:"
echo ""
echo "  Ver logs:           docker-compose logs -f"
echo "  Detener servicios:  docker-compose down"
echo "  Reiniciar:          docker-compose restart"
echo ""
echo "💡 Importa la colección de Postman desde:"
echo "   postman/Evaluacion_Manejo.postman_collection.json"
echo ""
echo "💾 Si necesitas datos de prueba, ejecuta:"
echo "   docker exec -i oracle-evaluacion-manejo sqlplus evaluacion_manejo/EvaluacionPass123@XEPDB1 < database/datos_prueba.sql"
echo ""
echo "🔧 Conectar a DBeaver:"
echo "   Usuario: evaluacion_manejo"
echo "   Password: EvaluacionPass123"
echo "   Service: XEPDB1"
echo ""
