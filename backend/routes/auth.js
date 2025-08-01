const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth'); // ⬅️ Import auth middleware

router.post('/register', authController.register);
router.post('/login', authController.login);

// 👇 Add this route
router.get('/users', authMiddleware, authController.listUsers);

module.exports = router;
