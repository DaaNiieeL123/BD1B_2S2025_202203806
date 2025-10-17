#!/bin/bash

# ============================================
# Script de Detención
# Sistema de Centros de Evaluación de Manejo
# ============================================

# Obtener el directorio del script y cambiar al directorio raíz del proyecto
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Cambiar al directorio del proyecto
cd "$PROJECT_DIR" || exit 1

echo "🛑 Deteniendo Sistema de Evaluación de Manejo..."
echo ""

docker-compose down

echo ""
echo "✅ Servicios detenidos correctamente"
echo ""
echo "💡 Para borrar también los datos (CUIDADO):"
echo "   docker-compose down -v"
echo ""
