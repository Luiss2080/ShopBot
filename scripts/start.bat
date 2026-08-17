@echo off
title ShopBot V3 Launcher
color 0B
echo ==========================================
echo       INICIANDO SHOPBOT V3 (MVC + React)
echo ==========================================
echo.

:: Ir al directorio padre (raiz del proyecto, asumiendo que este script esta en /scripts)
cd /d "%~dp0\.."

echo [1/3] Verificando e instalando dependencias del Backend...
call npm install

echo.
echo [2/3] Verificando e instalando dependencias del Frontend...
cd cliente
call npm install
cd ..

echo.
echo [3/3] Arrancando servidores en paralelo...
echo.

:: Arrancar el backend (Node/Express)
start "ShopBot - Backend (API)" cmd /k "echo Iniciando servidor Backend... && npm run dev"

:: Arrancar el frontend (Vite/React)
start "ShopBot - Frontend (React)" cmd /k "cd cliente && echo Iniciando servidor Frontend... && npm run dev"

echo ==========================================
echo ¡Todo listo! 
echo Se abrieron dos nuevas ventanas para los servidores.
echo Tu aplicacion frontend estara disponible en http://localhost:5173
echo ==========================================
echo.
pause
