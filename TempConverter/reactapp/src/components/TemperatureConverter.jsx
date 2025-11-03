import React, {  useState } from 'react'
import InputComponents from './InputComponents'
import { TemperatureContext } from '../contexts/context'

function TemperatureConverter() {

    const [fahrenheit, setFahrenheit] = useState(32);
    const [celsius, setCelsius] = useState(0);


    const celsiusToFahrenheit = (celsiusValue) => {
        const floatValue = parseFloat(celsiusValue)
        setCelsius(floatValue)
        const fahrenheitValue = (floatValue * 9 / 5) + 32;
        setFahrenheit(fahrenheitValue.toFixed(2))

    }


    const fahrenheitToCelsius = (fahrenheitValue) => {
        const floatValue = parseFloat(fahrenheitValue)
        setFahrenheit(floatValue);
        const celsiusValue = (floatValue - 32) * 5 / 9;
        setCelsius(celsiusValue.toFixed(2))

    }

    return (
        <div>
            <h1>Temperature Converter</h1>
            <TemperatureContext.Provider value={{ celsiusToFahrenheit, fahrenheitToCelsius, fahrenheit, celsius }}>
                <InputComponents />
            </TemperatureContext.Provider>
        </div>
    )
}

export default TemperatureConverter