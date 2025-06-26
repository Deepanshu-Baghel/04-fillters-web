import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState([]);
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");

  const fetchProduct = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setProduct(data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // Extract unique categories from product data
  const categories = Array.from(new Set(product.map((item) => item.category)));

  // Filter products based on search input (case insensitive) and category
  const filteredProducts = product.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? item.category === category : true;
    return matchesSearch && matchesCategory;
  });

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
    <div className="container">
      <h2>Product List</h2>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="sort-select"
      >
        <option value="">Sort by price</option>
        <option value="low">Low to high</option>
        <option value="high">High to low</option>
      </select>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="category-select"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <div>
        <input
          type="text"
          placeholder="Search.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>
      <ul className="product-list">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((item) => (
            <li key={item.id} className="product-item">
              <div className="product-title">{item.title}</div>
              <div className="product-price">Price: ${item.price.toFixed(2)}</div>
              <div className="product-rating">
                Rating: {item.rating && item.rating.rate ? item.rating.rate : "N/A"}
              </div>
            </li>
          ))
        ) : (
          <li>No products found.</li>
        )}
      </ul>
    </div>
  );
};

export default App;
