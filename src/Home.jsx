import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function formatDate(dateString) {
  if (dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  return ""; // Retourne une chaîne vide si la date est nulle ou non définie
}

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Utilisez une requête axios pour récupérer toutes les candidatures et les suivis depuis votre serveur
    axios.get("https://mescandidaturesback-production.up.railway.app/").then((response) => {
      const candidatures = response.data.map((candidature) => ({
        type: "candidature",
        data: candidature,
      }));

      axios.get("https://mescandidaturesback-production.up.railway.app/api/suivi").then((suiviResponse) => {
        const suivis = suiviResponse.data.map((suivi) => ({
          type: "suivi",
          data: suivi,
        }));

        // Fusionnez les candidatures et les suivis en une seule liste
        const mergedData = [...candidatures, ...suivis];

        // Triez la liste par date, en ne prenant en compte que la date de candidature et la date de suivi
        mergedData.sort((a, b) => {
          const dateA = a.type === "candidature" ? a.data.dateCandidature : a.data.dateSuivi;
          const dateB = b.type === "candidature" ? b.data.dateCandidature : b.data.dateSuivi;
          return new Date(dateB) - new Date(dateA);
        });

        setData(mergedData);
      });
    });
  }, []);

  const handleDelete = (itemId) => {
    const shouldDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cet élément ?"
    );

    if (shouldDelete) {
      if (data[itemId].type === "candidature") {
        axios
          .delete(
            `https://mescandidaturesback-production.up.railway.app/api/candidatures/supprimer/${data[itemId].data._id}`
          )
          .then((response) => {
            // Rafraîchissez la liste des données après la suppression
            const updatedData = data.filter((item, index) => index !== itemId);
            setData(updatedData);
          })
          .catch((error) => {
            console.error(error);
            // Gérez les erreurs de suppression ici
          });
      } else if (data[itemId].type === "suivi") {
        axios
          .delete(
            `https://mescandidaturesback-production.up.railway.app/api/suivi/supprimer/${data[itemId].data._id}`
          )
          .then((response) => {
            // Rafraîchissez la liste des données après la suppression
            const updatedData = data.filter((item, index) => index !== itemId);
            setData(updatedData);
          })
          .catch((error) => {
            console.error(error);
            // Gérez les erreurs de suppression ici
          });
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <div className="home">
          <h1 className="text-center py-3">
            Liste des Candidatures et des Suivis
          </h1>
          <div className="d-flex justify-content-center p-3">
            <div className="p-2">
              <a
                type="button"
                className="btn btn-primary btn-lg"
                href="/ajouter"
              >
                Ajouter une Candidature
              </a>
            </div>

            <div className="p-2">
              <a
                type="button"
                className="btn btn-success btn-lg"
                href="/ajouter_suivi"
              >
                Marquer un suivi
              </a>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Type</th>
                  <th scope="col">Nom de l'entreprise</th>
                  <th scope="col">Intitulé du Poste</th>
                  <th scope="col">Coordonnées</th>
                  <th scope="col">Provenance de l'Annonce</th>
                  <th scope="col">Description du Poste</th>
                  <th scope="col">Technos</th>
                  <th scope="col">Lieu</th>
                  <th scope="col">Réponse/Entretien/Refus</th>
                  <th scope="col">Date de Candidature</th>
                  <th scope="col">Date de Refus</th>
                  <th scope="col">Date de Relance</th>
                  <th scope="col">Date du Suivi</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {data.map((item, index) => (
                  <tr
                    className={`table-${
                      item.type === "candidature" ? "active" : "success"
                    }`}
                    key={index}
                  >
                    <td>
                      {item.type === "candidature" ? "Candidature" : "Suivi"}
                    </td>
                    <td>{item.data.nomEntreprise || ""}</td>
                    <td>{item.data.intitulePoste || ""}</td>
                    <td>{item.data.coordonnees || ""}</td>
                    <td>{item.data.provenanceAnnonce || ""}</td>
                    <td>{item.data.descriptionPoste || ""}</td>
                    <td>{item.data.technos || ""}</td>
                    <td>{item.data.lieu || ""}</td>
                    <td>{item.data.reponseEntretienRefus || ""}</td>
                    <td>{formatDate(item.data.dateCandidature) || ""}</td>
                    <td>{formatDate(item.data.dateRefus) || ""}</td>
                    <td>{formatDate(item.data.dateRelance) || ""}</td>
                    <td>{formatDate(item.data.dateSuivi) || ""}</td>
                    <td>
                      {item.type === "candidature" && (
                        <div className="d-flex justify-content-center">
                          <a
                            className="btn btn-info btn-sm me-2"
                            href={`/candidatures/${item.data._id}`}
                          >
                            <i className="fa-solid fa-eye"></i>
                          </a>
                          <a
                            className="btn btn-warning btn-sm me-2"
                            href={`/candidatures/modifier/${item.data._id}`}
                          >
                            <i className="fa-solid fa-pen"></i>
                          </a>
                          <button
                            className="btn btn-danger btn-sm me-2"
                            onClick={() => handleDelete(index)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
