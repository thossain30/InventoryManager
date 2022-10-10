const router = require('express').Router();
const { findAllCars, findCarById, createCar, updateCar, deleteCarById } = require('../Controllers/car.controller');
const mongoose = require('mongoose');

// Validate ObjectId middleware
const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(204).send(); // Send back the response early
    } else {
        next(); // This calls the standard route for GET/POST/PUT/DELETE with (req, res)
    }
}

// GET ALL CARS
router.get('/', async (req, res) => {
    const car = await findAllCars();
    res.json(car);
});

// GET CAR BY ID
router.get('/:id', validateObjectId, async (req, res) => {
    // req.params.id extracts the id number from the URL
    try {
        const car = await findCarById(req.params.id);
        res.json(car);
    } catch (err) {
        // Rejected Promise AKA no Car found
        console.log(err);
        res.status(err?.status ?? 500).json(err);
    }
});

// POST 
// CREATE A CAR
router.post('/', async (req, res) => {
    try {
        // For POST requests, we send the data through the request body
        const car = await createCar(req.body);
        res.status(201).json(car);
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

// UPDATE A CAR
router.put('/:id', validateObjectId, async (req, res) => {
    try {
        // For PUT requests, the data to update comes through the request body as well
        await updateCar(req.params.id, req.body);
        res.send();
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

// DELETE A CAR
router.delete('/:id', validateObjectId, async (req, res) => {
    try {
        await deleteCarById(req.params.id);
        res.send(); // 200 OK is good
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

module.exports = router;