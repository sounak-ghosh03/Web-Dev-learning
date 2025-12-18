import "./App.css";
import { ChaiCard } from "./components/ChaiCard.tsx";
import { Counter } from "./components/Counter.tsx";

function App() {
    return (
        <>
            <div>
                <h1>Vite + React</h1>
                <ChaiCard name="Masala Chai" price={25} />
                <ChaiCard name="Adrak Chai" price={20} />
            </div>
            <div>
                <Counter />
            </div>
        </>
    );
}

export default App;
