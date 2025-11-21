

import React, { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import RecipeForm from "./RecipeForm";
import RecipeFilter from "./RecipeFilter";
import Pagination from "./Pagination";
import Aide from "./Aide";
const initialRecipes = [
  {
    id: 1,
    image: "",
    name: "Lasagne Bolognaise",
    category: "Plat",
    ingredients: ["Creme liquide", "Viande hachée", "Tomate", "Oignon"],
    difficulty: 2,
    description: "Un classique de la cuisine italienne."
  },
   {
    id: 3,
    image: "https://via.placeholder.com/300",
    name: "Cheesecake chocolat",
    category: "Dessert",
    ingredients: ["Biscuit", "Beure", "Sucre brun", "Beurre","Chocolat", "Vanille"],
    difficulty: 3,
    description: "Tarte sucrée classique."
  },
  {
    id: 2,
    image: "https://via.placeholder.com/300",
    name: "Salade César",
    category: "Entrée",
    ingredients: ["Laitue", "Poulet", "Parmesan", "Croûtons"],
    difficulty: 1,
    description: "Salade fraîche et délicieuse."
  },
 
];

const recipesPerPage = 2; 

const MainPage = () => {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [filteredRecipes, setFilteredRecipes] = useState(initialRecipes);
  const [showForm, setShowForm] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilter = (search, category) => {
    let filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(search.toLowerCase())
    );
    if (category !== "Toutes") {
      filtered = filtered.filter((recipe) => recipe.category === category);
    }
    setFilteredRecipes(filtered);
    setCurrentPage(1);
  };

  const handleFormSubmit = (recipe) => {
    if (recipeToEdit) {
      setRecipes(recipes.map((r) => (r.id === recipe.id ? recipe : r)));
      setRecipeToEdit(null);
    } else {
      setRecipes([recipe, ...recipes]);
    }
    setShowForm(false);
  };


  const handleDelete = (id) => {
    setRecipes(recipes.filter((r) => r.id !== id));
  };

  const handleDuplicate = (recipe) => {
    const newRecipe = { ...recipe, id: Date.now() };
    setRecipes([newRecipe, ...recipes]);
  };

 
  const handleEdit = (recipe) => {
    setRecipeToEdit(recipe);
    setShowForm(true);
  };

  
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  const currentRecipes = filteredRecipes.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage
  );

  useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}> 🧑‍🍳Creative Recipe Builder</h1>

      <RecipeFilter onFilter={handleFilter} />


      <button
        onClick={() => {
          setRecipeToEdit(null);
          setShowForm(!showForm);
        }}
        style={styles.buttonAdd}
      >
        Créer une nouvelle recette par ici
      </button>

      {showForm && (
        <RecipeForm
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
          recipeToEdit={recipeToEdit}
        />
      )}

    
      <RecipeList
        recipes={currentRecipes}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDuplicate={handleDuplicate}
      />

    
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

     
      <Aide />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "16px"
  },
  title: {
    textAlign: "center",
    marginBottom: "16px"
  },
  buttonAdd: {
    padding: "10px 20px",
    backgroundColor: "purple",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "16px"
  }
};

export default MainPage;
