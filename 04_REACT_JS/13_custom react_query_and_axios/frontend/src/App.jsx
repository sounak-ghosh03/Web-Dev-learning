import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
    const [products, error, loading] = customReactQuery("/api/products");

    if (error) {
        return <h2>Something went wrong</h2>;
    }
    if (loading) {
        return <h2>Loading...</h2>;
    }
    return (
        <>
            <h2>Number of products: {products.length}</h2>
        </>
    );
}

export default App;

const customReactQuery = (urlpath) => {
    const[products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // ()()-->IIFE-->Immediately Invoked Function Expression
        (async () => {
            try {
                setError(false);
                const response = await axios.get(urlpath);
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        })();
    }, []);

    return [products, error, loading];
};
