import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Ajoute ceci
import styled from 'styled-components';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import FragmentDialog from './FragmentDialog';

const StyledFragmentFormDiv = styled.div`
  margin-top: 20px;
  width: 30%;
  border-radius: 15px;
  border: solid 2px #333333;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  min-height: 100px;
  height: auto;
`;

const LeftBlock = styled.div`
  background-color: #7BC950;
  padding: 0 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  flex: 1;
`;

const RightBlock = styled.div`
  background-color: #333333;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
`;

const VerticalDivider = styled.div`
  width: 2px;
  background-color: #333333;
`;

const StyledTitleSpan = styled.span`
  color: #9A48D0;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
`;

// Ajoute fragmentId dans les props !
export default function FragmentCode({ fragmentId, title, tags, onDelete }) {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate(); // <-- Ajoute ceci

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (!title || !Array.isArray(tags)) {
    console.error("FragmentCode : Propriétés manquantes ou invalides", { title, tags });
    return null;
  }

  return (
    <>
      <StyledFragmentFormDiv>
        <LeftBlock>
          <StyledTitleSpan>{title}</StyledTitleSpan>
          {tags.map((tag) => (
            <Chip
              key={tag.id}
              label={tag.label}
              clickable
              onClick={() => navigate('/tags')} // <-- Redirige vers Tags.jsx
              variant="outlined"
              sx={{
                backgroundColor: '#B288C0',
                color: '#333333',
                marginRight: '5px',
              }}
            />
          ))}
          <ModeIcon
            fontSize="large"
            sx={{ color: '#333333', fontSize: '32px', cursor: 'pointer' }}
            onClick={handleOpenDialog}
            title="Modifier ce fragment"
          />
        </LeftBlock>

        <VerticalDivider />

        <RightBlock>
          <DeleteIcon
            fontSize="large"
            sx={{ color: '#7BC950', fontSize: '32px', cursor: 'pointer' }}
            onClick={onDelete}
            title="Supprimer ce fragment"
          />
        </RightBlock>
      </StyledFragmentFormDiv>

      <FragmentDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        title={title}
        id={fragmentId}
      />
    </>
  );
}