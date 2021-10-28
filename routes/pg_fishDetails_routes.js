const router = require('express').Router();
const apiFish = require('../controllers/api_detailFishes_controllers')


//Ruta para postear nombre del pez proporcionado de la API de data y devolución de la información: 
router.post('/details', apiFish.getOneFishDetail);
router.post('/diagnosis', apiFish.getDiagnosis);
router.get('/names', apiFish.getNames);

module.exports = router;