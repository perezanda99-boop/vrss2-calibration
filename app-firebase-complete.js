'use strict';

// ============================================
// CONSTANTS & INITIAL DATA
// ============================================
const INITIAL_DATA = [
    '2022-11-19', '2022-11-30', '2022-12-17', '2023-01-01', '2023-02-11', 
    '2023-02-22', '2023-03-03', '2023-03-09', '2023-03-25', '2023-04-05', 
    '2023-04-16', '2023-04-21', '2023-05-13', '2023-05-18', '2023-05-27', 
    '2023-07-23', '2023-07-31', '2023-09-02', '2023-09-24', '2023-10-13', 
    '2023-10-24', '2023-11-09', '2023-11-27', '2023-12-12', '2024-01-24', 
    '2024-02-29', '2024-04-02', '2024-04-24', '2024-07-10', '2024-08-01', 
    '2024-08-12', '2024-08-29', '2024-10-03', '2024-10-20', '2024-11-11', 
    '2024-11-13', '2024-11-28', '2024-12-17', '2024-12-22', '2024-12-31', 
    '2025-01-15', '2025-01-18', '2025-01-24', '2025-02-01', '2025-02-25', 
    '2025-03-06', '2025-03-16', '2025-03-17', '2025-03-19', '2025-03-25', 
    '2025-03-30', '2025-04-03', '2025-04-08', '2025-04-13', '2025-04-21', 
    '2025-04-28', '2025-05-07', '2025-05-16', '2025-05-23', '2025-05-31', 
    '2025-06-02', '2025-06-10', '2025-06-21', '2025-06-23', '2025-07-01', 
    '2025-07-06', '2025-07-14', '2025-07-21', '2025-07-28'
];

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
const MAX_DESCRIPTION_LENGTH = 500;

// ============================================
// CLOUDINARY CONFIGURATION
// ============================================
const CLOUDINARY_CONFIG = {
    cloudName: 'dg4b24dgj',
    apiKey: '742723723254997',
    uploadPreset: 'vrss2_unsigned'  // Crearemos esto después
};

// URL base de Cloudinary
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/auto/upload`;
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}`;

// ============================================
// FIREBASE CONFIGURATION
// ============================================
// IMPORTANTE: Reemplaza estos valores con tu configuración de Firebase
// Instrucciones completas en: FIREBASE-SETUP.md
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDcMjlhYtzfGdHF7W8h9PIekdwfmKIWoT8AQUI",
    authDomain: "vrss2-app.firebaseapp.com",
    projectId: "vrss2-app",
    storageBucket: "vrss2-app.firebasestorage.app",
    messagingSenderId: "8667256349199",
    appId: "1:866725634919:web:5e43cab641af7d3a55c5c2"
};

// ============================================
// TRANSLATIONS
// ============================================
const TRANSLATIONS = {
    en: {
        mainTitle: 'VRSS-2 TIME CALIBRATION REGISTRY',
        mainSubtitle: 'GPS ⟷ OBDH UTC Mode Changes',
        totalEventsLabel: 'Total Events',
        lastEventLabel: 'Last Event',
        avgPerMonthLabel: 'Avg/Month',
        searchPlaceholder: 'Search By Date...',
        allYears: 'All',
        addEventBtn: 'Add New Event',
        galleryTitle: 'Events Gallery',
        uploadTitle: 'Upload Event',
        dateLabel: 'Event Date',
        imageLabel: 'Change Image (Max 2MB)',
        imageReturnLabel: 'Return Graph (Max 2MB)',
        descLabel: 'Description (Optional)',
        cancelBtn: 'Cancel',
        saveBtn: 'Save Event',
        closeBtn: 'Close',
        noEvents: 'No Events Found',
        modeChange: 'TMK061',
        langBtn: '🇪🇸 ES',
        errorDateRequired: 'Please select a date',
        errorDateDuplicate: 'An event already exists for this date',
        errorImageSize: 'Image size must be less than 2MB',
        errorImageType: 'Please select a valid image file',
        successSaved: 'Event saved successfully!',
        editEventBtn: 'Edit',
        deleteEventBtn: 'Delete',
        confirmDelete: 'Are you sure you want to delete this event?',
        successDeleted: 'Event Deleted Successfully!',
        exportBtn: 'Generate Report',
        reportGenerated: 'Report Generated Successfully!',
        advancedSearch: 'Advanced Search',
        dateFrom: 'From Date',
        dateTo: 'To Date',
        applyFilters: 'Apply Filters',
        clearFilters: 'Clear Filters',
        statistics: 'Statistics',
        eventsPerYear: 'Events per Year',
        eventsPerMonth: 'Events per Month',
        monthlyAnalysis: 'Monthly Analysis',
        timelineTab: 'Timeline',
        monthlyTab: 'By Month',
        eventsLabel: 'events',
        updateBtn: 'Update Event',
        editTitle: 'Edit Event',
        infoLabel: 'Information',
        infoTitle: 'System Information',
        editInfoBtn: 'Edit',
        selectFilesText: 'Select Files',
        attachedFiles: 'Attached Files',
        currentFiles: 'Current Attached Files',
        download: 'Download',
        deleteFile: 'Delete',
        saveChanges: 'Save Changes',
        cancel: 'Cancel',
        infoSaved: 'Information Saved Successfully!',
        normalModeLabel: 'Normal Mode',
        normalModeTitle: 'Normal Working Mode Of Time Calibration Indicator',
        noImageUploaded: 'No Image Uploaded Yet. Click Edit To Upload An Image.',
        selectImage: 'Select Image',
        saveImage: 'Save Image',
        normalModeSaved: 'Normal Mode Image Saved Successfully!',
        infoContent: `Since November 24, 2022, it has been observed that the time calibration indicator has frequently changed its operating mode, from GPS Time Calibration to OBDH UTC Time Calibration.

GPS provides an accurate time reference, but it is not always available. In those cases, the satellite switches to OBDH UTC Time Calibration, which is also a time reference, provided by OBDH, acting as a time redundancy if GPS fails or experiences an interruption.

Since GPS Time Calibration is less prone to synchronization errors, it is more optimal than OBDH UTC Time Calibration, so with each automatic change to OBDH UTC Time Calibration, it is manually restored to GPS Time Calibration.

There are situations in which the satellite could switch between GPS and OBDH frequently, as is the case when GPS experiences frequent interruptions or when the satellite's orbit takes it to areas with low visibility of GPS satellites.

In any case, the mode change between GPS Time Calibration and OBDH UTC Time Calibration does not affect the satellite's operation, since both systems can provide an appropriate time reference.

In Figure 1, the time calibration indicator can be seen in the recommended operating mode, while from Figure 2 to Figure 72, the change to OBDH UTC Time Calibration can be seen. These figures correspond to the change that occurred on the dates indicated in each of them.`
    },
    es: {
        mainTitle: 'REGISTRO DE CALIBRACIÓN DE TIEMPO VRSS-2',
        mainSubtitle: 'Cambios De Modo GPS ⟷ OBDH UTC',
        totalEventsLabel: 'Eventos Totales',
        lastEventLabel: 'Último Evento',
        avgPerMonthLabel: 'Prom/Mes',
        searchPlaceholder: 'Buscar Por Fecha...',
        allYears: 'Todos',
        addEventBtn: 'Agregar Nuevo Evento',
        galleryTitle: 'Galería De Eventos',
        uploadTitle: 'Subir Evento',
        dateLabel: 'Fecha Del Evento',
        imageLabel: 'Imagen De Cambio (Máx 2MB)',
        imageReturnLabel: 'Gráfica De Devolución (Máx 2MB)',
        descLabel: 'Descripción (Opcional)',
        cancelBtn: 'Cancelar',
        saveBtn: 'Guardar Evento',
        closeBtn: 'Cerrar',
        noEvents: 'No Se Encontraron Eventos',
        modeChange: 'TMK061',
        langBtn: '🇬🇧 EN',
        errorDateRequired: 'Por favor selecciona una fecha',
        errorDateDuplicate: 'Ya existe un evento para esta fecha',
        errorImageSize: 'El tamaño de la imagen debe ser menor a 2MB',
        errorImageType: 'Por favor selecciona un archivo de imagen válido',
        successSaved: '¡Evento guardado exitosamente!',
        editEventBtn: 'Editar',
        deleteEventBtn: 'Eliminar',
        confirmDelete: '¿Estás seguro de que quieres eliminar este evento?',
        successDeleted: '¡Evento Eliminado Exitosamente!',
        exportBtn: 'Generar Informe',
        reportGenerated: '¡Informe Generado Exitosamente!',
        advancedSearch: 'Búsqueda Avanzada',
        dateFrom: 'Desde Fecha',
        dateTo: 'Hasta Fecha',
        applyFilters: 'Aplicar Filtros',
        clearFilters: 'Limpiar Filtros',
        statistics: 'Estadísticas',
        eventsPerYear: 'Eventos por Año',
        eventsPerMonth: 'Eventos por Mes',
        monthlyAnalysis: 'Análisis Mensual',
        timelineTab: 'Línea de Tiempo',
        monthlyTab: 'Por Mes',
        eventsLabel: 'eventos',
        updateBtn: 'Actualizar Evento',
        editTitle: 'Editar Evento',
        infoLabel: 'Información',
        infoTitle: 'Información Del Sistema',
        editInfoBtn: 'Editar',
        selectFilesText: 'Seleccionar Archivos',
        attachedFiles: 'Archivos Adjuntos',
        currentFiles: 'Archivos Adjuntos Actuales',
        download: 'Descargar',
        deleteFile: 'Eliminar',
        saveChanges: 'Guardar Cambios',
        cancel: 'Cancelar',
        infoSaved: '¡Información Guardada Exitosamente!',
        normalModeLabel: 'Modo Normal De Trabajo',
        normalModeTitle: 'Modo Normal De Trabajo Del Indicador De Calibración De Tiempo',
        noImageUploaded: 'No Se Ha Subido Ninguna Imagen. Haz Clic En Editar Para Subir Una Imagen.',
        selectImage: 'Seleccionar Imagen',
        saveImage: 'Guardar Imagen',
        normalModeSaved: '¡Imagen Del Modo Normal Guardada Exitosamente!',
        infoContent: `Desde el 24 de noviembre de 2022, se ha observado que el indicador de calibración de tiempo ha cambiado de manera frecuente su modo de trabajo, desde GPS Time Calibration a OBDH UTC Time Calibration.

El GPS proporciona una referencia precisa de tiempo, pero no siempre está disponible. En esos casos, el satélite cambia a OBDH UTC Time Calibration, que también es una referencia de tiempo, proporcionada por OBDH, actuando como redundancia de tiempo si el GPS falla o experimenta una interrupción.

Por ser el GPS Time Calibration menos propenso a errores de sincronización, este es más óptimo sobre OBDH UTC Time Calibration, por lo que en cada cambio automático a OBDH UTC Time Calibration se restaura de manera manual a GPS Time Calibration.

Existen situaciones en las que el satélite podría cambiar entre el GPS y el OBDH de manera frecuente, como se da el caso cuando el GPS experimenta interrupciones frecuentes o cuando la órbita del satélite lo lleva a áreas con una baja visibilidad de los satélites GPS.

En cualquier caso, el cambio de modo entre GPS Time Calibration y OBDH UTC Time Calibration no afecta el funcionamiento del satélite, ya que ambos sistemas pueden proporcionar una referencia de tiempo apropiada.

En la Figura 1 se puede apreciar el indicador de calibración de tiempo en el modo de trabajo recomendable, mientras que desde la Figura 2 a la Figura 72 se aprecia el cambio a OBDH UTC Time Calibration. Estas figuras corresponden al cambio ocurrido en las fechas indicadas en cada una de ellas.`
    }
};

// ============================================
// FIREBASE DATABASE MANAGER
// ============================================
class DatabaseManager {
    constructor() {
        this.db = null;
        this.initialized = false;
    }

    async init() {
        try {
            // Inicializar Firebase
            if (!firebase.apps.length) {
                firebase.initializeApp(FIREBASE_CONFIG);
                console.log('🔥 Firebase app initialized');
            }
            
            // Obtener referencia a Firestore
            this.db = firebase.firestore();
            
            // Habilitar persistencia offline para que funcione sin internet
            try {
                await this.db.enablePersistence();
                console.log('✅ Firebase offline persistence enabled');
            } catch (err) {
                if (err.code === 'failed-precondition') {
                    console.warn('⚠️ Multiple tabs open, persistence only in one tab');
                } else if (err.code === 'unimplemented') {
                    console.warn('⚠️ Browser doesn\'t support persistence');
                }
            }
            
            this.initialized = true;
            console.log('✅ Firebase Database initialized successfully');
        } catch (error) {
            console.error('❌ Firebase initialization error:', error);
            console.error('📝 Please check your Firebase configuration in FIREBASE_CONFIG');
            throw error;
        }
    }

    async saveEvent(event) {
        if (!this.initialized) {
            throw new Error('Firebase not initialized');
        }
        
        try {
            // Guardar en Firestore usando la fecha como ID del documento
            await this.db.collection('events').doc(event.date).set(event);
            console.log(`✅ Event saved to Firebase: ${event.date}`);
        } catch (error) {
            console.error('❌ Error saving event to Firebase:', error);
            throw error;
        }
    }

    async getEvent(date) {
        if (!this.initialized) {
            throw new Error('Firebase not initialized');
        }
        
        try {
            const doc = await this.db.collection('events').doc(date).get();
            return doc.exists ? doc.data() : null;
        } catch (error) {
            console.error('❌ Error getting event from Firebase:', error);
            throw error;
        }
    }

    async getAllEvents() {
        if (!this.initialized) {
            throw new Error('Firebase not initialized');
        }
        
        try {
            const snapshot = await this.db.collection('events').get();
            const events = [];
            snapshot.forEach(doc => {
                events.push(doc.data());
            });
            console.log(`✅ Loaded ${events.length} events from Firebase`);
            return events;
        } catch (error) {
            console.error('❌ Error getting all events from Firebase:', error);
            throw error;
        }
    }

    async deleteEvent(date) {
        if (!this.initialized) {
            throw new Error('Firebase not initialized');
        }
        
        try {
            await this.db.collection('events').doc(date).delete();
            console.log(`✅ Event deleted from Firebase: ${date}`);
        } catch (error) {
            console.error('❌ Error deleting event from Firebase:', error);
            throw error;
        }
    }

    // BONUS: Escuchar cambios en tiempo real (sincronización automática)
    onEventsChange(callback) {
        if (!this.initialized) {
            throw new Error('Firebase not initialized');
        }
        
        return this.db.collection('events').onSnapshot(snapshot => {
            const events = [];
            snapshot.forEach(doc => {
                events.push(doc.data());
            });
            console.log('🔄 Real-time update: events changed');
            callback(events);
        }, error => {
            console.error('❌ Error in real-time listener:', error);
        });
    }

    // Guardar configuración del sistema (Modo Normal, Info, etc.)
    async saveSystemConfig(config) {
        if (!this.initialized) {
            throw new Error('Firebase not initialized');
        }
        
        try {
            await this.db.collection('system').doc('config').set(config, { merge: true });
            console.log('✅ System config saved to Firebase');
        } catch (error) {
            console.error('❌ Error saving system config:', error);
            throw error;
        }
    }

    // Obtener configuración del sistema
    async getSystemConfig() {
        if (!this.initialized) {
            throw new Error('Firebase not initialized');
        }
        
        try {
            const doc = await this.db.collection('system').doc('config').get();
            if (doc.exists) {
                console.log('✅ System config loaded from Firebase');
                return doc.data();
            }
            return null;
        } catch (error) {
            console.error('❌ Error getting system config:', error);
            throw error;
        }
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
const Utils = {
    // Sanitize HTML to prevent XSS
    sanitizeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    // Format date for display
    formatDate(dateStr) {
        const date = new Date(dateStr + 'T00:00:00');
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    },

    // Validate date format
    isValidDate(dateStr) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(dateStr)) return false;
        const date = new Date(dateStr);
        return date instanceof Date && !isNaN(date);
    },

    // Compress image if needed
    async compressImage(file, maxSize) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;

                    // Calculate new dimensions if image is too large
                    const maxDimension = 1920;
                    if (width > maxDimension || height > maxDimension) {
                        if (width > height) {
                            height = (height / width) * maxDimension;
                            width = maxDimension;
                        } else {
                            width = (width / height) * maxDimension;
                            height = maxDimension;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    // Try different quality levels
                    let quality = 0.9;
                    let dataUrl = canvas.toDataURL('image/jpeg', quality);

                    // Reduce quality if still too large
                    while (dataUrl.length > maxSize && quality > 0.1) {
                        quality -= 0.1;
                        dataUrl = canvas.toDataURL('image/jpeg', quality);
                    }

                    resolve(dataUrl);
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },

    // Upload image to Cloudinary
    async uploadToCloudinary(file, folder = 'events') {
        try {
            console.log(`📤 Uploading to Cloudinary: ${file.name}`);
            
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
            formData.append('folder', `vrss2/${folder}`);
            formData.append('api_key', CLOUDINARY_CONFIG.apiKey);
            
            const response = await fetch(CLOUDINARY_URL, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`Cloudinary upload failed: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log(`✅ Uploaded to Cloudinary: ${data.secure_url}`);
            
            return data.secure_url;
        } catch (error) {
            console.error('❌ Error uploading to Cloudinary:', error);
            throw error;
        }
    }
};

// ============================================
// MAIN APPLICATION CLASS
// ============================================
class VRSS2App {
    constructor() {
        this.language = localStorage.getItem('language') || 'en';
        this.events = [];
        this.currentImagePreview = null;
        this.customInfo = null;
        this.attachedFiles = [];
        this.pendingFiles = [];
        this.normalModeImage = null;
        this.pendingNormalModeImage = null;
        this.pendingNormalModeFile = null;
        this.dbManager = new DatabaseManager();
    }

    async init() {
        try {
            await this.dbManager.init();
            await this.loadEvents();
            await this.loadSystemConfig();
            this.setupRealtimeSync();
            this.updateLanguage();
            this.bindEvents();
            this.renderGallery();
            this.updateStats();
            this.populateYearFilter();
        } catch (error) {
            console.error('Initialization error:', error);
            this.showError('Failed to initialize application. Please refresh the page.');
        }
    }

    // ============================================
    // EVENT BINDING
    // ============================================
    bindEvents() {
        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                // Limpiar la sesión
                sessionStorage.removeItem('authenticated');
                // Redirigir a la página de inicio de sesión
                window.location.href = 'index.html';
            });
        }
        
        // Refresh button
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.refreshData();
        });

        // Language toggle
        document.getElementById('langToggle').addEventListener('click', () => {
            this.toggleLanguage();
        });

        // Modal controls
        document.getElementById('addEventBtn').addEventListener('click', () => {
            this.openUploadModal();
        });

        document.getElementById('closeUpload').addEventListener('click', () => {
            this.closeUploadModal();
        });

        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.closeUploadModal();
        });

        document.getElementById('saveBtn').addEventListener('click', () => {
            this.saveEvent();
        });

        document.getElementById('closeImage').addEventListener('click', () => {
            this.closeImageModal();
        });

        // Search and filter
        document.getElementById('searchInput').addEventListener('input', () => {
            this.renderGallery();
        });

        document.getElementById('yearFilter').addEventListener('change', () => {
            this.renderGallery();
        });

        // Image previews
        document.getElementById('eventImage').addEventListener('change', (e) => {
            this.handleImagePreview(e, 'imagePreview', 'currentImagePreview');
        });

        const eventImageReturn = document.getElementById('eventImageReturn');
        if (eventImageReturn) {
            eventImageReturn.addEventListener('change', (e) => {
                this.handleImagePreview(e, 'imageReturnPreview', 'currentReturnImagePreview');
            });
        }

        // Close modals on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeUploadModal();
                this.closeImageModal();
            }
        });

        // Close modals on background click
        document.getElementById('uploadModal').addEventListener('click', (e) => {
            if (e.target.id === 'uploadModal') {
                this.closeUploadModal();
            }
        });

        document.getElementById('imageModal').addEventListener('click', (e) => {
            if (e.target.id === 'imageModal') {
                this.closeImageModal();
            }
        });

        // Generate Report button
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.generateReport();
            });
        }

        // Advanced search
        const applyFiltersBtn = document.getElementById('applyFilters');
        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', () => {
                this.applyAdvancedFilters();
            });
        }

        const clearFiltersBtn = document.getElementById('clearFilters');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                this.clearAdvancedFilters();
            });
        }

        // Statistics button
        const statsBtn = document.getElementById('statsBtn');
        if (statsBtn) {
            statsBtn.addEventListener('click', () => {
                this.showStatistics();
            });
        }

        // Close stats modal
        const closeStats = document.getElementById('closeStats');
        if (closeStats) {
            closeStats.addEventListener('click', () => {
                document.getElementById('statsModal').classList.remove('active');
            });
        }

        const statsModal = document.getElementById('statsModal');
        if (statsModal) {
            statsModal.addEventListener('click', (e) => {
                if (e.target.id === 'statsModal') {
                    statsModal.classList.remove('active');
                }
            });
        }

        
        // Monthly charts modal
        const closeMonthlyCharts = document.getElementById('closeMonthlyCharts');
        if (closeMonthlyCharts) {
            closeMonthlyCharts.addEventListener('click', () => {
                document.getElementById('monthlyChartsModal').classList.remove('active');
            });
        }
        
        const monthlyChartsModal = document.getElementById('monthlyChartsModal');
        if (monthlyChartsModal) {
            monthlyChartsModal.addEventListener('click', (e) => {
                if (e.target.id === 'monthlyChartsModal') {
                    monthlyChartsModal.classList.remove('active');
                }
            });
        }
        
        // Chart tabs
        const chartTabs = document.querySelectorAll('.chart-tab');
        chartTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                
                // Update active tab
                chartTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Update active view
                document.querySelectorAll('.chart-view').forEach(v => v.classList.remove('active'));
                document.getElementById(targetTab + 'View').classList.add('active');
            });
        });
        
        // Information modal
        const infoCard = document.getElementById('infoCard');
        if (infoCard) {
            infoCard.addEventListener('click', () => {
                this.showInformation();
            });
        }
        
        const closeInfo = document.getElementById('closeInfo');
        if (closeInfo) {
            closeInfo.addEventListener('click', () => {
                document.getElementById('infoModal').classList.remove('active');
            });
        }
        
        const infoModal = document.getElementById('infoModal');
        if (infoModal) {
            infoModal.addEventListener('click', (e) => {
                if (e.target.id === 'infoModal') {
                    infoModal.classList.remove('active');
                }
            });
        }
        
        // Edit information button
        const editInfoBtn = document.getElementById('editInfoBtn');
        if (editInfoBtn) {
            editInfoBtn.addEventListener('click', () => {
                this.enterEditMode();
            });
        }
        
        // Cancel edit
        const cancelEditInfo = document.getElementById('cancelEditInfo');
        if (cancelEditInfo) {
            cancelEditInfo.addEventListener('click', () => {
                this.exitEditMode();
            });
        }
        
        // Save edit
        const saveEditInfo = document.getElementById('saveEditInfo');
        if (saveEditInfo) {
            saveEditInfo.addEventListener('click', () => {
                this.saveInformation();
            });
        }
        
        // Attach files
        const attachFileInput = document.getElementById('attachFileInput');
        if (attachFileInput) {
            attachFileInput.addEventListener('change', (e) => {
                this.handleFileSelection(e);
            });
        }
        
        // Normal Mode modal
        const normalModeCard = document.getElementById('normalModeCard');
        if (normalModeCard) {
            normalModeCard.addEventListener('click', () => {
                this.showNormalMode();
            });
        }
        
        const closeNormalMode = document.getElementById('closeNormalMode');
        if (closeNormalMode) {
            closeNormalMode.addEventListener('click', () => {
                document.getElementById('normalModeModal').classList.remove('active');
            });
        }
        
        const normalModeModal = document.getElementById('normalModeModal');
        if (normalModeModal) {
            normalModeModal.addEventListener('click', (e) => {
                if (e.target.id === 'normalModeModal') {
                    normalModeModal.classList.remove('active');
                }
            });
        }
        
        const editNormalModeBtn = document.getElementById('editNormalModeBtn');
        if (editNormalModeBtn) {
            editNormalModeBtn.addEventListener('click', () => {
                this.enterNormalModeEdit();
            });
        }
        
        const cancelNormalMode = document.getElementById('cancelNormalMode');
        if (cancelNormalMode) {
            cancelNormalMode.addEventListener('click', () => {
                this.exitNormalModeEdit();
            });
        }
        
        const saveNormalMode = document.getElementById('saveNormalMode');
        if (saveNormalMode) {
            saveNormalMode.addEventListener('click', () => {
                this.saveNormalModeImage();
            });
        }
        
        const normalModeImageInput = document.getElementById('normalModeImageInput');
        if (normalModeImageInput) {
            normalModeImageInput.addEventListener('change', (e) => {
                this.handleNormalModeImageSelection(e);
            });
        }
        
        const deleteNormalModeBtn = document.getElementById('deleteNormalModeBtn');
        if (deleteNormalModeBtn) {
            deleteNormalModeBtn.addEventListener('click', () => {
                this.deleteNormalModeImage();
            });
        }
    }

    // ============================================
    // DATA MANAGEMENT
    // ============================================
    async loadEvents() {
        try {
            const dbEvents = await this.dbManager.getAllEvents();
            
            // Cargar lista de eventos eliminados desde Firebase
            const deletedEvents = await this.loadDeletedEvents();
            
            // Filtrar INITIAL_DATA para excluir eventos eliminados
            const filteredInitialData = INITIAL_DATA.filter(date => !deletedEvents.includes(date));
            
            // Merge initial data (sin eliminados) con database events
            const allDates = new Set([...filteredInitialData, ...dbEvents.map(e => e.date)]);
            
            this.events = Array.from(allDates).map(date => {
                const dbEvent = dbEvents.find(e => e.date === date);
                return dbEvent || { date, description: '', image: null };
            });

            // Sort by date descending
            this.events.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            console.log(`✅ Loaded ${this.events.length} events (${deletedEvents.length} deleted events filtered)`);
        } catch (error) {
            console.error('Error loading events:', error);
            // Fallback to initial data only
            this.events = INITIAL_DATA.map(date => ({ date, description: '', image: null }));
            this.events.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
    }

    async loadDeletedEvents() {
        try {
            const config = await this.dbManager.getSystemConfig();
            return config?.deletedEvents || [];
        } catch (error) {
            console.error('Error loading deleted events:', error);
            return [];
        }
    }

    async saveDeletedEvent(date) {
        try {
            const deletedEvents = await this.loadDeletedEvents();
            if (!deletedEvents.includes(date)) {
                deletedEvents.push(date);
                await this.dbManager.saveSystemConfig({ 
                    deletedEvents,
                    lastUpdated: Date.now() 
                });
                console.log(`✅ Event ${date} marked as deleted in Firebase`);
            }
        } catch (error) {
            console.error('Error saving deleted event:', error);
        }
    }

    async loadSystemConfig() {
        try {
            const config = await this.dbManager.getSystemConfig();
            if (config) {
                this.normalModeImage = config.normalModeImage || null;
                this.customInfo = config.customInfo || null;
                this.attachedFiles = config.attachedFiles || [];
                console.log('✅ System configuration loaded from Firebase');
            }
        } catch (error) {
            console.error('Error loading system config:', error);
        }
    }

    async refreshData() {
        const btn = document.getElementById('refreshBtn');
        const icon = document.getElementById('refreshIcon');
        const text = document.getElementById('refreshText');
        const t = TRANSLATIONS[this.language];
        
        try {
            // Show loading state
            btn.disabled = true;
            icon.classList.add('refreshing');
            text.textContent = t === TRANSLATIONS.en ? 'Refreshing...' : 'Actualizando...';
            
            console.log('🔄 Refreshing data from Firebase...');
            
            // Reload events
            await this.loadEvents();
            
            // Reload system config
            await this.loadSystemConfig();
            
            // Update UI
            this.renderGallery();
            this.updateStats();
            this.populateYearFilter();
            
            console.log('✅ Data refreshed successfully');
            
            // Show success feedback
            text.textContent = t === TRANSLATIONS.en ? 'Updated!' : '¡Actualizado!';
            
            // Reset button after 1 second
            setTimeout(() => {
                text.textContent = t === TRANSLATIONS.en ? 'Refresh' : 'Actualizar';
                icon.classList.remove('refreshing');
                btn.disabled = false;
            }, 1000);
            
        } catch (error) {
            console.error('Error refreshing data:', error);
            text.textContent = t === TRANSLATIONS.en ? 'Error' : 'Error';
            icon.classList.remove('refreshing');
            
            setTimeout(() => {
                text.textContent = t === TRANSLATIONS.en ? 'Refresh' : 'Actualizar';
                btn.disabled = false;
            }, 2000);
        }
    }

    async saveSystemConfigToFirebase() {
        try {
            // Cargar eventos eliminados actuales para preservarlos
            const deletedEvents = await this.loadDeletedEvents();
            
            const config = {
                normalModeImage: this.normalModeImage,
                customInfo: this.customInfo,
                attachedFiles: this.attachedFiles,
                deletedEvents: deletedEvents, // Preservar lista de eliminados
                lastUpdated: Date.now()
            };
            await this.dbManager.saveSystemConfig(config);
            console.log('✅ System config synchronized to Firebase');
        } catch (error) {
            console.error('Error saving system config to Firebase:', error);
        }
    }

    setupRealtimeSync() {
        // Listen for system config changes in real-time
        try {
            this.dbManager.db.collection('system').doc('config')
                .onSnapshot(doc => {
                    if (doc.exists) {
                        const config = doc.data();
                        const updated = [];
                        
                        // Update Normal Mode Image if changed
                        if (config.normalModeImage !== this.normalModeImage) {
                            this.normalModeImage = config.normalModeImage;
                            updated.push('Normal Mode Image');
                        }
                        
                        // Update Custom Info if changed
                        if (config.customInfo !== this.customInfo) {
                            this.customInfo = config.customInfo;
                            updated.push('System Info');
                        }
                        
                        // Update Attached Files if changed
                        if (JSON.stringify(config.attachedFiles) !== JSON.stringify(this.attachedFiles)) {
                            this.attachedFiles = config.attachedFiles || [];
                            updated.push('Attached Files');
                        }
                        
                        if (updated.length > 0) {
                            console.log('🔄 Real-time sync: ' + updated.join(', ') + ' updated');
                        }
                    }
                }, error => {
                    console.error('❌ Error in system config listener:', error);
                });
        } catch (error) {
            console.error('Error setting up real-time sync:', error);
        }
    }

    // Helper method to mark images for manual cleanup from Cloudinary
    async deleteImageFromCloudinary(imageUrl) {
        if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
            console.log('⚠️ Image is not from Cloudinary, skipping');
            return;
        }

        try {
            // Extract public_id from Cloudinary URL
            // URL format: https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{public_id}.{format}
            const urlParts = imageUrl.split('/');
            const uploadIndex = urlParts.indexOf('upload');
            if (uploadIndex === -1) return;
            
            // Get everything after 'upload/v{version}/'
            const publicIdWithExt = urlParts.slice(uploadIndex + 2).join('/');
            const publicId = publicIdWithExt.substring(0, publicIdWithExt.lastIndexOf('.'));
            
            console.log(`📝 Image marked for cleanup: ${publicId}`);
            console.log(`🔗 View in Cloudinary: https://console.cloudinary.com/console/c-${CLOUDINARY_CONFIG.cloudName}/media_library/folders/home`);
            console.log(`ℹ️  Note: Images are not automatically deleted from Cloudinary.`);
            console.log(`ℹ️  You can manually delete unused images from your Cloudinary dashboard.`);
            console.log(`ℹ️  With 25GB free storage, you have space for thousands of images.`);
            
        } catch (error) {
            console.error('Error processing image URL:', error);
            // Don't throw error, continue with operation
        }
    }

    async saveEvent() {
        const dateInput = document.getElementById('eventDate');
        const imageInput = document.getElementById('eventImage');
        const imageReturnInput = document.getElementById('eventImageReturn');
        const descInput = document.getElementById('eventDescription');

        // Clear previous errors
        this.clearError();

        // Validate date
        const date = dateInput.value;
        if (!date) {
            this.showError(TRANSLATIONS[this.language].errorDateRequired);
            return;
        }

        if (!Utils.isValidDate(date)) {
            this.showError(TRANSLATIONS[this.language].errorDateRequired);
            return;
        }

        // Check for duplicate (only if not editing)
        if (!this.currentEditingEvent) {
            const existingEvent = this.events.find(e => e.date === date);
            if (existingEvent && (existingEvent.image || existingEvent.imageChange)) {
                this.showError(TRANSLATIONS[this.language].errorDateDuplicate);
                return;
            }
        }

        // Validate change image
        const file = imageInput.files[0];
        if (file) {
            // Check file type
            if (!file.type.startsWith('image/')) {
                this.showError(TRANSLATIONS[this.language].errorImageType);
                return;
            }

            // Check file size
            if (file.size > MAX_IMAGE_SIZE) {
                this.showError(TRANSLATIONS[this.language].errorImageSize);
                return;
            }
        }

        // Validate return image
        const fileReturn = imageReturnInput ? imageReturnInput.files[0] : null;
        if (fileReturn) {
            // Check file type
            if (!fileReturn.type.startsWith('image/')) {
                this.showError(TRANSLATIONS[this.language].errorImageType);
                return;
            }

            // Check file size
            if (fileReturn.size > MAX_IMAGE_SIZE) {
                this.showError(TRANSLATIONS[this.language].errorImageSize);
                return;
            }
        }

        try {
            // Show loading state
            const saveBtn = document.getElementById('saveBtn');
            saveBtn.disabled = true;
            saveBtn.textContent = this.language === 'en' ? 'Saving...' : 'Guardando...';

            let imageData = this.currentImagePreview;
            if (file) {
                console.log(`📸 Uploading change image to Cloudinary: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`);
                // Upload to Cloudinary
                imageData = await Utils.uploadToCloudinary(file, 'events');
                console.log(`✅ Change image uploaded to Cloudinary`);
            }

            let imageReturnData = this.currentReturnImagePreview;
            if (fileReturn) {
                console.log(`📸 Uploading return image to Cloudinary: ${fileReturn.name} (${(fileReturn.size / 1024 / 1024).toFixed(2)}MB)`);
                // Upload to Cloudinary
                imageReturnData = await Utils.uploadToCloudinary(fileReturn, 'events');
                console.log(`✅ Return image uploaded to Cloudinary`);
            }

            // Sanitize description
            const description = Utils.sanitizeHTML(descInput.value.trim().substring(0, MAX_DESCRIPTION_LENGTH));

            // Create event object with support for multiple images
            const event = {
                date,
                description,
                imageChange: imageData, // Imagen de cambio
                imageReturn: imageReturnData, // Imagen de devolución
                // Mantener compatibilidad con versión anterior
                image: imageData,
                timestamp: Date.now()
            };
            
            console.log(`💾 Saving event: ${date}`, {
                hasChangeImage: !!imageData,
                hasReturnImage: !!imageReturnData,
                description: description ? 'Yes' : 'No'
            });

            // Si estamos editando y la fecha cambió, eliminar el evento viejo completamente
            if (this.currentEditingEvent && this.currentEditingEvent !== date) {
                console.log(`🔄 Fecha cambió de ${this.currentEditingEvent} a ${date}, eliminando evento viejo...`);
                
                // Eliminar imágenes viejas de Cloudinary si existen
                if (this.currentEditingEventData) {
                    if (this.currentEditingEventData.imageChange || this.currentEditingEventData.image) {
                        console.log('🗑️ Deleting old change image from Cloudinary...');
                        await this.deleteImageFromCloudinary(this.currentEditingEventData.imageChange || this.currentEditingEventData.image);
                    }
                    if (this.currentEditingEventData.imageReturn) {
                        console.log('🗑️ Deleting old return image from Cloudinary...');
                        await this.deleteImageFromCloudinary(this.currentEditingEventData.imageReturn);
                    }
                }
                
                // Eliminar de Firebase
                await this.dbManager.deleteEvent(this.currentEditingEvent);
                
                // Eliminar del array local
                this.events = this.events.filter(e => e.date !== this.currentEditingEvent);
                console.log(`✅ Evento viejo eliminado completamente: ${this.currentEditingEvent}`);
            }

            // Clear editing flags
            this.currentEditingEvent = null;
            this.currentEditingEventData = null;
            this.currentReturnImagePreview = null;

            // Save to Firebase
            await this.dbManager.saveEvent(event);

            // Update local events array
            const index = this.events.findIndex(e => e.date === date);
            if (index >= 0) {
                this.events[index] = event;
            } else {
                this.events.push(event);
                this.events.sort((a, b) => new Date(b.date) - new Date(a.date));
            }

            // Show success message
            this.showSuccess(TRANSLATIONS[this.language].successSaved);

            // Close modal and refresh UI
            setTimeout(() => {
                this.closeUploadModal();
                this.renderGallery();
                this.updateStats();
                this.populateYearFilter();
            }, 1000);

        } catch (error) {
            console.error('Error saving event:', error);
            this.showError('Failed to save event. Please try again.');
        } finally {
            const saveBtn = document.getElementById('saveBtn');
            saveBtn.disabled = false;
            saveBtn.textContent = TRANSLATIONS[this.language].saveBtn;
        }
    }

    // ============================================
    // UI RENDERING
    // ============================================
    renderGallery() {
        const gallery = document.getElementById('gallery');
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const yearFilter = document.getElementById('yearFilter').value;

        // Filter events
        let filteredEvents = this.events.filter(event => {
            const matchesSearch = event.date.includes(searchTerm) || 
                                 (event.description && event.description.toLowerCase().includes(searchTerm));
            const matchesYear = yearFilter === 'all' || event.date.startsWith(yearFilter);
            
            // Advanced date filters
            let matchesDateRange = true;
            if (this.advancedFilters) {
                const eventDate = new Date(event.date);
                if (this.advancedFilters.dateFrom) {
                    const fromDate = new Date(this.advancedFilters.dateFrom);
                    if (eventDate < fromDate) matchesDateRange = false;
                }
                if (this.advancedFilters.dateTo) {
                    const toDate = new Date(this.advancedFilters.dateTo);
                    if (eventDate > toDate) matchesDateRange = false;
                }
            }
            
            return matchesSearch && matchesYear && matchesDateRange;
        });

        // Clear gallery
        gallery.innerHTML = '';

        if (filteredEvents.length === 0) {
            gallery.innerHTML = `
                <div class="empty-state">
                    <p>${TRANSLATIONS[this.language].noEvents}</p>
                </div>
            `;
            return;
        }

        // Render event cards
        filteredEvents.forEach(event => {
            const card = this.createEventCard(event);
            gallery.appendChild(card);
        });
    }

    createEventCard(event) {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.setAttribute('role', 'listitem');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Event on ${Utils.formatDate(event.date)}`);

        const imageContent = event.image 
            ? `<img src="${event.image}" alt="Event on ${event.date}" loading="lazy">`
            : '<div class="placeholder">📅</div>';

        const description = event.description 
            ? `<div class="event-description">${event.description}</div>`
            : '';

        card.innerHTML = `
            <div class="event-image">${imageContent}</div>
            <div class="event-info">
                <div class="event-header">
                    <div class="event-date">${Utils.formatDate(event.date)}</div>
                    <div class="event-actions">
                        <button class="btn-icon edit-btn" aria-label="${TRANSLATIONS[this.language].editEventBtn}" title="${TRANSLATIONS[this.language].editEventBtn}">✏️</button>
                        <button class="btn-icon delete-btn" aria-label="${TRANSLATIONS[this.language].deleteEventBtn}" title="${TRANSLATIONS[this.language].deleteEventBtn}">🗑️</button>
                    </div>
                </div>
                <div class="event-label">${TRANSLATIONS[this.language].modeChange}</div>
                ${description}
            </div>
        `;

        // Edit button
        card.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.editEvent(event);
        });

        // Delete button
        card.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.deleteEvent(event.date);
        });

        // Card click to view
        card.addEventListener('click', () => {
            this.openImageModal(event);
        });

        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.openImageModal(event);
            }
        });

        return card;
    }

    updateStats() {
        const totalEvents = this.events.length;
        document.getElementById('totalEvents').textContent = totalEvents;

        if (totalEvents > 0) {
            const lastEventDate = this.events[0].date;
            document.getElementById('lastEvent').textContent = Utils.formatDate(lastEventDate);

            // Calculate average per month
            const firstDate = new Date(this.events[this.events.length - 1].date);
            const lastDate = new Date(this.events[0].date);
            const monthsDiff = (lastDate.getFullYear() - firstDate.getFullYear()) * 12 + 
                              (lastDate.getMonth() - firstDate.getMonth()) + 1;
            const avgPerMonth = (totalEvents / monthsDiff).toFixed(1);
            document.getElementById('avgPerMonth').textContent = avgPerMonth;
            
            // Make avgPerMonth card clickable
            const avgCard = document.getElementById('avgPerMonth').closest('.stat-card');
            if (avgCard && !avgCard.dataset.listenerAdded) {
                avgCard.style.cursor = 'pointer';
                avgCard.addEventListener('click', () => {
                    this.showMonthlyCharts();
                });
                avgCard.dataset.listenerAdded = 'true';
            }
        } else {
            document.getElementById('lastEvent').textContent = '-';
            document.getElementById('avgPerMonth').textContent = '0';
        }
    }

    populateYearFilter() {
        const yearFilter = document.getElementById('yearFilter');
        const years = [...new Set(this.events.map(e => e.date.substring(0, 4)))].sort().reverse();
        
        yearFilter.innerHTML = `<option value="all">${TRANSLATIONS[this.language].allYears}</option>`;
        years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearFilter.appendChild(option);
        });
    }

    // ============================================
    // MODAL MANAGEMENT
    // ============================================
    openUploadModal() {
        // Reset editing state
        this.currentEditingEvent = null;
        document.getElementById('uploadTitle').textContent = TRANSLATIONS[this.language].uploadTitle;
        document.getElementById('saveBtn').textContent = TRANSLATIONS[this.language].saveBtn;
        document.getElementById('eventDate').disabled = false;
        
        document.getElementById('uploadModal').classList.add('active');
        document.getElementById('eventDate').value = '';
        document.getElementById('eventImage').value = '';
        document.getElementById('eventDescription').value = '';
        document.getElementById('imagePreview').style.display = 'none';
        this.currentImagePreview = null;
        
        // Clear return image fields
        const eventImageReturn = document.getElementById('eventImageReturn');
        const imageReturnPreview = document.getElementById('imageReturnPreview');
        if (eventImageReturn) eventImageReturn.value = '';
        if (imageReturnPreview) imageReturnPreview.style.display = 'none';
        this.currentReturnImagePreview = null;
        
        this.clearError();
        
        // Focus on date input
        setTimeout(() => {
            document.getElementById('eventDate').focus();
        }, 100);
    }

    closeUploadModal() {
        document.getElementById('uploadModal').classList.remove('active');
        this.currentImagePreview = null;
        this.currentEditingEvent = null;
        document.getElementById('eventDate').disabled = false;
    }

    openImageModal(event) {
        const modal = document.getElementById('imageModal');
        const content = document.getElementById('imageModalContent');
        const dateTitle = document.getElementById('imageModalDate');

        dateTitle.textContent = Utils.formatDate(event.date);

        let html = '';

        // Show change image (usar imageChange o image para compatibilidad)
        const changeImage = event.imageChange || event.image;
        if (changeImage) {
            html += `
                <div class="image-section">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <h3 style="margin: 0;">
                            ${this.language === 'en' ? '📸 Mode Change Image' : '📸 Imagen de Cambio de Modo'}
                        </h3>
                        <div class="zoom-controls">
                            <button class="zoom-btn" onclick="toggleImageZoom(this.parentElement.parentElement.nextElementSibling)" title="${this.language === 'en' ? 'Toggle zoom' : 'Activar/desactivar zoom'}">
                                🔍 ${this.language === 'en' ? 'Zoom' : 'Zoom'}
                            </button>
                        </div>
                    </div>
                    <img src="${changeImage}" 
                         alt="Mode change on ${event.date}" 
                         loading="lazy"
                         onclick="toggleImageZoom(this)"
                         style="cursor: zoom-in;"
                         title="${this.language === 'en' ? 'Click to zoom' : 'Clic para hacer zoom'}">
                </div>
            `;
        }

        // Show return image if exists
        if (event.imageReturn) {
            html += `
                <div class="image-section">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <h3 style="margin: 0;">
                            ${this.language === 'en' ? '📊 Return to Normal Graph' : '📊 Gráfica de Devolución'}
                        </h3>
                        <div class="zoom-controls">
                            <button class="zoom-btn" onclick="toggleImageZoom(this.parentElement.parentElement.nextElementSibling)" title="${this.language === 'en' ? 'Toggle zoom' : 'Activar/desactivar zoom'}">
                                🔍 ${this.language === 'en' ? 'Zoom' : 'Zoom'}
                            </button>
                        </div>
                    </div>
                    <img src="${event.imageReturn}" 
                         alt="Return graph on ${event.date}"
                         loading="lazy"
                         onclick="toggleImageZoom(this)"
                         style="cursor: zoom-in;"
                         title="${this.language === 'en' ? 'Click to zoom' : 'Clic para hacer zoom'}">
                </div>
            `;
        }

        // Show description if exists
        if (event.description) {
            html += `
                <div class="image-details" style="margin-top: 1rem;">
                    <p>${event.description}</p>
                </div>
            `;
        }

        // If no images, show message
        if (!changeImage && !event.imageReturn) {
            html = `
                <div class="image-details">
                    <p>${event.description || TRANSLATIONS[this.language].modeChange}</p>
                </div>
            `;
        }

        content.innerHTML = html;
        modal.classList.add('active');
    }

    closeImageModal() {
        document.getElementById('imageModal').classList.remove('active');
    }

    handleImagePreview(e, previewId = 'imagePreview', propertyName = 'currentImagePreview') {
        const file = e.target.files[0];
        const preview = document.getElementById(previewId);

        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                this.showError(TRANSLATIONS[this.language].errorImageType);
                e.target.value = '';
                preview.style.display = 'none';
                return;
            }

            // Validate file size
            if (file.size > MAX_IMAGE_SIZE) {
                this.showError(TRANSLATIONS[this.language].errorImageSize);
                e.target.value = '';
                preview.style.display = 'none';
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                this[propertyName] = event.target.result;
                preview.innerHTML = `
                    <img src="${event.target.result}" alt="Preview">
                    <button class="delete-image-btn" onclick="app.removeImagePreview('${previewId}', '${propertyName}')" title="Eliminar imagen">🗑️</button>
                `;
                preview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            preview.style.display = 'none';
            this[propertyName] = null;
        }
    }

    removeImagePreview(previewId, propertyName) {
        const preview = document.getElementById(previewId);
        preview.style.display = 'none';
        preview.innerHTML = '';
        this[propertyName] = null;
        
        // Clear file input
        if (previewId === 'imagePreview') {
            document.getElementById('eventImage').value = '';
        } else if (previewId === 'imageReturnPreview') {
            document.getElementById('eventImageReturn').value = '';
        }
        
        this.showSuccessToast('Imagen eliminada');
    }

    // ============================================
    // LANGUAGE MANAGEMENT
    // ============================================
    toggleLanguage() {
        this.language = this.language === 'en' ? 'es' : 'en';
        localStorage.setItem('language', this.language);
        this.updateLanguage();
    }

    updateLanguage() {
        const t = TRANSLATIONS[this.language];
        
        // Update all translatable elements
        document.getElementById('mainTitle').textContent = t.mainTitle;
        document.getElementById('mainSubtitle').textContent = t.mainSubtitle;
        document.getElementById('totalEventsLabel').textContent = t.totalEventsLabel;
        document.getElementById('lastEventLabel').textContent = t.lastEventLabel;
        document.getElementById('avgPerMonthLabel').textContent = t.avgPerMonthLabel;
        document.getElementById('infoLabel').textContent = t.infoLabel;
        document.getElementById('normalModeLabel').textContent = t.normalModeLabel;
        document.getElementById('searchInput').placeholder = t.searchPlaceholder;
        document.getElementById('addEventText').textContent = t.addEventBtn;
        document.getElementById('galleryTitle').textContent = t.galleryTitle;
        document.getElementById('uploadTitle').textContent = t.uploadTitle;
        document.getElementById('dateLabel').textContent = t.dateLabel;
        document.getElementById('imageLabel').textContent = t.imageLabel;
        
        const imageReturnLabel = document.getElementById('imageReturnLabel');
        if (imageReturnLabel) imageReturnLabel.textContent = t.imageReturnLabel;
        
        document.getElementById('descLabel').textContent = t.descLabel;
        document.getElementById('cancelBtn').textContent = t.cancelBtn;
        document.getElementById('saveBtn').textContent = t.saveBtn;
        document.getElementById('langBtn').textContent = t.langBtn;
        document.getElementById('refreshText').textContent = this.language === 'en' ? 'Refresh' : 'Actualizar';
        document.getElementById('imageModalLabel').textContent = t.modeChange;

        // Update new UI elements
        const exportText = document.getElementById('exportText');
        if (exportText) exportText.textContent = t.exportBtn;
        
        const statsText = document.getElementById('statsText');
        if (statsText) statsText.textContent = t.statistics;
        
        const advancedSearchTitle = document.getElementById('advancedSearchTitle');
        if (advancedSearchTitle) advancedSearchTitle.textContent = `🔍 ${t.advancedSearch}`;
        
        const dateFromLabel = document.getElementById('dateFromLabel');
        if (dateFromLabel) dateFromLabel.textContent = t.dateFrom;
        
        const dateToLabel = document.getElementById('dateToLabel');
        if (dateToLabel) dateToLabel.textContent = t.dateTo;
        
        const applyFiltersText = document.getElementById('applyFiltersText');
        if (applyFiltersText) applyFiltersText.textContent = t.applyFilters;
        
        const clearFiltersText = document.getElementById('clearFiltersText');
        if (clearFiltersText) clearFiltersText.textContent = t.clearFilters;
        
        const statsModalTitle = document.getElementById('statsModalTitle');
        if (statsModalTitle) statsModalTitle.textContent = `📊 ${t.statistics}`;

        // Update year filter
        this.populateYearFilter();
        
        // Re-render gallery to update labels
        this.renderGallery();
    }

    // ============================================
    // ERROR/SUCCESS MESSAGES
    // ============================================
    showError(message) {
        const errorDiv = document.getElementById('uploadError');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }

    showSuccess(message) {
        const errorDiv = document.getElementById('uploadError');
        errorDiv.className = 'success-message';
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }

    clearError() {
        const errorDiv = document.getElementById('uploadError');
        errorDiv.style.display = 'none';
        errorDiv.textContent = '';
    }

    // ============================================
    // EDIT EVENT
    // ============================================
    editEvent(event) {
        this.currentEditingEvent = event.date;
        this.currentEditingEventData = { ...event }; // Guardar datos originales
        document.getElementById('uploadTitle').textContent = TRANSLATIONS[this.language].editTitle;
        document.getElementById('saveBtn').textContent = TRANSLATIONS[this.language].updateBtn;
        document.getElementById('eventDate').value = event.date;
        document.getElementById('eventDate').disabled = false; // Permitir cambiar fecha
        document.getElementById('eventDescription').value = event.description || '';
        
        // Load change image (usar imageChange o image para compatibilidad)
        const changeImage = event.imageChange || event.image;
        if (changeImage) {
            this.currentImagePreview = changeImage;
            const preview = document.getElementById('imagePreview');
            preview.innerHTML = `
                <img src="${changeImage}" alt="Preview">
                <button class="delete-image-btn" onclick="app.removeImagePreview('imagePreview', 'currentImagePreview')" title="Eliminar imagen">🗑️</button>
            `;
            preview.style.display = 'block';
        }
        
        // Load return image if exists
        if (event.imageReturn) {
            this.currentReturnImagePreview = event.imageReturn;
            const previewReturn = document.getElementById('imageReturnPreview');
            if (previewReturn) {
                previewReturn.innerHTML = `
                    <img src="${event.imageReturn}" alt="Preview">
                    <button class="delete-image-btn" onclick="app.removeImagePreview('imageReturnPreview', 'currentReturnImagePreview')" title="Eliminar imagen">🗑️</button>
                `;
                previewReturn.style.display = 'block';
            }
        }
        
        document.getElementById('uploadModal').classList.add('active');
        this.clearError();
    }

    // ============================================
    // DELETE EVENT
    // ============================================
    async deleteEvent(date) {
        const confirmed = confirm(TRANSLATIONS[this.language].confirmDelete);
        if (!confirmed) return;

        try {
            // Get the event to delete images from Cloudinary
            const event = this.events.find(e => e.date === date);
            
            // Delete images from Cloudinary if they exist
            if (event) {
                if (event.imageChange || event.image) {
                    console.log('🗑️ Deleting change image from Cloudinary...');
                    await this.deleteImageFromCloudinary(event.imageChange || event.image);
                }
                if (event.imageReturn) {
                    console.log('🗑️ Deleting return image from Cloudinary...');
                    await this.deleteImageFromCloudinary(event.imageReturn);
                }
            }
            
            // Guardar en la lista de eventos eliminados permanentemente
            await this.saveDeletedEvent(date);
            console.log(`✅ Event ${date} added to deleted list`);
            
            // Delete from Firebase
            await this.dbManager.deleteEvent(date);
            console.log(`✅ Event deleted from Firebase: ${date}`);
            
            // Remove from local array
            this.events = this.events.filter(e => e.date !== date);
            
            // Show success message
            this.showSuccessToast(TRANSLATIONS[this.language].successDeleted);
            
            // Update UI
            this.renderGallery();
            this.updateStats();
            this.populateYearFilter();
            
            // Close modal if open
            this.closeImageModal();
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('Error deleting event. Please try again.');
        }
    }

    // ============================================
    // GENERATE REPORT
    // ============================================
    async generateReport() {
        try {
            const t = TRANSLATIONS[this.language];
            const events = [...this.events].sort((a, b) => new Date(a.date) - new Date(b.date));
            
            // Get custom info or default
            const infoText = this.customInfo || t.infoContent;
            
            // Calculate statistics
            const totalEvents = events.length;
            const firstDate = events.length > 0 ? Utils.formatDate(events[0].date) : '-';
            const lastDate = events.length > 0 ? Utils.formatDate(events[events.length - 1].date) : '-';
            
            // Group by year
            const byYear = {};
            events.forEach(event => {
                const year = event.date.substring(0, 4);
                byYear[year] = (byYear[year] || 0) + 1;
            });
            
            // Generate HTML report
            const reportHTML = `
<!DOCTYPE html>
<html lang="${this.language}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t.mainTitle} - ${t.exportBtn}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f5f5; padding: 2rem; line-height: 1.6; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 3rem; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #1e3a8a; border-bottom: 3px solid #3b82f6; padding-bottom: 1rem; margin-bottom: 2rem; }
        h2 { color: #1e40af; margin-top: 2rem; margin-bottom: 1rem; border-left: 4px solid #3b82f6; padding-left: 1rem; }
        h3 { color: #1e40af; margin-top: 1.5rem; margin-bottom: 0.75rem; }
        .header-info { background: #eff6ff; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 2rem 0; }
        .stat-box { background: #dbeafe; padding: 1.5rem; border-radius: 8px; text-align: center; }
        .stat-value { font-size: 2rem; font-weight: bold; color: #1e40af; }
        .stat-label { color: #64748b; font-size: 0.875rem; margin-top: 0.5rem; }
        .event-table { width: 100%; border-collapse: collapse; margin: 2rem 0; }
        .event-table th { background: #1e40af; color: white; padding: 1rem; text-align: left; }
        .event-table td { padding: 0.75rem 1rem; border-bottom: 1px solid #e2e8f0; }
        .event-table tr:hover { background: #f8fafc; }
        .event-table tr:nth-child(even) { background: #f9fafb; }
        .info-section { background: #f8fafc; padding: 2rem; border-radius: 8px; margin: 2rem 0; border-left: 4px solid #3b82f6; }
        .info-section p { margin-bottom: 1rem; text-align: justify; }
        .footer { margin-top: 3rem; padding-top: 2rem; border-top: 2px solid #e2e8f0; text-align: center; color: #64748b; font-size: 0.875rem; }
        .year-summary { background: #fef3c7; padding: 1rem; border-radius: 8px; margin: 1rem 0; }
        @media print { body { padding: 0; } .container { box-shadow: none; } }
    </style>
</head>
<body>
    <div class="container">
        <h1>📊 ${t.mainTitle}</h1>
        
        <div class="header-info">
            <p><strong>${t.mainSubtitle}</strong></p>
            <p>${t === TRANSLATIONS.en ? 'Report generated on:' : 'Informe generado el:'} ${new Date().toLocaleDateString(this.language === 'en' ? 'en-US' : 'es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        
        <h2 style="font-size: 22pt; font-weight: bold;">📈 ${t === TRANSLATIONS.en ? 'SUMMARY STATISTICS' : 'ESTADÍSTICAS RESUMIDAS'}</h2>
        <div class="stats-grid">
            <div class="stat-box">
                <div class="stat-label">${t.totalEventsLabel}</div>
                <div class="stat-value">${totalEvents}</div>
            </div>
            <div class="stat-box">
                <div class="stat-label">${t === TRANSLATIONS.en ? 'First Event' : 'Primer Evento'}</div>
                <div class="stat-value">${firstDate}</div>
            </div>
            <div class="stat-box">
                <div class="stat-label">${t.lastEventLabel}</div>
                <div class="stat-value">${lastDate}</div>
            </div>
            <div class="stat-box">
                <div class="stat-label">${t === TRANSLATIONS.en ? 'Years Covered' : 'Años Cubiertos'}</div>
                <div class="stat-value">${Object.keys(byYear).length}</div>
            </div>
        </div>
        
        <h2 style="font-size: 22pt; font-weight: bold; page-break-before: always;">📅 ${t === TRANSLATIONS.en ? 'EVENTS BY YEAR' : 'EVENTOS POR AÑO'}</h2>
        ${Object.entries(byYear).sort().map(([year, count]) => `
            <div class="year-summary">
                <strong>${year}:</strong> ${count} ${count === 1 ? (t === TRANSLATIONS.en ? 'event' : 'evento') : t.eventsLabel}
            </div>
        `).join('')}
        
        <h2 style="font-size: 22pt; font-weight: bold;">📋 ${t === TRANSLATIONS.en ? 'COMPLETE EVENT LIST' : 'LISTA COMPLETA DE EVENTOS'}</h2>
        <table class="event-table">
            <thead>
                <tr>
                    <th style="width: 3%; text-align: center;">#</th>
                    <th style="width: 10%; text-align: center;">${t === TRANSLATIONS.en ? 'Date' : 'Fecha'}</th>
                    <th style="width: 43.5%; text-align: center;">${t === TRANSLATIONS.en ? 'Change' : 'Cambio'}</th>
                    <th style="width: 43.5%; text-align: center;">${t === TRANSLATIONS.en ? 'Return' : 'Devolución'}</th>
                </tr>
            </thead>
            <tbody>
                ${events.map((event, index) => `
                    <tr style="height: auto;">
                        <td style="text-align: center; vertical-align: middle; font-weight: bold; font-size: 9pt;">${index + 1}</td>
                        <td style="text-align: center; vertical-align: middle; font-size: 9pt; white-space: nowrap;">${Utils.formatDate(event.date)}</td>
                        <td style="text-align: center; vertical-align: middle; padding: 3pt;">
                            ${(event.imageChange || event.image) ? 
                                `<img src="${event.imageChange || event.image}" width="434" height="290" style="width: 11.5cm !important; height: 7.67cm !important; max-width: 11.5cm; max-height: 7.67cm; display: block; margin: 0 auto; border: 1pt solid #94a3b8;" alt="Cambio">` 
                                : '<span style="color: #94a3b8; font-size: 16pt; font-weight: bold;">—</span>'}
                        </td>
                        <td style="text-align: center; vertical-align: middle; padding: 3pt;">
                            ${event.imageReturn ? 
                                `<img src="${event.imageReturn}" width="515" height="270" style="width: 13.62cm !important; height: 7.13cm !important; max-width: 13.62cm; max-height: 7.13cm; display: block; margin: 0 auto; border: 1pt solid #94a3b8;" alt="Devolución">` 
                                : '<span style="color: #94a3b8; font-size: 16pt; font-weight: bold;">—</span>'}
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        <h2 style="font-size: 22pt; font-weight: bold;">ℹ️ ${t === TRANSLATIONS.en ? 'SYSTEM INFORMATION' : 'INFORMACIÓN DEL SISTEMA'}</h2>
        <div class="info-section">
            ${infoText.split('\n\n').map(p => p.trim() ? `<p>${p}</p>` : '').join('')}
        </div>
        
        <div class="footer">
            <p><strong>${t.mainTitle}</strong></p>
            <p>${t === TRANSLATIONS.en ? 'Generated by VRSS-2 Time Calibration Registry System' : 'Generado por Sistema de Registro de Calibración de Tiempo VRSS-2'}</p>
            <p>${new Date().toLocaleString(this.language === 'en' ? 'en-US' : 'es-ES')}</p>
        </div>
    </div>
</body>
</html>
            `;
            
            // Convert HTML to Word-compatible format with proper encoding
            const wordContent = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset='utf-8'>
<title>${t.mainTitle} - ${t.exportBtn}</title>
<!--[if gte mso 9]>
<xml>
<w:WordDocument>
<w:View>Print</w:View>
<w:Zoom>100</w:Zoom>
<w:DoNotOptimizeForBrowser/>
</w:WordDocument>
<w:OfficeDocumentSettings>
<w:AllowPNG/>
</w:OfficeDocumentSettings>
</xml>
<![endif]-->
<style>
@page Section1 { 
    size: 29.7cm 21cm;
    mso-page-orientation: landscape;
    margin: 1cm 0.8cm; 
}
div.Section1 { page: Section1; }
* { margin: 0; padding: 0; box-sizing: border-box; }
body { 
    font-family: 'Calibri', 'Arial', sans-serif; 
    background: white; 
    padding: 0.3cm; 
    line-height: 1.3; 
    font-size: 9pt; 
}
h1 { 
    color: #1e3a8a; 
    border-bottom: 3pt solid #3b82f6; 
    padding-bottom: 10pt; 
    margin-bottom: 18pt; 
    font-size: 22pt; 
    page-break-after: avoid;
    text-align: center;
}
h2 { 
    color: #1e40af; 
    margin-top: 18pt; 
    margin-bottom: 10pt; 
    border-left: 4pt solid #3b82f6; 
    padding-left: 10pt; 
    font-size: 16pt; 
    page-break-after: avoid; 
}
h3 { color: #1e40af; margin-top: 14pt; margin-bottom: 8pt; font-size: 12pt; }
.header-info { 
    background-color: #eff6ff; 
    padding: 12pt; 
    border-radius: 6pt; 
    margin-bottom: 18pt; 
    border: 1pt solid #bfdbfe; 
}
.stats-grid { 
    display: table; 
    width: 100%; 
    margin: 18pt 0; 
    border-collapse: collapse; 
}
.stat-box { 
    display: table-cell; 
    background-color: #dbeafe; 
    padding: 14pt; 
    text-align: center; 
    border: 1pt solid #93c5fd; 
    width: 25%; 
}
.stat-label { 
    color: #1e40af; 
    font-size: 14pt; 
    display: block; 
    font-weight: bold;
    margin-bottom: 8pt;
}
.stat-value { 
    font-size: 10pt; 
    font-weight: normal; 
    color: #1e40af; 
    display: block; 
}
.event-table { 
    width: 100%; 
    border-collapse: collapse; 
    margin: 18pt 0; 
    page-break-inside: auto;
}
.event-table th { 
    background-color: #1e40af; 
    color: white; 
    padding: 10pt; 
    text-align: center; 
    font-weight: bold; 
    border: 1pt solid #1e40af; 
    font-size: 11pt;
}
.event-table td { 
    padding: 8pt; 
    border: 1pt solid #cbd5e1; 
    vertical-align: top;
}
.event-table tr { 
    page-break-inside: avoid; 
    page-break-after: auto;
}
.event-table tr:nth-child(even) { background-color: #f9fafb; }
.info-section { 
    background-color: #f8fafc; 
    padding: 18pt; 
    border-radius: 6pt; 
    margin: 18pt 0; 
    border-left: 4pt solid #3b82f6; 
    page-break-inside: avoid;
}
.info-section p { margin-bottom: 10pt; text-align: justify; }
.footer { 
    margin-top: 24pt; 
    padding-top: 18pt; 
    border-top: 2pt solid #e2e8f0; 
    text-align: center; 
    color: #64748b; 
    font-size: 8pt; 
}
.year-summary { 
    background-color: #fef3c7; 
    padding: 10pt; 
    border-radius: 6pt; 
    margin: 10pt 0; 
    border: 1pt solid #fde68a; 
}
p { margin-bottom: 5pt; }
</style>
</head>
<body>
<div class="Section1">
${reportHTML.match(/<body>([\s\S]*)<\/body>/)[1]}
</div>
</body>
</html>
            `;
            
            // Create and download Word file
            const blob = new Blob(['\ufeff', wordContent], { 
                type: 'application/msword;charset=utf-8' 
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `VRSS2-Informe-${new Date().toISOString().split('T')[0]}.doc`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            this.showSuccessToast(t.reportGenerated);
        } catch (error) {
            console.error('Error generating report:', error);
            alert('Error generating report. Please try again.');
        }
    }

    // ============================================
    // ADVANCED SEARCH
    // ============================================
    applyAdvancedFilters() {
        const dateFrom = document.getElementById('dateFrom').value;
        const dateTo = document.getElementById('dateTo').value;
        
        this.advancedFilters = { dateFrom, dateTo };
        this.renderGallery();
    }

    clearAdvancedFilters() {
        document.getElementById('dateFrom').value = '';
        document.getElementById('dateTo').value = '';
        this.advancedFilters = null;
        this.renderGallery();
    }

    // ============================================
    // STATISTICS
    // ============================================
    generateStatistics() {
        const stats = {
            byYear: {},
            byMonth: {},
            total: this.events.length
        };

        this.events.forEach(event => {
            const date = new Date(event.date);
            const year = date.getFullYear();
            const month = `${year}-${String(date.getMonth() + 1).padStart(2, '0')}`;

            stats.byYear[year] = (stats.byYear[year] || 0) + 1;
            stats.byMonth[month] = (stats.byMonth[month] || 0) + 1;
        });

        return stats;
    }

    showStatistics() {
        const stats = this.generateStatistics();
        const modal = document.getElementById('statsModal');
        const content = document.getElementById('statsContent');
        
        let html = '<div class="stats-charts">';
        
        // Events by Year
        html += `<div class="chart-section">
            <h3>${TRANSLATIONS[this.language].eventsPerYear}</h3>
            <div class="bar-chart">`;
        
        const maxYearValue = Math.max(...Object.values(stats.byYear));
        Object.entries(stats.byYear).sort().forEach(([year, count]) => {
            const percentage = (count / maxYearValue) * 100;
            html += `
                <div class="bar-item">
                    <div class="bar-label">${year}</div>
                    <div class="bar-container">
                        <div class="bar-fill" style="width: ${percentage}%"></div>
                        <div class="bar-value">${count}</div>
                    </div>
                </div>`;
        });
        
        html += `</div></div>`;
        
        // Events by Month (last 12 months)
        html += `<div class="chart-section">
            <h3>${TRANSLATIONS[this.language].eventsPerMonth} (Last 12)</h3>
            <div class="bar-chart">`;
        
        const monthEntries = Object.entries(stats.byMonth).sort().slice(-12);
        const maxMonthValue = Math.max(...monthEntries.map(([, count]) => count));
        
        monthEntries.forEach(([month, count]) => {
            const percentage = (count / maxMonthValue) * 100;
            html += `
                <div class="bar-item">
                    <div class="bar-label">${month}</div>
                    <div class="bar-container">
                        <div class="bar-fill" style="width: ${percentage}%"></div>
                        <div class="bar-value">${count}</div>
                    </div>
                </div>`;
        });
        
        html += `</div></div></div>`;
        
        content.innerHTML = html;
        modal.classList.add('active');
    }

    // ============================================
    // MONTHLY CHARTS
    // ============================================
    showMonthlyCharts() {
        const modal = document.getElementById('monthlyChartsModal');
        const t = TRANSLATIONS[this.language];
        
        // Update title and tabs
        document.getElementById('monthlyChartsTitle').textContent = `📈 ${t.monthlyAnalysis}`;
        document.getElementById('timelineTab').textContent = t.timelineTab;
        document.getElementById('monthlyTab').textContent = t.monthlyTab;
        
        // Generate timeline view
        this.generateTimelineView();
        
        // Generate monthly view
        this.generateMonthlyView();
        
        modal.classList.add('active');
    }
    
    generateTimelineView() {
        const timelineView = document.getElementById('timelineView');
        const t = TRANSLATIONS[this.language];
        
        // Group events by month
        const monthlyData = {};
        this.events.forEach(event => {
            const date = new Date(event.date);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            monthlyData[monthKey] = (monthlyData[monthKey] || 0) + 1;
        });
        
        // Sort by date
        const sortedMonths = Object.entries(monthlyData).sort();
        const maxValue = Math.max(...Object.values(monthlyData));
        
        let html = `
            <div class="timeline-chart">
                <h3 style="margin-bottom: 1rem; color: #93c5fd;">
                    ${t.timelineTab} - ${t.eventsPerMonth}
                </h3>
                <div class="timeline-line">
                    <div class="timeline-grid" style="min-width: ${sortedMonths.length * 50}px;">
        `;
        
        sortedMonths.forEach(([month, count]) => {
            const percentage = (count / maxValue) * 100;
            const [year, monthNum] = month.split('-');
            const monthNames = t === TRANSLATIONS.en 
                ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                : ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
            const monthName = monthNames[parseInt(monthNum) - 1];
            
            html += `
                <div class="timeline-bar" style="height: ${percentage}%;" title="${count} ${t.eventsLabel}">
                    <div class="timeline-bar-value">${count}</div>
                    <div class="timeline-bar-label">${monthName} ${year}</div>
                </div>
            `;
        });
        
        html += `
                    </div>
                </div>
                <p style="margin-top: 2rem; color: rgba(255,255,255,0.6); text-align: center;">
                    ${t === TRANSLATIONS.en ? 'Total:' : 'Total:'} ${this.events.length} ${t.eventsLabel} | 
                    ${t === TRANSLATIONS.en ? 'Period:' : 'Período:'} ${sortedMonths.length} ${t === TRANSLATIONS.en ? 'months' : 'meses'}
                </p>
            </div>
        `;
        
        timelineView.innerHTML = html;
    }
    
    generateMonthlyView() {
        const monthlyView = document.getElementById('monthlyView');
        const t = TRANSLATIONS[this.language];
        
        // Group events by month
        const monthlyData = {};
        this.events.forEach(event => {
            const date = new Date(event.date);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = {
                    count: 0,
                    events: []
                };
            }
            monthlyData[monthKey].count++;
            monthlyData[monthKey].events.push(event);
        });
        
        // Sort by date (most recent first)
        const sortedMonths = Object.entries(monthlyData).sort().reverse();
        
        const monthNames = t === TRANSLATIONS.en 
            ? ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            : ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        
        let html = `
            <div style="margin-top: 1rem;">
                <h3 style="margin-bottom: 1rem; color: #93c5fd;">
                    ${t.monthlyTab} - ${t.eventsPerMonth}
                </h3>
                <div class="monthly-grid">
        `;
        
        sortedMonths.forEach(([month, data]) => {
            const [year, monthNum] = month.split('-');
            const monthName = monthNames[parseInt(monthNum) - 1];
            
            html += `
                <div class="month-card" onclick="app.filterByMonth('${month}')">
                    <div class="month-card-header">${monthName} ${year}</div>
                    <div class="month-card-value">${data.count}</div>
                    <div class="month-card-label">${data.count === 1 ? (t === TRANSLATIONS.en ? 'event' : 'evento') : t.eventsLabel}</div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
        
        monthlyView.innerHTML = html;
    }
    
    filterByMonth(monthKey) {
        // Close modal
        document.getElementById('monthlyChartsModal').classList.remove('active');
        
        // Set date filters
        const [year, month] = monthKey.split('-');
        const dateFrom = `${year}-${month}-01`;
        const lastDay = new Date(year, month, 0).getDate();
        const dateTo = `${year}-${month}-${lastDay}`;
        
        // Apply filters
        this.advancedFilters = { dateFrom, dateTo };
        this.renderGallery();
        
        // Scroll to gallery
        document.querySelector('.gallery-section').scrollIntoView({ behavior: 'smooth' });
    }

    // ============================================
    // INFORMATION MODAL
    // ============================================
    showInformation() {
        const modal = document.getElementById('infoModal');
        const content = document.getElementById('infoContent');
        const t = TRANSLATIONS[this.language];
        
        // Update title
        document.getElementById('infoModalTitle').textContent = `ℹ️ ${t.infoTitle}`;
        document.getElementById('editInfoText').textContent = t.editInfoBtn;
        
        // Use custom info if available, otherwise use default
        const infoText = this.customInfo || t.infoContent;
        
        // Format content with paragraphs
        const paragraphs = infoText.split('\n\n');
        let html = '';
        
        paragraphs.forEach((paragraph, index) => {
            if (paragraph.trim()) {
                html += `<p style="margin-bottom: 1rem; text-align: justify;">${paragraph}</p>`;
            }
        });
        
        content.innerHTML = html;
        
        // Show attached files if any
        this.renderAttachedFiles();
        
        // Make sure we're in view mode
        document.getElementById('infoViewMode').style.display = 'block';
        document.getElementById('infoEditMode').style.display = 'none';
        
        modal.classList.add('active');
    }
    
    renderAttachedFiles() {
        const section = document.getElementById('attachedFilesSection');
        const list = document.getElementById('attachedFilesList');
        const t = TRANSLATIONS[this.language];
        
        if (this.attachedFiles.length === 0) {
            section.style.display = 'none';
            return;
        }
        
        section.style.display = 'block';
        section.querySelector('h3').textContent = `📎 ${t.attachedFiles}`;
        
        list.innerHTML = '';
        this.attachedFiles.forEach((file, index) => {
            const fileItem = this.createFileItem(file, index, false);
            list.appendChild(fileItem);
        });
    }
    
    createFileItem(file, index, isEdit) {
        const t = TRANSLATIONS[this.language];
        const div = document.createElement('div');
        div.className = 'file-item';
        
        const icon = this.getFileIcon(file.name);
        const size = this.formatFileSize(file.size);
        
        div.innerHTML = `
            <div class="file-info">
                <span class="file-icon">${icon}</span>
                <div class="file-details">
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${size}</div>
                </div>
            </div>
            <div class="file-actions">
                <button class="file-btn" onclick="app.downloadFile(${index})">📥 ${t.download}</button>
                <button class="file-btn delete" onclick="app.deleteAttachedFile(${index})">🗑️ ${t.deleteFile}</button>
            </div>
        `;
        
        return div;
    }
    
    getFileIcon(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        const icons = {
            'txt': '📄',
            'doc': '📘',
            'docx': '📘',
            'xls': '📗',
            'xlsx': '📗',
            'pdf': '📕',
            'zip': '📦',
            'rar': '📦'
        };
        return icons[ext] || '📎';
    }
    
    formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
    
    enterEditMode() {
        const t = TRANSLATIONS[this.language];
        const infoText = this.customInfo || t.infoContent;
        
        // Set editor content
        document.getElementById('infoTextEditor').value = infoText;
        
        // Update button texts
        document.getElementById('cancelEditText').textContent = t.cancel;
        document.getElementById('saveEditText').textContent = t.saveChanges;
        document.getElementById('selectFilesText').textContent = t.selectFilesText;
        
        // Show current attached files in edit mode
        this.renderCurrentAttachedFiles();
        
        // Switch to edit mode
        document.getElementById('infoViewMode').style.display = 'none';
        document.getElementById('infoEditMode').style.display = 'block';
        
        // Clear pending files
        this.pendingFiles = [];
        document.getElementById('selectedFilesList').innerHTML = '';
    }
    
    exitEditMode() {
        // Switch back to view mode
        document.getElementById('infoViewMode').style.display = 'block';
        document.getElementById('infoEditMode').style.display = 'none';
        
        // Clear pending files
        this.pendingFiles = [];
    }
    
    renderCurrentAttachedFiles() {
        const container = document.getElementById('currentAttachedFiles');
        const t = TRANSLATIONS[this.language];
        
        if (this.attachedFiles.length === 0) {
            container.innerHTML = `<p style="color: rgba(255,255,255,0.6); font-size: 0.875rem;">No attached files</p>`;
            return;
        }
        
        container.innerHTML = '';
        this.attachedFiles.forEach((file, index) => {
            const fileItem = this.createFileItem(file, index, true);
            container.appendChild(fileItem);
        });
    }
    
    handleFileSelection(e) {
        const files = Array.from(e.target.files);
        this.pendingFiles = files;
        
        const list = document.getElementById('selectedFilesList');
        list.innerHTML = '';
        
        files.forEach((file, index) => {
            const div = document.createElement('div');
            div.className = 'file-item';
            div.style.marginBottom = '0.5rem';
            
            const icon = this.getFileIcon(file.name);
            const size = this.formatFileSize(file.size);
            
            div.innerHTML = `
                <div class="file-info">
                    <span class="file-icon">${icon}</span>
                    <div class="file-details">
                        <div class="file-name">${file.name}</div>
                        <div class="file-size">${size}</div>
                    </div>
                </div>
            `;
            
            list.appendChild(div);
        });
    }
    
    async saveInformation() {
        const t = TRANSLATIONS[this.language];
        const newContent = document.getElementById('infoTextEditor').value;
        
        // Save custom content
        this.customInfo = newContent;
        
        // Process pending files - Upload to Cloudinary
        if (this.pendingFiles.length > 0) {
            for (const file of this.pendingFiles) {
                console.log(`📤 Uploading file to Cloudinary: ${file.name}`);
                const fileUrl = await Utils.uploadToCloudinary(file, 'system/files');
                console.log(`✅ File uploaded to Cloudinary: ${fileUrl}`);
                
                this.attachedFiles.push({
                    name: file.name,
                    size: file.size,
                    url: fileUrl,  // URL instead of Base64
                    timestamp: Date.now()
                });
            }
            // Clear pending files
            this.pendingFiles = [];
        }
        
        // Save to Firebase
        await this.saveSystemConfigToFirebase();
        
        // Exit edit mode and refresh view
        this.exitEditMode();
        this.showInformation();
        
        // Show success message
        this.showSuccessToast(t.infoSaved);
    }
    
    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
    
    downloadFile(index) {
        const file = this.attachedFiles[index];
        if (!file) return;
        
        const link = document.createElement('a');
        // Use URL if available, otherwise use data (for backward compatibility)
        link.href = file.url || file.data;
        link.download = file.name;
        link.target = '_blank';  // Open in new tab for URLs
        link.click();
    }
    
    async deleteAttachedFile(index) {
        const t = TRANSLATIONS[this.language];
        if (!confirm(`${t.deleteFile}?`)) return;
        
        this.attachedFiles.splice(index, 1);
        
        // Save to Firebase
        await this.saveSystemConfigToFirebase();
        
        // Refresh both views
        this.renderCurrentAttachedFiles();  // Edit mode
        this.showInformation();              // View mode
        
        // Show success message
        this.showSuccessToast(t.deleteFile + ' ✅');
    }

    // ============================================
    // NORMAL MODE
    // ============================================
    showNormalMode() {
        const modal = document.getElementById('normalModeModal');
        const t = TRANSLATIONS[this.language];
        
        // Update title
        document.getElementById('normalModeTitle').textContent = `✅ ${t.normalModeTitle}`;
        document.getElementById('editNormalText').textContent = t.editInfoBtn;
        
        // Show image if exists
        const noImageText = document.getElementById('noImageText');
        const normalModeImage = document.getElementById('normalModeImage');
        const deleteNormalModeBtn = document.getElementById('deleteNormalModeBtn');
        
        if (this.normalModeImage) {
            noImageText.style.display = 'none';
            normalModeImage.src = this.normalModeImage;
            normalModeImage.style.display = 'block';
            
            // Mostrar botón de eliminar si hay imagen
            if (deleteNormalModeBtn) {
                deleteNormalModeBtn.style.display = 'inline-block';
            }
        } else {
            noImageText.textContent = t.noImageUploaded;
            noImageText.style.display = 'block';
            normalModeImage.style.display = 'none';
            
            // Ocultar botón de eliminar si no hay imagen
            if (deleteNormalModeBtn) {
                deleteNormalModeBtn.style.display = 'none';
            }
        }
        
        // Make sure we're in view mode
        document.getElementById('normalModeView').style.display = 'block';
        document.getElementById('normalModeEdit').style.display = 'none';
        
        modal.classList.add('active');
    }
    
    enterNormalModeEdit() {
        const t = TRANSLATIONS[this.language];
        
        // Update button texts
        document.getElementById('selectImageText').textContent = t.selectImage;
        document.getElementById('cancelNormalText').textContent = t.cancel;
        document.getElementById('saveNormalText').textContent = t.saveImage;
        
        // Show current image in preview if exists
        if (this.normalModeImage) {
            document.getElementById('normalModePreviewImg').src = this.normalModeImage;
            document.getElementById('normalModePreview').style.display = 'block';
        } else {
            document.getElementById('normalModePreview').style.display = 'none';
        }
        
        // Switch to edit mode
        document.getElementById('normalModeView').style.display = 'none';
        document.getElementById('normalModeEdit').style.display = 'block';
        
        // Clear pending image
        this.pendingNormalModeImage = null;
    }
    
    exitNormalModeEdit() {
        // Switch back to view mode
        document.getElementById('normalModeView').style.display = 'block';
        document.getElementById('normalModeEdit').style.display = 'none';
        
        // Clear pending image
        this.pendingNormalModeImage = null;
        document.getElementById('normalModeImageInput').value = '';
    }
    
    handleNormalModeImageSelection(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert(TRANSLATIONS[this.language].errorImageType);
            return;
        }
        
        // Validate file size (max 5MB for normal mode image)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size must be less than 5MB');
            return;
        }
        
        // Store file for later upload
        this.pendingNormalModeFile = file;
        
        // Show preview
        const reader = new FileReader();
        reader.onload = (event) => {
            document.getElementById('normalModePreviewImg').src = event.target.result;
            document.getElementById('normalModePreview').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
    
    async saveNormalModeImage() {
        const t = TRANSLATIONS[this.language];
        
        try {
            // Upload the image if there's a pending one
            if (this.pendingNormalModeFile) {
                console.log('📤 Uploading Normal Mode image to Cloudinary...');
                this.normalModeImage = await Utils.uploadToCloudinary(this.pendingNormalModeFile, 'system');
                console.log('✅ Normal Mode image uploaded to Cloudinary');
                
                // Clear pending file
                this.pendingNormalModeFile = null;
                
                // Save to Firebase
                await this.saveSystemConfigToFirebase();
            }
            
            // Exit edit mode and refresh view
            this.exitNormalModeEdit();
            this.showNormalMode();
            
            // Show success message
            this.showSuccessToast(t.normalModeSaved);
        } catch (error) {
            console.error('Error saving Normal Mode image:', error);
            alert('Error uploading image. Please try again.');
        }
    }

    async deleteNormalModeImage() {
        const t = TRANSLATIONS[this.language];
        
        // Confirmar eliminación
        if (!confirm(t === TRANSLATIONS.en ? 'Delete Normal Mode image?' : '¿Eliminar imagen de Modo Normal?')) {
            return;
        }

        try {
            // Eliminar imagen de Cloudinary si existe
            if (this.normalModeImage) {
                console.log('🗑️ Deleting Normal Mode image from Cloudinary...');
                await this.deleteImageFromCloudinary(this.normalModeImage);
            }

            // Limpiar de la aplicación
            this.normalModeImage = null;

            // Guardar en Firebase
            await this.saveSystemConfigToFirebase();

            // Actualizar vista
            this.showNormalMode();

            // Mostrar mensaje de éxito
            this.showSuccessToast(t === TRANSLATIONS.en ? 'Image deleted successfully!' : '¡Imagen eliminada exitosamente!');
        } catch (error) {
            console.error('Error deleting Normal Mode image:', error);
            alert(t === TRANSLATIONS.en ? 'Error deleting image. Please try again.' : 'Error al eliminar imagen. Intenta de nuevo.');
        }
    }

    // ============================================
    // TOAST NOTIFICATIONS
    // ============================================
    showSuccessToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast toast-success';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
}

// ============================================
// GLOBAL ZOOM FUNCTION
// ============================================
function toggleImageZoom(img) {
    if (!img) return;
    
    // Toggle zoom class
    if (img.classList.contains('zoomed')) {
        img.classList.remove('zoomed');
        img.style.cursor = 'zoom-in';
    } else {
        // Remove zoom from other images first
        document.querySelectorAll('.image-modal-content img.zoomed').forEach(otherImg => {
            otherImg.classList.remove('zoomed');
            otherImg.style.cursor = 'zoom-in';
        });
        
        // Add zoom to this image
        img.classList.add('zoomed');
        img.style.cursor = 'zoom-out';
        
        // Scroll to image smoothly
        img.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// ============================================
// INITIALIZE APPLICATION
// ============================================
let app; // Global variable for onclick handlers

document.addEventListener('DOMContentLoaded', () => {
    app = new VRSS2App();
    app.init();
});
