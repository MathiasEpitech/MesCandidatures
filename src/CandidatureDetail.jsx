import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function CandidatureDetail() {
  const { _id } = useParams(); // Utilisez _id au lieu de id

  const [candidature, setCandidature] = useState(null);

  useEffect(() => {
    // Utilisez une requête axios pour récupérer les détails de la candidature par ID
    axios.get(`https://mescandidaturesback-production.up.railway.app/api/candidatures/${_id}`)
      .then((response) => {
        setCandidature(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
        // Gérez les erreurs de requête ici, par exemple en affichant un message d'erreur
      });
  }, [_id]);

  if (!candidature) {
    return (
      <>
        <Navbar />
        <div className="container py-4">
          <h1>Candidature non trouvée</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container py-4">
      <div className="detail_candidature">
            <h2 className="text-center py-3">Detaile de la Candidature</h2>
        <ul>
          <li>
            <strong>Nom de l'entreprise :</strong> {candidature.nomEntreprise}
          </li>
          <li>
            <strong>Intitulé du Poste :</strong> {candidature.intitulePoste}
          </li>
          <li>
            <strong>Coordonnées :</strong> {candidature.coordonnees}
          </li>
          <li>
            <strong>Provenance de l'Annonce :</strong> {candidature.provenanceAnnonce}
          </li>
          <li>
            <strong>Description du Poste :</strong> {candidature.descriptionPoste}
          </li>
          <li>
            <strong>Technos :</strong> {candidature.technos}
          </li>
          <li>
            <strong>Lieu :</strong> {candidature.lieu}
          </li>
          <li>
            <strong>Réponse/Entretien/Refus :</strong> {candidature.reponseEntretienRefus}
          </li>
          <li>
            <strong>Date de Candidature :</strong> {formatDate(candidature.dateCandidature)}
          </li>
          <li>
            <strong>Date de Refus :</strong> {formatDate(candidature.dateRefus)}
          </li>
          <li>
            <strong>Date de Relance :</strong> {formatDate(candidature.dateRelance)}
          </li>
          {/* Ajoutez d'autres détails de la candidature ici */}
        </ul>
        </div>
      </div>
    </>
  );
}

export default CandidatureDetail;
