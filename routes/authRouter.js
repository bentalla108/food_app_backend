const router = require('express').Router();
const authController = require('../controllers/authController');

/**
 * POST /api/auth/login
 * Route pour l'authentification d'un utilisateur.
 * Utilise la fonction loginUser du contrôleur d'authentification.
 */
router.post('/login', authController.loginUser);

/**
 * POST /api/auth/register
 * Route pour l'enregistrement d'un nouvel utilisateur.
 * Utilise la fonction createUser du contrôleur d'authentification.
 */
router.post('/register', authController.createUser);

// Exportation du routeur pour le rendre disponible pour d'autres parties de l'application.
module.exports = router;
