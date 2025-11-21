import React, { useState } from "react";

const categories = ["Toutes", "Entrée", "Plat", "Dessert", "Boisson"];

const RecipeFilter = ({ onFilter }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Toutes");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onFilter(value, category);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    onFilter(search, value);
  };

  return (
    <div style={styles.container}>
      <input type="text" placeholder="Rechercher par nom..." value={search} onChange={handleSearchChange} style={styles.input} />
      <select value={category} onChange={handleCategoryChange} style={styles.select}>
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>
    </div>
  );
};

const styles = {
  container: { display: "flex", gap: "16px", alignItems: "center", margin: "16px 0", justifyContent: "center" },
  input: { padding: "8px", width: "200px", borderRadius: "4px", border: "1px solid #ccc" },
  select: { padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }
};

export default RecipeFilter;