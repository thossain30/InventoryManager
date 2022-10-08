import { useState } from "react";
import axios from "axios"

const modelTypes = [
    <option>Please select a model</option>,
    <option>Avalon</option>,
    <option>Camry</option>,
    <option>Corolla</option>,
    <option>Prius</option>,
    <option>Yaris</option>,
    <option>86</option>,
    <option>Sienna</option>,
    <option>C-HR</option>,
    <option>RAV4</option>,
    <option>Highlander</option>,
    <option>4Runner</option>,
    <option>Tacoma</option>,
    <option>Tundra</option>,
];

export const CarForm = ({setCarList}) => {
    const [carData, setCarData] = useState({
        modelName: '',
        modelYear: null,
        carPrice: null,
        carColor: '',
        imageURL: null
    });
}

const handleClear = () => {
    setCarData({
        modelName: '',
        modelYear: null,
        carPrice: null,
        carColor: '',
        imageURL: null
    });
}

const handleSubmit = async (event) => {
    event.preventDefault(); // This will prevent page refresh
    try {
        const res = await axios.post('http://localhost:9000/car', {
            model: {
                name: carData.modelName,
                year: carData.modelYear
            },
            price: carPrice,
            color: carColor,
            imageURl: carData.imageURL
        });
        console.log('NEW CAR!');
        console.log(res.data);

        setCarList(carList => [...carList, res.data]);

        event.target.reset();
        handleClear();
    } catch (err) {
        console.error(err);
    }
}

return (
    <form onSubmit={handleSubmit}>
        <div>
            <div>
                <label htmlFor="model-name"> Model Name: </label>
                <select id="model-name" onChange={e => setPokemonData({...carData, modelName: e.target.value})}>
                        {modelTypes}
                </select>
            </div>
        </div>
    </form>
)