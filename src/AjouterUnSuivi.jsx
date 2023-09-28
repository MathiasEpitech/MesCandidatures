import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Alert } from "react-bootstrap";

function AjouterSuivi() {

  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // Nouvelle variable d'état

  const navigate = useNavigate(); // Utilisez useNavigate pour obtenir la fonction de navigation
  
  const [formData, setFormData] = useState({
    dateSuivi: "",
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
        dateSuivi: formData.dateSuivi,
      };
  
      console.log(formData)
      // Envoyez les données du formulaire au serveur
      await axios.post(
        "https://mescandidaturesback-production.up.railway.app/api/suivi-create",
        requestData
      );
  
      // Effacez le formulaire après l'enregistrement
      setFormData({
        dateSuivi: "",
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
            <h1 className="text-center py-3">Formulaire de Suivi</h1>

            <div className="row">
              <div className="col-md-4">
                <div className="input-group mb-3">
                  <span className="input-group-text bg-success">
                    Date du suivi
                  </span>
                  <input
                    type="date"
                    className="form-control"
                    id="dateSuivi"
                    name="dateSuivi"
                    value={formData.dateSuivi}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div>
              <button type="submit" className="btn btn-primary btn-lg">
                Ajouter un suivi
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AjouterSuivi;
