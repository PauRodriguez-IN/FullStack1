#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Iniciando servidor de desarrollo...\n');

// Función para ejecutar comandos
function runCommand(command, args, cwd, name) {
  return new Promise((resolve, reject) => {
    console.log(`📦 Iniciando ${name}...`);
    
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${name} terminó con código ${code}`));
      }
    });

    child.on('error', (error) => {
      reject(new Error(`Error ejecutando ${name}: ${error.message}`));
    });
  });
}

// Verificar si las dependencias están instaladas
async function checkDependencies() {
  const fs = require('fs');
  
  if (!fs.existsSync('node_modules')) {
    console.log('📦 Instalando dependencias del frontend...');
    await runCommand('npm', ['install'], process.cwd(), 'Frontend');
  }
  
  if (!fs.existsSync('server/node_modules')) {
    console.log('📦 Instalando dependencias del backend...');
    await runCommand('npm', ['install'], path.join(process.cwd(), 'server'), 'Backend');
  }
}

// Función principal
async function main() {
  try {
    await checkDependencies();
    
    console.log('\n✅ Dependencias instaladas correctamente');
    console.log('\n🔧 Para configurar el proyecto:');
    console.log('1. Crea un archivo .env en la carpeta server/');
    console.log('2. Configura las variables de entorno según el README.md');
    console.log('3. Configura MongoDB Atlas y Gmail');
    console.log('\n📝 Ejecuta los siguientes comandos en terminales separadas:');
    console.log('Terminal 1: cd server && npm run dev');
    console.log('Terminal 2: npm run dev');
    console.log('\n🌐 La aplicación estará disponible en:');
    console.log('- Frontend: http://localhost:5173');
    console.log('- Backend: http://localhost:5000');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
