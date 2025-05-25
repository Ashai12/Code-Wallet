import { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import styled from 'styled-components';
import FragmentCode from './composants/FragmentCode';

const StyledTagDiv = styled.div`
  padding : 30px;
`;

const StyledFragmentFormTitle = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
`;

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [fragments, setFragments] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    const storedFragments = localStorage.getItem('fragments');
    if (storedFragments) {
      try {
        const fragmentsArray = JSON.parse(storedFragments);
        setFragments(fragmentsArray);

        const allTags = Array.from(
          new Map(
            fragmentsArray
              .flatMap(fragment => fragment.tags)
              .map(tag => [tag.label, tag])
          ).values()
        ); 
        setTags(allTags);
      } catch (e) {
        setTags([]);
        setFragments([]);
      }
    }
  }, []); // Récupère tous les tags uniques

  const filteredFragments = selectedTag
    ? fragments.filter(fragment =>
        fragment.tags.some(tag => tag.label === selectedTag)
      )
    : []; // Affichage des fragments selon le tag sélectionné

  return (
    <StyledTagDiv>
    <StyledFragmentFormTitle>Tags</StyledFragmentFormTitle>
      <div style={{ margin: '20px 0' }}>
        {tags.length === 0 && <span>Aucun tag</span>}
        {tags.map(tag => (
          <Chip
            key={tag.id}
            label={tag.label}
            clickable
            color={selectedTag === tag.label ? "primary" : "default"}
            onClick={() => setSelectedTag(selectedTag === tag.label ? null : tag.label)}
            variant="outlined"
            sx={{
              backgroundColor: '#B288C0',
              color: '#333333',
              marginRight: '5px',
              marginBottom: '5px'
            }}
          />
        ))}
      </div>

      {selectedTag && (
        <>
          {filteredFragments.length === 0 && <div>Aucun fragment trouvé.</div>}
          <div>
            {filteredFragments.map(fragment => (
              <FragmentCode
                key={fragment.id}
                fragmentId={fragment.id}
                title={fragment.title}
                tags={fragment.tags}
                onDelete={() => {}} // Optionnel, ou tu peux gérer la suppression ici si besoin
              />
            ))}
          </div>
        </>
      )}
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </StyledTagDiv>
  );
}