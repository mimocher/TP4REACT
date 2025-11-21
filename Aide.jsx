import React from "react";

const Aide = () => (
  <div style={styles.container}>
    <h2> Aide Rapide</h2>
    <section style={styles.section}><h3>Ajouter une recette</h3><p>Remplir le formulaire et cliquer sur "Ajouter".</p></section>
    <section style={styles.section}><h3>Pagination</h3><p>Navigation entre les pages avec les boutons.</p></section>
  </div>
);

const styles = { container: { maxWidth: "600px", margin: "20px auto", padding: "16px", border: "1px solid pink", borderRadius: "8px", boxShadow: "0 2px 5px pink", backgroundColor: "pink" }, section: { marginBottom: "16px" } };

export default Aide;