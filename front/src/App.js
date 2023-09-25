import React from "react";
import { Routes, Route } from "react-router-dom";
import Ajouter from "./Ajouter";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Ajouter />} />
      </Routes>
    </>
  );
}

export default App;