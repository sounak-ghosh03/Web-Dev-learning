import express from "express";

const app = express();

app.get("/api/products", (req, res) => {
    if (req.query.search) {
        const filteredProducts = products.filter((product) =>
            product.name.includes(req.query.search)
        );
        res.send(filteredProducts);
        return;
    }
    setTimeout(() => {
        res.json([
            { id: 1, name: "Product 1" },
            { id: 2, name: "Product 2" },
            { id: 3, name: "Product 3" },
        ]);
    }, 3000);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
