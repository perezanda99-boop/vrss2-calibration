// ============================================
// SERVIDOR PARA ELIMINAR IMÁGENES DE CLOUDINARY
// ============================================
// Este servidor maneja la eliminación de imágenes de Cloudinary
// usando el API Secret que no puede estar en el frontend por seguridad

const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

const app = express();
const PORT = process.env.PORT || 3000; // Usar puerto de Render o 3000 local

// ============================================
// CONFIGURACIÓN DE CLOUDINARY
// ============================================
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dg4b24dgj',
    api_key: process.env.CLOUDINARY_API_KEY || '742723723254997',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'mXBdhInSwWA6iL0ET640VyjWgLA'
});

// Middleware
app.use(cors());
app.use(express.json());

// ============================================
// ENDPOINT PARA ELIMINAR IMAGEN
// ============================================
app.post('/api/delete-cloudinary-image', async (req, res) => {
    try {
        const { publicId } = req.body;
        
        if (!publicId) {
            return res.status(400).json({ 
                success: false, 
                error: 'Public ID is required' 
            });
        }

        console.log(`🗑️ Deleting image from Cloudinary: ${publicId}`);

        // Eliminar la imagen de Cloudinary
        const result = await cloudinary.uploader.destroy(publicId);
        
        console.log('✅ Cloudinary deletion result:', result);

        if (result.result === 'ok' || result.result === 'not found') {
            return res.json({ 
                success: true, 
                message: 'Image deleted successfully',
                result: result
            });
        } else {
            return res.status(500).json({ 
                success: false, 
                error: 'Failed to delete image',
                result: result
            });
        }

    } catch (error) {
        console.error('❌ Error deleting image:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// ============================================
// INICIAR SERVIDOR
// ============================================
app.listen(PORT, () => {
    console.log(`🚀 Cloudinary deletion server running on http://localhost:${PORT}`);
    console.log(`📝 Endpoint: POST http://localhost:${PORT}/api/delete-cloudinary-image`);
    console.log(`⚠️  Remember to set your API_SECRET in the configuration!`);
});
