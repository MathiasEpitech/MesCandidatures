import React, { useState } from 'react';
import axios from 'axios';

function Ajouter() {
  const [formData, setFormData] = useState({
    nomEntreprise: '',
    coordonnees: '',
    provenanceAnnonce: '',
    technos: '',
    reponseEntretienRefus: '',
    lieu: '',
    intitulePoste: '',
    descriptionPoste: '',
    dateCandidature: '',
    dateRefus: '',
    dateRelance: '',
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
      // Envoyez les données du formulaire au serveur
      await axios.post('/api/candidatures', formData);

      // Effacez le formulaire après l'enregistrement
      setFormData({
        nomEntreprise: '',
        coordonnees: '',
        provenanceAnnonce: '',
        technos: '',
        reponseEntretienRefus: '',
        lieu: '',
        intitulePoste: '',
        descriptionPoste: '',
        dateCandidature: '',
        dateRefus: '',
        dateRelance: '',
      });

      // Ajoutez ici une logique de confirmation ou de redirection
    } catch (error) {
      console.error(error);
      // Gérez les erreurs de requête ici
    }
  };

  return (
    <div>
      <h1>Formulaire de Candidature test</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nomEntreprise">Nom de l'entreprise :</label>
          <input
            type="text"
            id="nomEntreprise"
            name="nomEntreprise"
            value={formData.nomEntreprise}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="coordonnees">Coordonnées :</label>
          <input
            type="text"
            id="coordonnees"
            name="coordonnees"
            value={formData.coordonnees}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="provenanceAnnonce">Provenance de l'annonce :</label>
          <input
            type="text"
            id="provenanceAnnonce"
            name="provenanceAnnonce"
            value={formData.provenanceAnnonce}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="technos">Technos :</label>
          <input
            type="text"
            id="technos"
            name="technos"
            value={formData.technos}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="reponseEntretienRefus">Réponse / Entretien / Refus :</label>
          <input
            type="text"
            id="reponseEntretienRefus"
            name="reponseEntretienRefus"
            value={formData.reponseEntretienRefus}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="lieu">Lieu :</label>
          <input
            type="text"
            id="lieu"
            name="lieu"
            value={formData.lieu}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="intitulePoste">Intitulé du poste :</label>
          <input
            type="text"
            id="intitulePoste"
            name="intitulePoste"
            value={formData.intitulePoste}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="descriptionPoste">Description du poste :</label>
          <textarea
            id="descriptionPoste"
            name="descriptionPoste"
            value={formData.descriptionPoste}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="dateCandidature">Date de candidature :</label>
          <input
            type="date"
            id="dateCandidature"
            name="dateCandidature"
            value={formData.dateCandidature}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="dateRefus">Date de refus :</label>
          <input
            type="date"
            id="dateRefus"
            name="dateRefus"
            value={formData.dateRefus}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="dateRelance">Date de relance :</label>
          <input
            type="date"
            id="dateRelance"
            name="dateRelance"
            value={formData.dateRelance}
            onChange={handleChange}
          />
        </div>

        <div>
          <button type="submit">Ajouter Candidature</button>
        </div>
      </form>
    </div>
  );
}

export default Ajouter;
