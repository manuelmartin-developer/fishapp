const router = require('express').Router();
const express = require('express');
const {
    getAllFishes,
    getFishById, 
    postNewFish
} = require("../controllers/api_fishes_controllers"); 



//ENDPOINTS USUARIOS LOGGEADOS
router.get('/', getAllFishes); 
router.get('/:id', getFishById);

router.post('postfish', postNewFish)





module.exports = router