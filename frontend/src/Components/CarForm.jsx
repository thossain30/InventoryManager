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

const colors = [
    <option>Pick a Color</option>,
    <option>Classic Silver Metallic</option>,
    <option>Magnetic Gray Metallic</option>,
    <option>Supersonic Red</option>,
    <option>Ruby Flare Pearl</option>,
    <option>Blue Streak Metallic</option>,
    <option>Midnight Black Metallic</option>,
    <option>Blizzard Pearl</option>,
];

export const CarForm = ({setCarList}) => {
    const [carData, setCarData] = useState({
        modelName: '',
        modelYear: null,
        carPrice: null,
        carColor: '',
        imageURL: null
    });

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
                price: carData.carPrice,
                color: carData.carColor,
                imageURL: carData.imageURL
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
                    <select id="model-name" onChange={e => setCarData({...carData, modelName: e.target.value})}>
                            {modelTypes}
                    </select>
                </div>
                <div>
                    <label htmlFor="model-year"> Model Year: </label>
                    <input 
                        id="model-year"
                        value={carData.modelYear}
                        onChange={e => setCarData({...carData, modelYear: e.target.value})}
                        placeholder="Model Year"
                    />
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="car-price"> Car Price (in $): </label>
                    <input 
                        id="car-price"
                        value={carData.carPrice}
                        onChange={e => setCarData({...carData, carPrice: e.target.value})}
                        placeholder="Model Year"
                    />
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="car-color"> Car Color: </label>
                    <select id="car-color" onChange={e => setCarData({...carData, carColor: e.target.value})}>
                            {colors}
                    </select>
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="image-url">Image URL: </label>
                    <input id="image-url" value={carData.imageUrl} onChange={e => setCarData({...carData, imageURL: e.target.value})}/>
                </div>
            </div>

            <div>
                <button type="reset" onClick={handleClear}>Clear</button>
                <button>Submit</button>
            </div>
        </form>
    )
}