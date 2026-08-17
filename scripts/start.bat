@echo off
title ShopBot V3 Launcher
color 0B
echo ==========================================
echo       INICIANDO SHOPBOT V3 (MVC + React)
echo ==========================================
echo.

:: Ir al directorio padre (raiz del proyecto)
cd /d "%~dp0\.."

echo [1/3] Verificando dependencias del Backend...
call npm install

echo.
echo [2/3] Verificando dependencias del Frontend...
cd cliente
call npm install
cd ..

echo.
echo [3/3] Arrancando servidores en paralelo...
echo (Ambos se ejecutaran en esta misma terminal gracias a Concurrently)
echo.

call npm run dev:all

pause
