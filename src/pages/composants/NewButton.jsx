import { useState } from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import FragmentForm from './FragmentForm';

const StyledButtonTitle = styled.h4`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
`;

const StyledButtonDiv = styled.div`
  padding-left: 85%;
`;

export default function NewButton({ onFormSubmit }) {
  const [showForm, setShowForm] = useState(false);

  const DisplayForm = () => {
    setShowForm(prev => !prev);
    console.log("État de showForm :", !showForm); // Log pour vérifier l'état
  };

  return (
    <>
      <StyledButtonDiv>
        <Button
          variant="outlined"
          size="large"
          sx={{
            backgroundColor: '#7BC950',
            color: '#9A48D0',
            borderColor: '#333333'
          }}
          onClick={DisplayForm}
        >
          <StyledButtonTitle>New</StyledButtonTitle>
        </Button>
      </StyledButtonDiv>

      {/* Affichage conditionnel du formulaire */}
      {showForm && (
        <FragmentForm onFormSubmit={onFormSubmit} />
      )}
    </>
  );
}