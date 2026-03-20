const express = require('express');
const router = express.Router();
const { criar, listar, cancelar } = require('../controllers/appointmentController');
require('../controllers/appointmentController');
const auth = require('../middleware/auth');

router.post('/', auth, criar);
router.get('/', auth, listar);
router.delete('/:id', auth, cancelar);

module.exports = router;
