import React, { useState, useEffect } from "react";

const categories = ["Entrée", "Plat", "Dessert", "Boisson"];

const RecipeForm = ({ onSubmit, onCancel, recipeToEdit }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [ingredients, setIngredients] = useState([""]);
  const [difficulty, setDifficulty] = useState(1);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (recipeToEdit) {
      setName(recipeToEdit.name);
      setCategory(recipeToEdit.category);
      setIngredients(recipeToEdit.ingredients);
      setDifficulty(recipeToEdit.difficulty);
      setDescription(recipeToEdit.description);
      setImage(recipeToEdit.image);
    }
  }, [recipeToEdit]);

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => setIngredients([...ingredients, ""]);
  const handleRemoveIngredient = (index) => setIngredients(ingredients.filter((_, i) => i !== index));
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) { alert("Le nom est obligatoire !"); return; }

    const recipeData = {
      id: recipeToEdit ? recipeToEdit.id : Date.now(),
      name, category, ingredients, difficulty, description, image: image || "https://via.placeholder.com/300"
    };
    onSubmit(recipeData);
    if (!recipeToEdit) {
      setName(""); setCategory(categories[0]); setIngredients([""]); setDifficulty(1); setDescription(""); setImage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>{recipeToEdit ? "Modifier la recette" : "Ajouter une recette"}</h2>

      <label>Nom de la recette :
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} />
      </label>

      <label>Catégorie de recette:
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.input}>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </label>

      <label>Ingrédients :</label>
      {ingredients.map((ing, index) => (
        <div key={index} style={styles.ingredientRow}>
          <input type="text" value={ing} onChange={(e) => handleIngredientChange(index, e.target.value)} style={{ flex: 1 }} />
          <button type="button" onClick={() => handleRemoveIngredient(index)} style={styles.smallButton}>Supprimer</button>
        </div>
      ))}
      <button type="button" onClick={handleAddIngredient} style={styles.button}>Ajouter un ingrédient</button>

      <label>Difficulté (1-5) :
        <input type="number" min="1" max="5" value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))} style={styles.input} />
      </label>

      <label>Description :
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ ...styles.input, height: "80px" }} />
      </label>

      <label>Image :
        <input type="file" onChange={handleImageChange} style={styles.input} />
      </label>

      <div style={styles.buttonRow}>
        <button type="submit" style={styles.button}>{recipeToEdit ? "Enregistrer" : "Ajouter"}</button>
        <button type="button" onClick={onCancel} style={styles.buttonCancel}>Annuler</button>
      </div>
    </form>
  );
};

const styles = {
  form: { border: "1px solid #ddd", padding: "16px", borderRadius: "8px", maxWidth: "400px", margin: "16px auto", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" },
  input: { display: "block", width: "100%", padding: "8px", margin: "8px 0 16px", borderRadius: "4px", border: "1px solid #ccc" },
  ingredientRow: { display: "flex", alignItems: "center", marginBottom: "8px", gap: "8px" },
  smallButton: { padding: "6px 10px", backgroundColor: "pink", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
  button: { padding: "8px 16px", marginTop: "8px", backgroundColor: "purple", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
  buttonCancel: { padding: "8px 16px", marginTop: "8px", marginLeft: "8px", backgroundColor: "#9e9e9e", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
  buttonRow: { display: "flex", justifyContent: "flex-start" }
};

export default RecipeForm;
