import { useState } from "react";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
                <AddTodo/>
                <Todos/>
        </>
       
    );
}

export default App;
