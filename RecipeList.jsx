import React from "react";
import RecipeItem from "./RecipeItem";

const RecipeList = ({ recipes, onEdit, onDuplicate, onDelete }) => {
  return (
    <div style={styles.container}>
      {recipes.map((recipe) => (
        <RecipeItem
          key={recipe.id}
          recipe={recipe}
          onEdit={onEdit}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

const styles = {
  container: { display: "flex", flexWrap: "wrap", justifyContent: "center" }
};

export default RecipeList;
