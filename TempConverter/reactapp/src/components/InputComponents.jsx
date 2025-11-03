import React, { useContext } from 'react'
import { TemperatureContext } from '../contexts/context'

function InputComponents() {
    const {celsiusToFahrenheit, fahrenheitToCelsius, fahrenheit,  celsius} = useContext(TemperatureContext)
  return (
    <div style={{display: 'flex', flexDirection:'column'}}>

        <label htmlFor="celsius">Enter Celsius:</label>
        <input type="number" placeholder='Enter the celsius value' id='celsius' value={celsius} onChange={(e)=> celsiusToFahrenheit(e.target.value)}/>

        <label htmlFor="fahrenheit">Enter Fahrenheit:</label>
        <input type="number" placeholder='Enter the Fahrenheit value' id='fahrenheit' value={fahrenheit} onChange={(e)=> fahrenheitToCelsius(e.target.value)}/>
        <div>
            {celsius ===0 || celsius <0 ? <p style={{color:'red'}}><b>Water will freeze at this point {celsius}°</b></p> : <></>}
        </div>
    </div>
  )
}

export default InputComponents