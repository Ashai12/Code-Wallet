import { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const StyledFragmentFormDiv = styled.div`
  padding-top: 130px;
  margin-top: 20px;
  background-color: #7BC950;
  width: 81%;
  text-align: center;
  border-radius: 15px;
  border: solid 2px #333333;
  padding-bottom: 150px;
`;

const StyledFragmentFormTitle = styled.h1`
  margin-top: 20px;
  color: #9A48D0;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
`;

const StyledFragmentForm = styled.form`
  margin-top: 20px;
`;

const StyledFragmentTextFieldDiv = styled.div`
  margin-top: 20px;
  width: 70%;
`;

const StyledButtonDiv = styled.div`
  margin-top: 20px;
  padding-left: 85%;
`;

const StyledButtonTitle = styled.h4`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
`;

export default function FragmentForm({ onFormSubmit }) {
  const [formData, setFormData] = useState({ title: '', tags: '' });

  useEffect(() => {
    console.log("onFormSubmit reçu ?", typeof onFormSubmit);
  }, []);

  const [alertVisible, setAlertVisible] = useState(false); // Alerte de succès
  const [errorVisible, setErrorVisible] = useState(false); // Alerte d'erreur

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!formData.title.trim() || !formData.tags.trim()) {
      setErrorVisible(true); // Si les champs sont vides, afficher l'alerte d'erreur
      return;
    }
  
    const formattedTags = formData.tags.split(' ').map(tag => tag.trim()); // Pour créer des tags il faut séparer deux mots par un espace (ex: "tag1 tag2" => ["tag1", "tag2"])
  
    if (onFormSubmit) {
      onFormSubmit({ ...formData, tags: formattedTags }); // Envoyer les tags sous forme de tableau
    }
  
    setAlertVisible(true);
    console.log('Formulaire envoyé :', { ...formData, tags: formattedTags });
  };
  
  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;

    setAlertVisible(false);
    setErrorVisible(false);
  };

  return (
    <StyledFragmentFormDiv>
      <StyledFragmentForm onSubmit={handleSubmit}>
        <StyledFragmentFormTitle>Form</StyledFragmentFormTitle>

        <Snackbar
          open={alertVisible}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            Form sent successfully !  
          </Alert>
        </Snackbar>

        <Snackbar
          open={errorVisible}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
          >
            Fill out the form !
          </Alert>
        </Snackbar>

        <StyledFragmentTextFieldDiv>
          <TextField
            fullWidth
            label="Fragment's title"
            id="fragment-title"
            variant="standard"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Tags"
            id="fragment-tags"
            variant="standard"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            sx={{ marginTop: 3 }}
          />
        </StyledFragmentTextFieldDiv>

        <StyledButtonDiv>
          <Button
            type="submit"
            variant="outlined"
            size="large"
            sx={{
              backgroundColor: '#9A48D0',
              color: '#ffffff',
            }}
          >
            <StyledButtonTitle>Save</StyledButtonTitle>
          </Button>
        </StyledButtonDiv>
      </StyledFragmentForm>
    </StyledFragmentFormDiv>
  );
}
