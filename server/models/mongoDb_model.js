const { Schema , model } = require('mongoose');


const offerSchema = new Schema({
    mail: {
        type: String,
        default: ''
    },
    info: {
        type: Object,
        default: []
    },
}, {
    versionKey: false
})

const Offer = model('Offer', offerSchema);


module.exports = Offer
