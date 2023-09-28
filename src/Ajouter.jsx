import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Alert } from "react-bootstrap";

function Ajouter() {

  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // Nouvelle variable d'état

  const navigate = useNavigate(); // Utilisez useNavigate pour obtenir la fonction de navigation
  
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
      const requestData = {
        nomEntreprise: formData.nomEntreprise,
        coordonnees: formData.coordonnees,
        provenanceAnnonce: formData.provenanceAnnonce,
        technos: formData.technos,
        reponseEntretienRefus: formData.reponseEntretienRefus,
        lieu: formData.lieu,
        intitulePoste: formData.intitulePoste,
        descriptionPoste: formData.descriptionPoste,
      };
  
      // Vérifiez si les champs de date ne sont pas vides avant de les envoyer
      if (formData.dateCandidature) {
        requestData.dateCandidature = new Date(formData.dateCandidature);
      }
      if (formData.dateRefus) {
        requestData.dateRefus = new Date(formData.dateRefus);
      }
      if (formData.dateRelance) {
        requestData.dateRelance = new Date(formData.dateRelance);
      }
  
      // Envoyez les données du formulaire au serveur
      await axios.post(
        "https://mescandidaturesback-production.up.railway.app/api/candidatures",
        requestData
      );
  
      // Effacez le formulaire après l'enregistrement
      setFormData({
        nomEntreprise: "",
        coordonnees: "",
        provenanceAnnonce: "",
        technos: "",
        reponseEntretienRefus: "",
        lieu: "",
        intitulePoste: "",
        descriptionPoste: "",
        dateCandidature: "",
        dateRefus: "",
        dateRelance: "",
      });
  

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
          Candidature ajoutée avec succès ! Redirection vers la page
          d'accueil...
        </Alert>
        <form onSubmit={handleSubmit}>
          <div className="home">
            <h1 className="text-center py-3">Formulaire de Candidature</h1>
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
                  <span className="input-group-text">
                    Date de candidature
                  </span>
                  <input
                    type="date"
                    className="form-control"
                    id="dateCandidature"
                    name="dateCandidature"
                    value={formData.dateCandidature}
                    onChange={handleChange}
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
                  <span className="input-group-text bg-danger">Date de refus</span>
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
                Ajouter Candidature
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Ajouter;
