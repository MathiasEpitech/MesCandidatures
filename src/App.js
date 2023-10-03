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
        <Route path = "/" element={<Home />} />
        <Route path="/ajouter" element={<Ajouter />} />
        <Route path="/candidatures/:_id" element={<CandidatureDetail />} />
        <Route path="/candidatures/modifier/:_id" element={<Modifier />} />
        <Route path="/ajouter_suivi" element={<AjouterSuivi />} />
      </Routes>
    </>
  );
}

export default App;