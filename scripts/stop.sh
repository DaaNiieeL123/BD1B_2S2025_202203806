#!/bin/bash

# ============================================
# Script de Detención
# Sistema de Centros de Evaluación de Manejo
# ============================================

echo "🛑 Deteniendo Sistema de Evaluación de Manejo..."
echo ""

docker-compose down

echo ""
echo "✅ Servicios detenidos correctamente"
echo ""
echo "💡 Para borrar también los datos (CUIDADO):"
echo "   docker-compose down -v"
echo ""
