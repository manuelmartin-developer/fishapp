
//DATABASE MONGO DB PARA LAS ESPECIES DE PECES POR PARTE DE USUARIOS REGISTRADOS
const Fish = require('../models/mongoDb_model');


//Para todos los Peces
const getAllFishes = async (req, res) => {
    try {
        const fishes = await Fish.find({}); 
        res.json(fishes); 
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server Error"}); 
    }
}

//Para un pez en particular
const getFishById = async (req, res) => {

    try {

        let oneFish = await req.params.id
        const fishes = await Fish.findById(oneFish); 
        res.json(fishes); 
        console.log(fishes)

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server Error"}); 
    }
}

//Para que el usuario registre en el database sus peces
const postNewFish = async (req, res) => {
    const newFish = new Fish ({
        mail: req.body.mail,
        info: req.body.info,
        
    })
    const addNewFish = await newFish.save()

    res.status(302).redirect('/postfish')
}


module.exports = {
    getAllFishes,
    getFishById,
    postNewFish
}