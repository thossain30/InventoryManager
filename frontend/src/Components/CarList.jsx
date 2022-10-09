import { useState, useEffect } from "react";
import axios from 'axios';
import { CarForm } from "./CarForm";

const Car = ({car : {model, price, color, imageUrl}}) => {
    return (
        <tr>
            <td className="row-item">{model?.name}</td>
            <td className="row-item">{model?.year}</td>
        </tr>
    )
}