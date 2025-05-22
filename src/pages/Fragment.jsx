import { useState, useEffect } from 'react';
import NewButton from "./composants/NewButton";
import FragmentCode from './composants/FragmentCode';
import uniqid from 'uniqid';

export default function Fragment() {
  const [fragments, setFragments] = useState(() => {
    const storedFragments = localStorage.getItem('fragments');
    if (storedFragments) {
      try {
        const parsedFragments = JSON.parse(storedFragments);
        if (Array.isArray(parsedFragments)) {
          return parsedFragments;
        }
      } catch (error) {
        console.error("Erreur lors du parsing des fragments :", error);
      }
    }
    return [];
  });

  useEffect(() => {
    console.log("Sauvegarde dans localStorage :", fragments);
    localStorage.setItem('fragments', JSON.stringify(fragments));
  }, [fragments]);

  const handleFormSubmit = (newFragment) => {
    console.log("Fragment reçu :", newFragment);

    const tagsWithIds = newFragment.tags.map(tag => ({
      id: uniqid(),
      label: tag.trim()
    }));

    const fragmentWithId = { ...newFragment, tags: tagsWithIds, id: uniqid() };
    setFragments(prev => [...prev, fragmentWithId]);
  };

  const handleDelete = (idToDelete) => {
    const updatedFragments = fragments.filter(frag => frag.id !== idToDelete);
    setFragments(updatedFragments);
    localStorage.setItem('fragments', JSON.stringify(updatedFragments));
  };

  return (
    <>
      <br /><br /><br />
      <NewButton onFormSubmit={handleFormSubmit} />

      {fragments.map((fragment) => (
  <FragmentCode
    fragmentId={fragment.id}
  title={fragment.title}
  tags={fragment.tags}
    onDelete={() => handleDelete(fragment.id)}
  />
))}
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </>
  );
}