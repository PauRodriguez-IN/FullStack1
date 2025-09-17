# Sistema de Autenticación Full Stack

Una aplicación completa de autenticación con React, Express.js y MongoDB Atlas que incluye registro, login y restablecimiento de contraseña.

## 🚀 Características

- **Registro de usuarios** con email, nombre de usuario y contraseña
- **Login** con email o nombre de usuario
- **Restablecimiento de contraseña** por email
- **Dashboard** personalizado para usuarios autenticados
- **Validación** completa de formularios
- **Diseño responsive** y moderno
- **Seguridad** con JWT y bcrypt

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- MongoDB Atlas (cuenta gratuita)
- Gmail (para envío de emails)

## 🛠️ Instalación

### 1. Clonar el repositorio
```bash
git clone <tu-repositorio>
cd FullStack
```

### 2. Instalar dependencias del frontend
```bash
npm install
```

### 3. Instalar dependencias del backend
```bash
cd server
npm install
```

### 4. Configurar variables de entorno

Crea un archivo `.env` en la carpeta `server` con el siguiente contenido:

```env
PORT=5000
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/auth_db?retryWrites=true&w=majority
JWT_SECRET=tu_jwt_secret_muy_seguro_aqui_123456789
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_password_de_aplicacion
FRONTEND_URL=http://localhost:5173
```

### 5. Configurar MongoDB Atlas

1. Ve a [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crea una cuenta gratuita
3. Crea un nuevo cluster
4. Crea un usuario de base de datos
5. Obtén la cadena de conexión y actualiza `MONGODB_URI`

### 6. Configurar Gmail para emails

1. Ve a tu cuenta de Google
2. Activa la verificación en 2 pasos
3. Genera una contraseña de aplicación
4. Usa esa contraseña en `EMAIL_PASS`

## 🚀 Ejecución

### Desarrollo

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Producción

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
npm run build
npm run preview
```

## 📱 Uso

1. **Registro**: Ve a `/register` y crea una nueva cuenta
2. **Login**: Ve a `/login` e inicia sesión con email/usuario y contraseña
3. **Dashboard**: Accede a tu panel personal después del login
4. **Reset Password**: Usa `/forgot-password` si olvidaste tu contraseña

## 🗂️ Estructura del Proyecto

```
FullStack/
├── src/                    # Frontend React
│   ├── components/         # Componentes de UI
│   ├── contexts/          # Contexto de autenticación
│   └── App.jsx            # Componente principal
├── server/                # Backend Express
│   ├── src/
│   │   ├── controllers/   # Controladores de rutas
│   │   ├── models/        # Modelos de MongoDB
│   │   ├── routes/        # Definición de rutas
│   │   ├── middleware/    # Middleware personalizado
│   │   └── config/        # Configuración de DB
│   └── package.json
└── package.json           # Dependencias del frontend
```

## 🔧 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `POST /api/auth/forgot-password` - Solicitar reset de contraseña
- `POST /api/auth/reset-password/:token` - Restablecer contraseña
- `GET /api/auth/profile` - Obtener perfil (protegido)

### Ejemplo de uso:

```javascript
// Registro
fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'usuario@email.com',
    nombre_usu: 'mi_usuario',
    password: 'mi_contraseña',
    nombre_completo: 'Mi Nombre'
  })
});

// Login
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    emailOrUsername: 'usuario@email.com',
    password: 'mi_contraseña'
  })
});
```

## 🛡️ Seguridad

- Contraseñas hasheadas con bcrypt
- JWT para autenticación
- Validación de entrada con express-validator
- CORS configurado
- Tokens de reset con expiración

## 🎨 Personalización

Los estilos están en:
- `src/components/Auth.css` - Estilos de autenticación
- `src/components/Dashboard.css` - Estilos del dashboard
- `src/App.css` - Estilos globales

## 🐛 Solución de Problemas

### Error de conexión a MongoDB
- Verifica que la URL de conexión sea correcta
- Asegúrate de que tu IP esté en la whitelist de MongoDB Atlas

### Error de email
- Verifica las credenciales de Gmail
- Asegúrate de tener una contraseña de aplicación

### Error de CORS
- Verifica que `FRONTEND_URL` en el .env sea correcto

## 📝 Notas

- El proyecto usa React 19 con Vite
- Express.js con ES6 modules
- MongoDB con Mongoose
- Estilos CSS modernos sin frameworks adicionales

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.