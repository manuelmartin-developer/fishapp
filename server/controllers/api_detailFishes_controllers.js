
const Fish = require('../models/sql_detailFish_model');
/* const bcrypt = require('bcrypt'); */


const fish_controller = {


    getFishDetails: async (req, res) => {
        try {
            const response = await Fish.getFishes()
            res.status(200).json(response);
            
        } catch (err) {

            console.log(err)

            res.status(400).json({
                error: error.message
            
            });
        }
    },


    getOneFishDetail: async (req, res) => {

        const oneProfile = await Fish.getOneFishDetail(req.body.email); 

        res.status(200).json(oneProfile)

    },
};

module.exports = fish_controller;