import React from "react";
import { Routes, Route } from "react-router-dom";
import Ajouter from "./Ajouter";
import Home from "./Home";
import CandidatureDetail from "./CandidatureDetail";
import Modifier from "./Modifier";
import AjouterSuivi from "./AjouterUnSuivi";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="https://luxury-lokum-003c78.netlify.app/ajouter" element={<Ajouter />} />
        <Route path="https://luxury-lokum-003c78.netlify.app/candidatures/:_id" element={<CandidatureDetail />} />
        <Route path="https://luxury-lokum-003c78.netlify.app/candidatures/modifier/:_id" element={<Modifier />} />
        <Route path="https://luxury-lokum-003c78.netlify.app/ajouter_suivi" element={<AjouterSuivi />} />
      </Routes>
    </>
  );
}

export default App;