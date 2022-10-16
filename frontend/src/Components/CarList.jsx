import { useState, useEffect } from "react";
import axios from 'axios';
import { CarForm } from "./CarForm";

const Car = ({car : {model, price, color, imageUrl}}) => {
    return (
        <tr>
            <td className="row-item">{model?.name}</td>
            <td className="row-item">{model?.year}</td>
            <td className="row-item">{color}</td>
            <td className="row-item">{price}</td>
            <td className="row-item"><img height="100" src={imageUrl} alt={model?.name}/></td>
        </tr>
    );
}

export const CarList = () => {
    // Initializes to an array rather than undefined
    const [carList, setCarList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9000/car')
            .then(res => {setCarList(res.data); console.log(res.data) })
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <CarForm setCarList={setCarList} />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Year</th>
                        <th>Color</th>
                        <th>Price</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {carList.map(car => <Car key={car._id} car={car}/>)}
                </tbody>
            </table>
        </>
    );
}