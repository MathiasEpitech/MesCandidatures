import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Alert } from "react-bootstrap";

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function Modifier() {
  const { _id } = useParams(); // Utilisez _id au lieu de id

  const [formData, setFormData] = useState({
    nomEntreprise: "",
    coordonnees: "",
    provenanceAnnonce: "",
    technos: "",
    reponseEntretienRefus: "",
    lieu: "",
    intitulePoste: "",
    descriptionPoste: "",
    dateCandidature: "", // Date de candidature initialisée à une chaîne vide
    dateRefus: "", // Date de refus initialisée à une chaîne vide
    dateRelance: "", // Date de relance initialisée à une chaîne vide
  });

  const [originalCandidatureData, setOriginalCandidatureData] = useState({}); // Stockez les données de candidature d'origine ici

  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // Nouvelle variable d'état

  const navigate = useNavigate(); // Utilisez useNavigate pour obtenir la fonction de navigation

  useEffect(() => {
    // Récupérez les données de la candidature à partir de l'API
    axios
      .get(`https://mescandidaturesback-production.up.railway.app/api/candidatures/${_id}`)
      .then((response) => {
        const candidatureData = response.data;
        setOriginalCandidatureData(candidatureData); // Stockez les données de candidature d'origine
        setFormData({
          nomEntreprise: candidatureData.nomEntreprise,
          coordonnees: candidatureData.coordonnees,
          provenanceAnnonce: candidatureData.provenanceAnnonce,
          technos: candidatureData.technos,
          reponseEntretienRefus: candidatureData.reponseEntretienRefus,
          lieu: candidatureData.lieu,
          intitulePoste: candidatureData.intitulePoste,
          descriptionPoste: candidatureData.descriptionPoste,
          dateCandidature: formatDate(candidatureData.dateCandidature),
          dateRefus: formatDate(candidatureData.dateRefus),
          dateRelance: formatDate(candidatureData.dateRelance),
        });
      })
      .catch((error) => {
        console.error(error);
        // Gérez les erreurs ici
      });
  }, [_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Créez un objet contenant les données à envoyer au serveur
      const updatedData = {
        nomEntreprise: formData.nomEntreprise,
        coordonnees: formData.coordonnees,
        provenanceAnnonce: formData.provenanceAnnonce,
        technos: formData.technos,
        reponseEntretienRefus: formData.reponseEntretienRefus,
        lieu: formData.lieu,
        intitulePoste: formData.intitulePoste,
        descriptionPoste: formData.descriptionPoste,
      };

      // Vérifiez si la date de relance a été modifiée
      if (formData.dateRelance !== formatDate(originalCandidatureData.dateRelance)) {
        updatedData.dateRelance = new Date(formData.dateRelance);
      }

      // Vérifiez si la date de refus a été modifiée
      if (formData.dateRefus !== formatDate(originalCandidatureData.dateRefus)) {
        updatedData.dateRefus = new Date(formData.dateRefus);
      }

      // Envoyez les données du formulaire au serveur pour mettre à jour la candidature
      await axios.put(
        `https://mescandidaturesback-production.up.railway.app/api/candidatures/modifier/${_id}`,
        updatedData
      );

      // Affichez l'alerte de réussite
      setShowSuccessAlert(true);

      // Redirigez l'utilisateur vers la page de liste des candidatures après 2 secondes
      setTimeout(() => {
        navigate("/");
      }, 2000); // Redirection après 2 secondes
    } catch (error) {
      console.error(error);
      // Gérez les erreurs de requête ici
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <Alert
          variant="success"
          show={showSuccessAlert}
          onClose={() => setShowSuccessAlert(false)}
          dismissible
        >
          Candidature modifiée avec succès ! Redirection vers la page
          d'accueil...
        </Alert>
        <form onSubmit={handleSubmit}>
          <div className="home">
            <h1 className="text-center py-3">Modifier une Candidature</h1>
            <div className="row">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="nomEntreprise"
                    name="nomEntreprise"
                    placeholder="example"
                    value={formData.nomEntreprise}
                    onChange={handleChange}
                  />
                  <label htmlFor="nomEntreprise">Nom de l'entreprise</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="coordonnees"
                    name="coordonnees"
                    placeholder="example@example.com"
                    value={formData.coordonnees}
                    onChange={handleChange}
                  />
                  <label htmlFor="coordonnees">Coordonnées</label>
                </div>
              </div>
            </div>

            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="provenanceAnnonce"
                name="provenanceAnnonce"
                value={formData.provenanceAnnonce}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Choisir d'où provient l'annonce
                </option>
                <option value="Linkedin">Linkedin</option>
                <option value="Indeed">Indeed</option>
                <option value="JobTeaser">JobTeaser</option>
                <option value="Hellowork">Hellowork</option>
                <option value="PoleEmploi">PoleEmploi</option>
                <option value="WellcomToTheJungle">WellcomToTheJungle</option>
                <option value="Autre">Autre</option>
              </select>
              <label htmlFor="provenanceAnnonce">Provenance de l'annonce</label>
            </div>

            <div className="form-floating mb-3">
              <textarea
                className="form-control"
                id="technos"
                rows="4"
                name="technos"
                placeholder="Technos"
                value={formData.technos}
                onChange={handleChange}
              ></textarea>
              <label htmlFor="technos">Technos</label>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="intitulePoste"
                    name="intitulePoste"
                    placeholder="Intitulé du poste"
                    value={formData.intitulePoste}
                    onChange={handleChange}
                  />
                  <label htmlFor="intitulePoste">Intitulé du poste</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="lieu"
                    name="lieu"
                    placeholder="Lieu"
                    value={formData.lieu}
                    onChange={handleChange}
                  />
                  <label htmlFor="lieu">Lieu</label>
                </div>
              </div>
            </div>

            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="reponseEntretienRefus"
                name="reponseEntretienRefus"
                value={formData.reponseEntretienRefus}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Etat de l'annonce
                </option>
                <option value="Réponse">Réponse</option>
                <option value="Entretien">Entretien</option>
                <option value="Refus">Refus</option>
              </select>
              <label htmlFor="reponseEntretienRefus">Etat de l'annonce</label>
            </div>

            <div className="form-floating mb-3">
              <textarea
                className="form-control"
                id="descriptionPoste"
                rows="4"
                name="descriptionPoste"
                placeholder="Description du poste"
                value={formData.descriptionPoste}
                onChange={handleChange}
              ></textarea>
              <label htmlFor="descriptionPoste">Description du poste</label>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="input-group mb-3">
                  <span className="input-group-text">Date de candidature</span>
                  <input
                    type="date"
                    className="form-control"
                    id="dateCandidature"
                    name="dateCandidature"
                    value={formData.dateCandidature}
                    onChange={handleChange}
                    disabled // Désactivez l'édition de la date de candidature
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="input-group mb-3">
                  <span className="input-group-text bg-warning">
                    Date de relance
                  </span>
                  <input
                    type="date"
                    className="form-control"
                    id="dateRelance"
                    name="dateRelance"
                    value={formData.dateRelance}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="input-group mb-3">
                  <span className="input-group-text bg-danger">
                    Date de refus
                  </span>
                  <input
                    type="date"
                    className="form-control"
                    id="dateRefus"
                    name="dateRefus"
                    value={formData.dateRefus}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div>
              <button type="submit" className="btn btn-primary btn-lg">
                Modifier Candidature
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Modifier;
