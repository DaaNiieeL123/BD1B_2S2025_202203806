#!/bin/bash

# ============================================
# Script de Migración a Nuevo Schema
# ============================================

# Obtener el directorio del script y cambiar al directorio raíz del proyecto
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Cambiar al directorio del proyecto
cd "$PROJECT_DIR" || exit 1

echo "🔄 MIGRACIÓN A NUEVO SCHEMA: EVALUACION_MANEJO"
echo "=============================================="
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo "Este script realizará las siguientes acciones:"
echo ""
echo "1. Crear usuario/schema EVALUACION_MANEJO"
echo "2. Recrear todas las tablas en el nuevo schema"
echo "3. Actualizar configuración de la API"
echo ""
echo -e "${YELLOW}⚠️  ADVERTENCIA: Esto eliminará todos los datos existentes${NC}"
echo ""
read -p "¿Deseas continuar? (s/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Ss]$ ]]; then
    echo "Operación cancelada"
    exit 1
fi

echo ""
echo "📝 Paso 1: Crear usuario/schema..."
docker exec -i oracle-evaluacion-manejo sqlplus -S system/OraclePassword123@XEPDB1 < database/create_schema.sql

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Usuario/schema creado${NC}"
else
    echo -e "${RED}❌ Error al crear usuario${NC}"
    exit 1
fi

echo ""
echo "📝 Paso 2: Crear tablas en nuevo schema..."
docker exec -i oracle-evaluacion-manejo sqlplus -S evaluacion_manejo/EvaluacionPass123@XEPDB1 < database/init.sql

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Tablas creadas en EVALUACION_MANEJO${NC}"
else
    echo -e "${RED}❌ Error al crear tablas${NC}"
    exit 1
fi

echo ""
echo "📝 Paso 3: Reiniciar API con nuevas credenciales..."
docker-compose restart api

sleep 5

if curl -s http://localhost:3000/health > /dev/null; then
    echo -e "${GREEN}✅ API funcionando con nuevo schema${NC}"
else
    echo -e "${YELLOW}⚠️  API aún no responde, espera unos segundos${NC}"
fi

echo ""
echo "=============================================="
echo -e "${GREEN}✅ Migración completada exitosamente${NC}"
echo "=============================================="
echo ""
echo "📊 Verificación:"
echo ""

# Contar tablas
TABLE_COUNT=$(docker exec oracle-evaluacion-manejo sqlplus -S evaluacion_manejo/EvaluacionPass123@XEPDB1 <<EOF
SET PAGESIZE 0 FEEDBACK OFF VERIFY OFF HEADING OFF ECHO OFF
SELECT COUNT(*) FROM user_tables;
EXIT;
EOF
)

TABLE_COUNT=$(echo "$TABLE_COUNT" | tr -d '[:space:]' | grep -o '[0-9]*')

echo "  🗄️  Tablas en EVALUACION_MANEJO: $TABLE_COUNT/15"
echo ""
echo "🔧 Credenciales para DBeaver:"
echo ""
echo "  Host:     localhost"
echo "  Puerto:   1521"
echo "  Service:  XEPDB1"
echo "  Usuario:  evaluacion_manejo"
echo "  Password: EvaluacionPass123"
echo ""
echo "💡 Ahora podrás ver el schema EVALUACION_MANEJO en DBeaver"
echo "   con todas las 15 tablas claramente visibles"
echo ""

