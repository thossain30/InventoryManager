const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    model: {
        name: String,
        year: {
            type: Number,
            validate: [y => y <= new Date().getFullYear() + 2 && y >= 1983, `Car must be from at least 1983 and from no later than ${new Date().getFullYear() + 2}.`]
        },
    },
    price: Number, 
    color: String,
    imageUrl: String
});

const Car = mongoose.model('Car', carSchema, 'Car');
module.exports = Car;