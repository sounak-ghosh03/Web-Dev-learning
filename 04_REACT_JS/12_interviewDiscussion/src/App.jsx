import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect } from "react";

function App() {
    console.log("App rendered", Math.random());
    const [value, setValue] = useState({
        value: 0,
    });

    //const [multipliedValue, setMultipliedValue] = useState(1)
    //let multipliedValue = value * 5

    // const multiplybyfive = () => {
    //   setMultipliedValue(value * 5)    // this functionality can be done by simple variable because react mounts all the updated components as a whole in the page
    //   setValue(value + 1)
    // }

    const clickMe = () => {
        setValue({
            value: 0,     // state rerenders only when the value is changed but {} is a non-primitive data type so it passes different value everytime and rerenders the whole component
        });
    };

    return (
        <>
            <h1>Main value: {value.value} </h1>
            <button onClick={clickMe}>Click to multiply by 5</button>
            {/* <button onClick={multiplybyfive}>Click to multiply by 5</button> */}
            {/* <h2>Multiplied value: {multipliedValue} </h2> */}
        </>
    );
}

export default App;
