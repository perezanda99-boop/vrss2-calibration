# 🗑️ Configuración del Servidor de Eliminación de Cloudinary

Este servidor backend permite eliminar imágenes de Cloudinary de forma segura.

## 📋 Requisitos Previos

1. **Node.js instalado** (versión 14 o superior)
   - Descarga desde: https://nodejs.org/

## 🚀 Instalación

### Paso 1: Abrir terminal en la carpeta vrss2-deploy

```bash
cd "C:\Users\Angel Perez\Desktop\GPS HTML\vrss2-deploy"
```

### Paso 2: Instalar dependencias

```bash
npm install
```

### Paso 3: Configurar API Secret

1. Ve a tu dashboard de Cloudinary: https://console.cloudinary.com/
2. Copia tu **API Secret**
3. Abre el archivo `delete-cloudinary-server.js`
4. Reemplaza `'TU_API_SECRET_AQUI'` con tu API Secret real:

```javascript
cloudinary.config({
    cloud_name: 'dg4b24dgj',
    api_key: '742723723254997',
    api_secret: 'TU_API_SECRET_REAL_AQUI' // ⚠️ Pega aquí tu API Secret
});
```

### Paso 4: Iniciar el servidor

```bash
npm start
```

Deberías ver:
```
🚀 Cloudinary deletion server running on http://localhost:3000
📝 Endpoint: POST http://localhost:3000/api/delete-cloudinary-image
```

## ✅ Verificar que funciona

1. Mantén el servidor corriendo en una terminal
2. Abre tu aplicación web en el navegador
3. Intenta borrar un evento con imágenes
4. En la consola del servidor verás: `🗑️ Deleting image from Cloudinary: ...`

## 🔧 Comandos Útiles

- **Iniciar servidor**: `npm start`
- **Detener servidor**: `Ctrl + C` en la terminal
- **Modo desarrollo** (reinicia automáticamente): `npm run dev`

## ⚠️ Importante

- **NO compartas tu API Secret** con nadie
- **NO subas el archivo** con el API Secret a GitHub
- Mantén el servidor corriendo mientras uses la aplicación

## 🐛 Solución de Problemas

### Error: "Cannot find module 'express'"
```bash
npm install
```

### Error: "Port 3000 already in use"
Cambia el puerto en `delete-cloudinary-server.js`:
```javascript
const PORT = 3001; // Cambia a otro puerto
```

### Las imágenes no se eliminan
1. Verifica que el servidor esté corriendo
2. Revisa la consola del navegador (F12) para ver errores
3. Verifica que el API Secret sea correcto
