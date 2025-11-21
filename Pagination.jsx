import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div style={styles.container}>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} style={styles.button}>Précédent</button>
      {pages.map(page => (
        <button key={page} onClick={() => onPageChange(page)} style={{ ...styles.button, fontWeight: page === currentPage ? "bold" : "normal", backgroundColor: page === currentPage ? "#4CAF50" : "#f0f0f0", color: page === currentPage ? "white" : "black" }}>{page}</button>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} style={styles.button}>Suivant</button>
    </div>
  );
};

const styles = { container: { display: "flex", gap: "8px", justifyContent: "center", margin: "16px 0" }, button: { padding: "6px 12px", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" } };

export default Pagination;