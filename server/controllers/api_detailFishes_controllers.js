const { getDetailsFromDB, getDiagnosisFromDB, getAllNames } = require('../models/sql_detailFish_model');

const fish_controller = {

    getOneFishDetail: async (req, res) => {

        try {
            const name = await req.body.name;
            const details = await getDetailsFromDB(name);
            res.status(200).json(details);

        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    },
    getDiagnosis: async (req, res) => {
        try {
            const name = await req.body.name;
            const diagnosis = await getDiagnosisFromDB(name);
            res.status(200).json(diagnosis);

        } catch (err) {
            res.status(400).json({
                error: error.message
            });
        }
    },
    getNames: async (req, res) => {
        try {
            
            const names = await getAllNames();
            res.status(200).json(names);

        } catch (err) {
            res.status(400).json({
                error: error.message
            });
        }
    },
};

module.exports = fish_controller;