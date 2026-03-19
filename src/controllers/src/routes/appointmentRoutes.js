const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { criar, listar, cancelar } = require('../controllers/appointmentController');

router.post('/', auth, criar);
router.get('/', auth, listar);
router.patch('/:id/cancelar', auth, cancelar);

module.exports = router;