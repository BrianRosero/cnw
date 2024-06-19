# deploy_dev.ps1

# Detener servicios o aplicaciones actuales si es necesario
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
Stop-Process -Name "npm" -Force -ErrorAction SilentlyContinue

# Cambiar al directorio del proyecto
cd D:\Desarrollo\cnw

# Clonar o actualizar el repositorio
if (Test-Path -Path "cd D:\Desarrollo\cnw") {
    cd D:\Desarrollo\cnw
    git pull origin dev
} else {
    git clone https://github.com/BrianRosero/cnw cd D:\Desarrollo\cnw
    cd cd D:\Desarrollo\cnw
}

# Desplegar el backend
cd backend
npm install
Start-Process -NoNewWindow -FilePath "node" -ArgumentList "server.js"

# Desplegar el frontend
cd ..\frontend
npm install
npm run build

# Copiar archivos estáticos a la ruta de Nginx
Copy-Item -Path "dist\*" -Destination "C:\inetpub\wwwroot\cnw" -Recurse -Force

# Reiniciar Nginx
iisreset /restart
