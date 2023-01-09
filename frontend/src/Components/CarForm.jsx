import { useState } from "react";
import axios from "axios"
import Button from "@mui/material/Button"
import { FormControl, InputLabel, TextField } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {MenuItem} from "@mui/material";
import { Box } from "@mui/system";

const modelTypes = [
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
        modelName: "",
        modelYear: null,
        carPrice: null,
        carColor: "",
        imageURL: null
    });

    const handleClear = () => {
        setCarData({
            modelName: "",
            modelYear: null,
            carPrice: null,
            carColor: "",
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
        <form onSubmit={handleSubmit} className="car-form">
            <div>
                <div className="Two-items">
                    <FormControl style={{minWidth: 150}}>
                    <InputLabel>Model Types</InputLabel>
                    <Select
                        labelId="model-name"
                        label="Model Type"
                        value={carData.modelName}
                        defaultValue={"Select a Model"}
                        onChange={e => setCarData({...carData, modelName: e.target.value})} 
                    >
                        {modelTypes.map((element) => {
                            return (
                                <MenuItem value={element.props.children} key={element.props.children}>
                                    {element.props.children}
                                </MenuItem>
                            );
                        })}
                    </Select>
                    </FormControl>
                </div>
                <div>
                    <TextField
                        label="Model Year"
                        variant="filled"
                        id="model-year"
                        value={carData.modelYear}
                        onChange={e => setCarData({...carData, modelYear: e.target.value})}
                        placeholder="0"
                    />
                </div>
            </div>
            <div>
                <div>
                    <TextField 
                        label="Car Price (in $)"
                        variant="filled"
                        id="car-price"
                        value={carData.carPrice}
                        onChange={e => setCarData({...carData, carPrice: e.target.value})}
                    />
                </div>
            </div>
            <div>
                <div>
                    <div>
                        <FormControl style={{minWidth: 150}}>
                        <InputLabel>Car Color</InputLabel>
                        <Select
                            labelId="car-color"
                            label="Car Color"
                            value={carData.carColor}
                            defaultValue={"Select a Color"}
                            onChange={e => setCarData({...carData, carColor: e.target.value})} 
                        >
                            {colors.map((element) => {
                                return (
                                    <MenuItem value={element.props.children} key={element.props.children}>
                                        {element.props.children}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
            <div>
                <FormControl style={{minWidth: 400}}>
                <TextField 
                    label="Image URL"
                    variant="filled"
                    id="car-price"
                    value={carData.carPrice}
                    onChange={e => setCarData({...carData, carPrice: e.target.value})}
                />
                </FormControl>
                {/* <div>
                    <label htmlFor="image-url">Image URL: </label>
                    <input id="image-url" value={carData.imageUrl} onChange={e => setCarData({...carData, imageURL: e.target.value})}/>
                </div> */}
            </div>

            <div>
                <Button variant="outlined" sx={{mr: 4}} type="reset" onClick={handleClear}>Clear</Button>
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </div>
        </form>
    )
}