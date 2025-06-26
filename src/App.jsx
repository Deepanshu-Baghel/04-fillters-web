import React, { useState, useEffect } from "react";

const App = () => {
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState([]);
  const [sort, setSort] = useState("");

  const fetchProduct = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setProduct(data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // Filter products based on search input (case insensitive)
  const filteredProducts = product.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  // Sort products based on price
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "low") {
      return a.price - b.price;
    } else if (sort === "high") {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  return (
    <div
      style={{
        padding: "20px",
        margin: "20px",
        border: "1px solid black",
        borderRadius: "10px",
        fontFamily: "Arial",
        fontSize: "20px",
        backgroundColor: "#f0f0f0",
      }}
    >
      <h2>Product List</h2>
      <div>
        <input
          type="text"
          placeholder="Search.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            width: "300px",
            fontSize: "16px",
            marginBottom: "20px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        {sortedProducts.length > 0 ? (
          sortedProducts.map((item) => (
            <li
              key={item.id}
              style={{
                padding: "10px",
                marginBottom: "10px",
                backgroundColor: "white",
                borderRadius: "5px",
                boxShadow: "0 0 5px rgba(0,0,0,0.1)",
              }}
            >
              <div><strong>{item.title}</strong></div>
              <div>Price: ${item.price.toFixed(2)}</div>
              <div>Rating: {item.rating && item.rating.rate ? item.rating.rate : "N/A"}</div>
            </li>
          ))
        ) : (
          <li>No products found.</li>
        )}
      </ul>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        style={{
          padding: "8px",
          width: "300px",
          fontSize: "16px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      >
        <option value="">Sort by price</option>
        <option value="low">Low to high</option>
        <option value="high">High to low</option>
      </select>
    </div>
  );
};

export default App;
