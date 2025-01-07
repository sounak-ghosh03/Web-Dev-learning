import { useEffect, useState } from "react";

// function useCurrencyInfo(currency) {
//     const [data, setData] = useState({});
//     useEffect(() => {
//         fetch(
//             `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
//         )
//             .then((res) => res.json())
//             .then((res) => setData(res[currency]));
//     }, [currency]);
//     return data;
// }
// export default useCurrencyInfo;

function useCurrencyInfo(baseCurrency) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://www.floatrates.com/daily/${baseCurrency}.json`
                );
                if (!response.ok) {
                    throw new Error(
                        `Error fetching data: ${response.statusText}`
                    );
                }
                const result = await response.json();

                const formattedData = {};
                for (const [key, value] of Object.entries(result)) {
                    formattedData[key.toUpperCase()] = value.rate;
                }
                setData(formattedData);
            } catch (error) {
                console.error("Error fetching currency data:", error);
            }
        };

        fetchData();
    }, [baseCurrency]);

    return data;
}

export default useCurrencyInfo;
