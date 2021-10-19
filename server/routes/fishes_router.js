const router = require('express').Router();
const express = require('express');
const {
    getAllFishes,
    getFishById, 
} = require("../controllers/api_fishes_controllers"); 


//GET all fishes from db
//GET /api/fishes
// Public
router.get('/', getAllFishes); 


//GET all fishes by Id from db
//GET /api/fishes/:id
// Public
router.get('/:id', getFishById);