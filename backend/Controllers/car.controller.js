const Car = require('../Models/Car.model');

const findAllCars = async () => await Car.find(); // This returns all Cars

const findCarById = async id => {
    try {
        // You might think not finding it returns a rejected Promise
        const car = await Car.findById(id);
        // If it doesn't find anything, it returns null
        if (car == null) {
            throw {status: 204, msg: `No Car with the id ${id} was found.`};
        }
        return car; // This returns the car if we found it
    } catch (err) {
        // Car was not found
        throw err; // Rethrow to have a rejected promise
    }
};

const createCar = async carToSave => {
    try {
        // We'll use the model and create a new instance of it
        // This alone does not save the entity
        const car = new Car(carToSave); // This runs all of my validation logic
        await car.save(); // Take the instance and save it
        return car;
    } catch (err) {
        throw err;
    }
}

const updateCar = async (id, carToUpdate) => {
    try {
        await Car.findByIdAndUpdate(id, carToUpdate);
    } catch (err) {
        throw { status: 400, msg: err };
    }
}

const deleteCarById = async id => await Car.findByIdAndDelete(id);

module.exports = { findAllCars, findCarById, createCar, updateCar, deleteCarById }; 